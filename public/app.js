const id = 2;

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de perfil
    if (window.location.pathname === '/profile.html' || window.location.pathname === '/profile') {
        // Fazer a chamada AJAX para obter os dados do aluno
        fetch(`/aluno/${id}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao consultar o aluno');
                }
                return response.json();
            })
            .then(aluno => {
                // Atualizar o perfil com os dados do aluno
                document.getElementById('nome').textContent = aluno.NOME;
                document.getElementById('email').textContent = aluno.E_MAIL || 'E-mail não informado';
                document.getElementById('localidade').textContent = aluno.localidade || 'Localidade não informada';
                document.getElementById('bio').textContent = aluno.biografia || 'Biografia não informada';
            })
            .catch(error => {
                console.error('Erro ao consultar o aluno:', error);
                alert('Erro ao consultar os dados do aluno.');
            });
    }
});