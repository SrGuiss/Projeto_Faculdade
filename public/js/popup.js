const id = 2;

document.addEventListener('DOMContentLoaded', function() {
    const updateForm = document.getElementById('updateForm');

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(updateForm);
        const data = {
            NOME: formData.get('username'),
            E_MAIL: formData.get('email')
        };

        fetch(`/aluno/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o aluno');
            }
            return response.json();
        })
        .then(aluno => {
            alert('Aluno atualizado com sucesso!');
            // Atualizar a página com os novos dados, se necessário
        })
        .catch(error => {
            console.error('Erro ao atualizar o aluno:', error);
            alert('Erro ao atualizar o aluno.');
        });
    });
});