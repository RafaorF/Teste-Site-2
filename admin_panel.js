// admin_panel.js

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');

  logoutButton.addEventListener('click', () => {
    // Redirecionar para a página de login
    window.location.href = 'index.html';
  });
});
