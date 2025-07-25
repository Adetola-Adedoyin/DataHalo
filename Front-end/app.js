// app.js
import { initAuth } from './components/auth.js';
import { initDashboard } from './components/dashboard.js';

function checkAuth() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function renderApp() {
  const app = document.getElementById('app');
  const user = checkAuth();

  if (user) {
    initDashboard(app, user);
  } else {
    initAuth(app, renderApp);
  }
}

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(console.error);
  });
}

renderApp();
