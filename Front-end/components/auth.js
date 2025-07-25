// components/auth.js
export function initAuth(container, onAuthSuccess) {
  container.innerHTML = `
    <section class="auth-container">
      <h2>Welcome to My Drive</h2>
      <form id="auth-form">
        <input type="text" id="username" placeholder="Username" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Sign In / Register</button>
      </form>
    </section>
  `;

  const form = document.getElementById('auth-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) return alert('Please fill in all fields.');

    // Save to localStorage
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    onAuthSuccess();
  });
}
