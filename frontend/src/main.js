const inputDate = document.getElementById('data_nascimento');
const btnSend = document.getElementById('btnSend');
const resultContainer = document.getElementById('campo_resultado');

btnSend.addEventListener('click', async () => {
    
    if (!inputDate.value) {
        alert('Por favor, selecione uma data válida para viajar pelo espaço!');
        return;
    }

    // Exibir Spinner de Loading
    resultContainer.innerHTML = '<div class="loading-spinner"></div>';
    
    try {
        const response = await fetch(`http://localhost:4000/getPicture?date=${inputDate.value}`);
        
        if (!response.ok) throw new Error('Falha na comunicação com o centro de comando.');

        const data = await response.json();

        if (data.url) {
            resultContainer.innerHTML = `
                <div class="result-card">
                    <div class="result-img-container">
                        <img class="result-img" src="${data.url}" alt="${data.title}">
                    </div>
                    <div class="result-content">
                        <h2>${data.title}</h2>
                        <p>${data.explanation}</p>
                    </div>
                </div>
            `;
        } else {
            resultContainer.innerHTML = '<p class="error-msg">Nenhuma descoberta encontrada para esta data.</p>';
        }

        console.log('Missão Cumprida: Dados espaciais carregados com sucesso!');

    } catch (error) {
        console.error('Erro na Missão:', error);
        resultContainer.innerHTML = `
            <div class="error-msg">
                <h3>Ops! Houve uma interferência.</h3>
                <p>Não conseguimos carregar os dados. Tente novamente mais tarde.</p>
            </div>
        `;
    }
});