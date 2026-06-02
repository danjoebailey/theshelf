# Trim transparent padding from a reading-companion PNG and downscale it so
# every character stands at a consistent height on the Breakdown shelf and
# loads light on the web. Usage:
#   pwsh scripts/trim-reading-char.ps1 <input.png> <output.png> [targetHeight]
param(
  [Parameter(Mandatory=$true)][string]$InPath,
  [Parameter(Mandatory=$true)][string]$OutPath,
  [int]$TargetHeight = 360
)

Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile($InPath)
$w = $src.Width; $h = $src.Height

# Read all pixels at once (LockBits) — GetPixel per-pixel is far too slow.
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$data = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$src.UnlockBits($data)

# Bounding box of pixels with meaningful opacity (alpha > 10).
$minX = $w; $minY = $h; $maxX = -1; $maxY = -1
for ($y = 0; $y -lt $h; $y++) {
  $row = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    if ($bytes[$row + $x * 4 + 3] -gt 10) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

if ($maxX -lt 0) { Write-Error "Image is fully transparent"; exit 1 }

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1
$cropRect = New-Object System.Drawing.Rectangle $minX, $minY, $cropW, $cropH
$cropped = $src.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$src.Dispose()

$scale = $TargetHeight / $cropH
$targetW = [int][Math]::Round($cropW * $scale)
$out = New-Object System.Drawing.Bitmap $targetW, $TargetHeight
$g = [System.Drawing.Graphics]::FromImage($out)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage($cropped, 0, 0, $targetW, $TargetHeight)
$g.Dispose()
$cropped.Dispose()

$out.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
$out.Dispose()

$sizeKB = [Math]::Round((Get-Item $OutPath).Length / 1KB, 1)
Write-Host "Trimmed ${w}x${h} -> cropped ${cropW}x${cropH} -> output ${targetW}x${TargetHeight} (${sizeKB} KB)"
