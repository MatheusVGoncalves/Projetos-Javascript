'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active');
}

const key = 'db_client'

// Métodos CRUD  - LOCALSTORAGE

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? []
const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const createClient = (client) => {
    const db_client =  getLocalStorage(key)
    db_client.push(client)
    setLocalStorage(key, db_client)
} 

const readClient = () => getLocalStorage(key)

const updateClient = (index, client) => {
    const db_client = getLocalStorage(key);
    db_client[index] = client;
    setLocalStorage(key, db_client)
}

const deleteClient = (index) => {
    const db_client = getLocalStorage(key);
    db_client.splice(index, 1)
    setLocalStorage(key, db_client)
}

// Interação com DOM

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

// Método para Salvar Cliente
const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index

        if(index == 'new') {
        createClient(client)
        closeModal()
        updateTable()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
        
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
                    <td>${client.nome}</td>
                    <td>${client.email}</td>
                    <td>${client.celular}</td>
                    <td>${client.cidade}</td>
                    <td>
                        <button type="button" class="button green" data-action='editar' data-index='${index}'>editar</button>
                        <button type="button" class="button red" data-action='deletar' data-index='${index}'>excluir</button>
                    </td>
    `
    document.querySelector('#tableClient').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const db_client = getLocalStorage(key)
    clearTable()
    db_client.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
    openModal()
}

const editClient = (index) => {
    const client = getLocalStorage(key)[index]
    client.index = index
    fillFields(client)
}

const editDelete = (event) => {
    if(event.target.type == 'button') {
        const evento = event.target.dataset.action
        const index = event.target.dataset.index

        if(evento === 'editar'){
            editClient(index)
        } if (evento === 'deletar'){
            const client = getLocalStorage(key)[index]
            const response = confirm(`Deseja realmente excluir o cliente: ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }

        }
    }
}

updateTable()


// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
        .addEventListener('click', saveClient)

document.querySelector('#tableClient')
        .addEventListener('click', editDelete)

// Método JSON.stringfy() transforma JSON em string
// Método JSON.parse() transforma string em JSON
 //O objeto localStorage possui o método setItem para enviar dados, sendo passados dois parâmetros: 'key', 'value'
