import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Warm up iOS Safari touch engine so first tap isn't absorbed
document.addEventListener('touchstart', () => {}, { passive: true });

// Prevent iOS Safari visual viewport shift when keyboard opens
if (window.visualViewport) {
  const onViewportChange = () => {
    const root = document.getElementById('root');
    if (root) {
      root.style.height = window.visualViewport.height + 'px';
      window.scrollTo(0, 0);
    }
  };
  window.visualViewport.addEventListener('resize', onViewportChange);
  window.visualViewport.addEventListener('scroll', onViewportChange);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
