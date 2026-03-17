import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Warm up iOS Safari touch engine so first tap isn't absorbed
document.addEventListener('touchstart', () => {}, { passive: true });

// Prevent iOS Safari from scrolling the page when the keyboard opens
document.addEventListener('focusin', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)));
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
