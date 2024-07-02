# Sistema de Cadastro de Funcionários

## Descrição
Este projeto implementa um sistema de cadastro de funcionários utilizando HTML, CSS e JavaScript. Permite adicionar, editar e excluir registros de funcionários, armazenando os dados localmente no navegador através do LocalStorage. Inclui também uma interface responsiva para garantir uma boa experiência do usuário em diferentes dispositivos.

## Tecnologias Utilizadas
- **Frontend**: HTML, CSS (incluindo responsividade) e JavaScript.
- **Armazenamento**: Utilização do LocalStorage para armazenar os dados dos funcionários cadastrados.

## Estrutura do Projeto
- **index.html**: Contém a estrutura HTML do projeto, incluindo o formulário de cadastro, tabela de visualização dos funcionários e modal para adição/editar funcionários.
- **style.css**: Estilizações CSS para definir o layout, cores e responsividade da página.
- **script.js**: Implementação JavaScript para interatividade da página, manipulação do LocalStorage e funcionalidades como adição, edição e exclusão de funcionários.

## Funcionalidades Principais
- Cadastro de funcionários com campos como nome, função, e-mail, celular e cidade.
- Edição e exclusão de registros de funcionários.
- Interface responsiva para melhor experiência do usuário em diferentes dispositivos.
- Utilização de modal para adição e edição de registros de forma intuitiva.



## Os Códigos

### HTML (index.html)
```html
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Funcionários</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1 class="header-title">Cadastro de Funcionários</h1>
    </header>
    <main>
        <div class="container">
            <div class="header">
                <span>Cadastro de Funcionários</span>
                <button onclick="openModal()" id="new">Cadastrar</button>
            </div>
            <div class="divTable">
                <table id="tableClient" class="records">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Celular</th>
                            <th>Cidade</th>
                            <th>Função</th>
                            <th class="acao">Editar</th>
                            <th class="acao">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <footer>
        Copyright &copy; [Seu nome ou organização]
    </footer>
    <div class="modal-container">
        <div class="modal">
            <form>
                <label for="m-nome">Nome</label>
                <input id="m-nome" type="text" required />
                <label for="m-funcao">Função</label>
                <input id="m-funcao" type="text" required />
                <label for="m-email">E-mail</label>
                <input id="m-email" type="email" required />
                <label for="m-celular">Celular</label>
                <input id="m-celular" type="tel" required />
                <label for="m-cidade">Cidade</label>
                <input id="m-cidade" type="text" required />
                <button id="btnSalvar">Salvar</button>
            </form>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```
# Javascript
javascript```
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
```
css```
/* Reset global para garantir consistência entre navegadores */
* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
 font-family: 'Poppins', sans-serif;
}

/* Estilos gerais do body */
body {
 width: 100vw;
 height: 100vh;
 display: block;
 align-items: flex-start;
 justify-content: flex-start;
 background-color: white;
}

/* Estilos para o cabeçalho da página */
header h1{
    background-color: rgb(83, 74, 74);
    color: white;
    height: 70px;
    text-align: center;
    line-height: 70px;
    box-shadow: 0 1px 2px var(--shadow-color);
}

/* Estilos para o conteúdo principal */
main{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
    margin: 5vh auto;
    padding: 50px;
    box-shadow: 2px 2px 10px var(--shadow-color);
    gap: 20px;
}

/* Estilo para botões */
button {
 cursor: pointer; 
}

/* Estilos para o contêiner principal */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}

/* Estilos para o cabeçalho de seção */
.header {
 min-height: 70px;
 display: flex;
 align-items: center;
 justify-content: space-between;
 margin: auto 12px;
}

/* Estilos para o título do cabeçalho */
.header span {
 font-weight: 900;
 font-size: 20px;
 word-break: break-all;
 background-color: white;
 color: black;
}

/* Estilos para o botão de criação de novo registro */
#new {
 font-size: 16px;
 padding: 8px;
 border-radius: 5px;
 border: none;
 color: white;
 background-color: rgb(83, 74, 74);
 margin-left: 1200px; /* Ajuste conforme necessário */
}

/* Estilos para a div que contém a tabela */
.divTable {
 padding: 10px;
 width: auto; 
 height:inherit; 
 overflow:auto;
 color: white;
}

/* Personalização da barra de rolagem */
.divTable::-webkit-scrollbar {
 width: 12px;
 background-color: whitesmoke; 
}

.divTable::-webkit-scrollbar-thumb {
 border-radius: 10px;
 background-color: darkgray; 
}

/* Estilos gerais para a tabela */
table {
 width: 100%;
 border-spacing: 10px;
 word-break: break-all;
 border-collapse: collapse;
 color: black;
 table-layout: fixed;
}

/* Estilos para o cabeçalho da tabela */
thead {
 background-color: white;
 color: black;
}

/* Estilos para as linhas da tabela */
tr {
 border-bottom: 1px solid rgb(238, 235, 235)!important;
}

/* Estilos para as células da tabela */
tbody tr td {
 vertical-align: text-top;
 padding: 6px;
 max-width: 50px;
}

/* Estilos para as células de ação da tabela */
thead tr th.acao {
 width: 100px!important;
 text-align: center;
}

tbody tr td.acao {
 text-align: center;
}

/* Estilos para o rodapé da página */
footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #333; /* Exemplo de cor de fundo */
    color: white; /* Exemplo de cor do texto */
    text-align: center; /* Centraliza o texto */
}

/* Media query para responsividade */
@media (max-width: 760px) {
 body {
    font-size: 14px;
 }
  
 .header span {
    font-size: 15px;
 }

 #new {
    padding: 5px;
    font-size: 10px;
 }

 thead tr th.acao {
    width: auto!important;
 }
  
 td button i {
    font-size: 20px!important;
 }

 td button i:first-child {
    margin-right: 0;
 }

 .modal {
    width: 90%!important;
 }

 .modal label {
    font-size: 12px!important;
 }
}

/* Estilos para o contêiner do modal */
.modal-container {
 width: 100vw;
 height: 100vh;
 position: fixed;
 top: 0;
 left: 0;
 background-color: white;
 display: none;
 z-index: 999;
 align-items: center;
 justify-content: center;
}

/* Estilos para o modal */
.modal {
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 40px;
 background-color: white;
 border-radius: 10px;
 width: 50%;
}

.modal label {
 font-size: 14px;
 width: 100%;
}

.modal input {
 width: 100%;
 outline: none;
 padding: 5px 10px; 
 width: 100%;
 margin-bottom: 20px;
 border-top: none;
 border-left: none;
 border-right: none;
}

.modal button {
 width: 100%;
 margin: 10px auto;
 outline: none;
 border-radius: 20px; 
 padding: 5px 10px; 
 width: 100%;
 border: none;
 background-color: rgb(57, 57, 226);
 color: white;
}

/* Classe para ativar o modal */
.active {
 display: flex;
}

.active .modal {
 animation: modal .4s;
}

/* Animação para o modal */
@keyframes modal {
 from {
    opacity: 0;
    transform: translate3d(0, -60px, 0);
 }
 to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
 }
}

/* Estilos para botões dentro de células da tabela */
td button {
 border: none;
 outline: none;
 background: transparent;
}

td button i {
 font-size: 25px;
}

td button i:first-child {
 margin-right: 10px;
}
```
