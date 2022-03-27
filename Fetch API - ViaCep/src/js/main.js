const cep = document.querySelector("#cep")

const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector(`#${campo}`)) {
            document.querySelector(`#${campo}`).value = result[campo]
        }
    }
}

cep.addEventListener("blur", (e) => {
    let search = cep.value.replace("-", "");
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options) // Vai nessa URL com as OPÇÕES definidas
        .then((response) => { // Se a promessa der certo, traga o resultado em JSON
            response.json()
            .then((data) => showData(data)) // Se a promesa de vir o resultado der certo, execute a função showData
        })
        .catch((e) => alert('Inserir CEP válido')) // Se não der certo, exiba um alert em tela


})

// 