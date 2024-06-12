document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio do formulário tradicional

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ USUARIO: username, SENHA: password })
            });

            if (response.ok) {
                const result = await response.json();
                // Redirecionar para a página principal após login bem-sucedido
                window.location.href = '../html/index.html';
            } else {
                const errorResult = await response.json();
                errorMessage.textContent = errorResult.error;
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            errorMessage.textContent = 'Usuário ou senha incorretos.';
            errorMessage.style.display = 'block';
        }
    });
});
