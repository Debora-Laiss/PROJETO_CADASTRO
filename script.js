const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = (itens) => localStorage.setItem('dbfunc', JSON.stringify(itens));

const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sEmail = document.querySelector('#m-email');
const sCelular = document.querySelector('#m-celular');
const sCidade = document.querySelector('#m-cidade');
const sFuncao = document.querySelector('#m-funcao');
const btnSalvar = document.querySelector('#btnSalvar');

let itens = getItensBD();
let id; // Definindo a variável id no escopo global

// Adiciona o evento de fechamento do modal uma vez, fora da função openModal
modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active');
    }
};

function openModal(edit = false, index = 0) {
    modal.classList.add('active');

    if (edit) {
        sNome.value = itens[index].nome;
        sFuncao.value = itens[index].funcao;
        sEmail.value = itens[index].email;
        sCelular.value = itens[index].celular;
        sCidade.value = itens[index].cidade;
        id = index;
    } else {
        sNome.value = '';
        sFuncao.value = '';
        sEmail.value = '';
        sCelular.value = '';
        sCidade.value = '';
    }
}

function btnSalvarOnClick(e) {
    e.preventDefault();

    const nome = sNome.value;
    const funcao = sFuncao.value;
    const email = sEmail.value;
    const celular = sCelular.value;
    const cidade = sCidade.value;

    if (nome === '' || funcao === '' || email === '' || celular === '' || cidade === '') {
        return;
    }

    const item = { nome, funcao, email, celular, cidade };

    if (id !== undefined) {
        itens[id] = item;
    } else {
        itens.push(item);
    }

    setItensBD(itens); // Passa itens como argumento
    modal.classList.remove('active');
    loadItens();
    id = undefined;
}

function insertItem(item, index) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.celular}</td>
        <td>${item.cidade}</td>
        <td class="acao">
            <button onclick="openModal(true, ${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

btnSalvar.onclick = btnSalvarOnClick;

function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD(itens); // Passa itens como argumento
    loadItens();
}

loadItens();
