/*document.getElementById('consultaAluno').addEventListener('click', async () => {
    try {
        const response = await fetch('/GetAllAluno');
        
        console.log(response); // Adicione este log

        if (!response.ok) {
            throw new Error('Erro ao consultar o banco de dados');
        }

        const data = await response.json();
        document.getElementById('resultados').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        document.getElementById('resultados').textContent = 'Erro ao consultar o banco de dados.';
    }
});

document.getElementById('consultaCurso').addEventListener('click', async () => {
    try {
        const response = await fetch('/GetAllCurso');
        
        console.log(response); // Adicione este log

        if (!response.ok) {
            throw new Error('Erro ao consultar o banco de dados');
        }

        const data = await response.json();
        document.getElementById('resultados').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        document.getElementById('resultados').textContent = 'Erro ao consultar o banco de dados.';
    }
});

document.getElementById('consultaAlunoRa').addEventListener('click', async () => {
    const alunoId = document.getElementById('alunoId').value;

    if (!alunoId) {
        alert('Por favor, insira um ID de aluno.');
        return;
    }

    try {
        const response = await fetch(`/aluno/${alunoId}`);

        if (!response.ok) {
            throw new Error('Erro ao consultar o aluno');
        }

        const aluno = await response.json();
        document.getElementById('resultados').textContent = JSON.stringify(aluno, null, 2);
    } catch (error) {
        console.error('Erro ao consultar o aluno:', error);
        document.getElementById('resultados').textContent = 'Erro ao consultar o aluno.';
    }
});

document.getElementById('inserirAlunoBtn').addEventListener('click', async () => {
    const alunoNome = document.getElementById('alunoNome').value;
    
    if (!alunoNome) {
        alert('Por favor, insira o nome do aluno.');
        return;
    }

    try {
        const response = await fetch('/aluno', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NOME: alunoNome })
        });

        if (!response.ok) {
            throw new Error('Erro ao inserir o aluno');
        }

        const novoAluno = await response.json();
        document.getElementById('resultados').textContent = `Aluno inserido com sucesso: ${JSON.stringify(novoAluno, null, 2)}`;
    } catch (error) {
        console.error('Erro ao inserir o aluno:', error);
        document.getElementById('resultados').textContent = 'Erro ao inserir o aluno.';
    }
});*/

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de perfil
    if (window.location.pathname === '/profile.html' || window.location.pathname === '/profile') {
        // Fazer a chamada AJAX para obter os dados do aluno
        fetch('/aluno/2') // Substitua 1 pelo ID do aluno desejado
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