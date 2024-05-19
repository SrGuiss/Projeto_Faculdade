document.getElementById('consultaAluno').addEventListener('click', async () => {
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
});
