document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // Add your login logic here
            if (username === '' || password === '') {
                errorMessage.textContent = 'Por favor, preencha todos os campos.';
            } else {
                // Simulate login success
                alert('Login bem-sucedido!');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            // Add your registration logic here
            if (fullname === '' || username === '' || email === '' || password === '' || confirmPassword === '') {
                errorMessage.textContent = 'Por favor, preencha todos os campos.';
            } else if (password !== confirmPassword) {
                errorMessage.textContent = 'As senhas não coincidem.';
            } else {
                // Simulate registration success
                alert('Cadastro bem-sucedido!');
            }
        });
    }
});
