const data_nascimento = document.getElementById('data_nascimento');
const btnEnviar = document.getElementById('btnSend');
const infoGerada = document.getElementById('campo_resultado');

btnEnviar.addEventListener('click', async () => {

    const res = await fetch(`http://localhost:4000/getPicture?date=${data_nascimento.value}`);

    const data = await res.json();
    
    infoGerada.innerHTML = `

        <h1>Título: ${data.title}</h1>
        <img style=width:50%; src=${data.url}></img>
        <p>Explanation: ${data.explanation}</p>

    `;

    console.log('Funcionou!!')



});