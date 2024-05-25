document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const sunButton = document.getElementById('theme-toggle-sun');
    const moonButton = document.getElementById('theme-toggle-moon');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = this.username.value;
      const password = this.password.value;
      
      // Verificação das credenciais
      if (username === 'admin' && password === 'admin') {
        window.location.href = 'admin_panel.html'; // Redirecionamento para admin_panel.html
      } else if ((username === 'rafa' && password === 'rafa') ||
                 (username === 'pai' && password === 'pai') ||
                 (username === 'mae' && password === 'mae') ||
                 (username === 'sara' && password === 'sara')) {
        window.location.href = 'site.html'; // Redirecionamento para index.html
      } else {
        errorMessage.style.display = 'block'; // Exibe mensagem de erro
      }
    });
  
    sunButton.addEventListener('click', () => {
      document.body.classList.remove('dark-theme');
      sunButton.querySelector('img').src = 'sun.png';
    });
  
    moonButton.addEventListener('click', () => {
      document.body.classList.add('dark-theme');
      sunButton.querySelector('img').src = 'moon.png';
    });
  });
