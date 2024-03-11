// Função para obter itens do LocalStorage, retorna um array vazio se não houver dados
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];

// Função para salvar itens no LocalStorage
const setItensBD = (itens) => localStorage.setItem('dbfunc', JSON.stringify(itens));

// Seleciona elementos do DOM para manipulação posterior
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sEmail = document.querySelector('#m-email');
const sCelular = document.querySelector('#m-celular');
const sCidade = document.querySelector('#m-cidade');
const sFuncao = document.querySelector('#m-funcao');
const btnSalvar = document.querySelector('#btnSalvar');

// Inicializa a variável itens com os dados do LocalStorage
let itens = getItensBD();
let id; // Variável global para armazenar o índice do item a ser editado

// Adiciona um evento de clique no modal para fechá-lo ao clicar fora dele
modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active');
    }
};

// Função para abrir o modal, com opção de edição de um item existente
function openModal(edit = false, index = 0) {
    modal.classList.add('active');

    if (edit) {
        // Preenche os campos do formulário com os dados do item a ser editado
        sNome.value = itens[index].nome;
        sFuncao.value = itens[index].funcao;
        sEmail.value = itens[index].email;
        sCelular.value = itens[index].celular;
        sCidade.value = itens[index].cidade;
        id = index; // Armazena o índice do item a ser editado
    } else {
        // Limpa os campos do formulário para adição de um novo item
        sNome.value = '';
        sFuncao.value = '';
        sEmail.value = '';
        sCelular.value = '';
        sCidade.value = '';
    }
}

// Função para salvar os dados do formulário no LocalStorage
function btnSalvarOnClick(e) {
    e.preventDefault();

    // Coleta os valores dos campos do formulário
    const nome = sNome.value;
    const funcao = sFuncao.value;
    const email = sEmail.value;
    const celular = sCelular.value;
    const cidade = sCidade.value;

    // Verifica se todos os campos estão preenchidos
    if (nome === '' || funcao === '' || email === '' || celular === '' || cidade === '') {
        return;
    }

    // Cria um objeto com os dados do formulário
    const item = { nome, funcao, email, celular, cidade };

    // Verifica se está editando um item existente ou adicionando um novo
    if (id !== undefined) {
        itens[id] = item; // Atualiza o item existente
    } else {
        itens.push(item); // Adiciona um novo item
    }

    // Salva os itens atualizados no LocalStorage
    setItensBD(itens);
    // Fecha o modal
    modal.classList.remove('active');
    // Recarrega os itens na tabela
    loadItens();
    // Reseta a variável id
    id = undefined;
}

// Função para inserir um item na tabela
function insertItem(item, index) {
    let tr = document.createElement('tr');

    // Cria as células da tabela com os dados do item
    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.celular}</td>
        <td>${item.cidade}</td>
        <td>${item.funcao}</td>
        <td class="acao">
            <button onclick="openModal(true, ${index})"><i class='bx bx-edit'></i></button>
        </td>
        <td class="acao">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;
    tbody.appendChild(tr);
}

// Adiciona um evento de clique no botão de salvar
btnSalvar.onclick = btnSalvarOnClick;

// Função para carregar os itens salvos no LocalStorage na tabela
function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
        insertItem(item, index);
    });
}

// Função para deletar um item da lista
function deleteItem(index) {
    itens.splice(index, 1);
    // Salva os itens atualizados no LocalStorage
    setItensBD(itens);
    // Recarrega os itens na tabela
    loadItens();
}

// Carrega os itens salvos no LocalStorage na tabela ao iniciar
loadItens();
