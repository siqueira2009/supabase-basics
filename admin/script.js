import * as reqs from '../utils/reqs.js'; // Importa as funções que fazem requisições ao Supabase
import * as config from '../utils/config.js'; // Importa as funções de configurações de conexão Supabase

import * as tableUtils from '../utils/table.js'; // Importa as funções utilitárias das tabelas 

// Função para criar os ícones Lucide
function createIcons() {
    lucide.createIcons();
}

// Função que atualiza a tabela de listagem de alunos
async function updateTable(client) {
    // Pega todos os alunos do banco
    const students = await reqs.getStudents(client);
    
    // Seleciona os elementos necessários (tabela e linhas)
    const table = document.querySelector('table');
    const tr = document.querySelectorAll('tr');

    // Para cada linha, apaga ela (menos o cabeçalho)
    tr.forEach(tr => {
        if (tr.id != "tableHeader") {
            tr.remove();
        }
    })

    // Para cada estudante...
    for (let i = 0; i < students.length; i++) {
        // Cria uma linha
        const tr = document.createElement('tr');

        // Cria um elemento de dado para cada valor, usando a função auxiliar
        const nameTd = tableUtils.createTableData(students[i].name, 'dataTd', 'name');
        const emailTd = tableUtils.createTableData(students[i].email, 'dataTd', 'email');
        const classTd = tableUtils.createTableData(students[i].class, 'dataTd', 'class');
        const birthTd = tableUtils.createTableData(students[i].birth_date, 'dataTd', 'birth_date');

        // Cria o elemento de deletar usuário
        const deleteTd = document.createElement('td');

        // Adiciona o conteúdo dentro dele
        deleteTd.innerHTML = "<i data-lucide='trash-2'></i>"
        deleteTd.classList.add('deleteTd');

        // Adiciona o ID do estudante na linha
        tr.dataset.studentId = students[i].id;

        // Adiciona os itens no TR, usando a função auxiliar
        const items = [nameTd, emailTd, classTd, birthTd, deleteTd];
        tableUtils.appendData(tr, items);

        table.appendChild(tr);
    }
    
    createIcons(); // Recria os ícones (por causa da lixeira)
    deleteTdListener(client); // Adiciona o evento de deletar estudante
    editTdListener(client); // Adiciona o evento de atualizar estudante
}

// Função responsável pela deleção de usuários
function deleteTdListener(client) {
    // Pega todos os ícones de deleção
    const deleteTds = document.querySelectorAll('.deleteTd svg');

    // Para cada um adiciona um eventListener que...
    deleteTds.forEach(td => {
        td.addEventListener('click', async () => {
            const id = Number(td.closest('tr').dataset.studentId);
    
            // Faz a requisição de delete usuário com o ID e atualiza a tabela
            const result = await reqs.deleteStudent(client, id);
            updateTable(client);
        });
    });
}

// Função responsável por editar dados dos usuários
function editTdListener(client) {
    // Pega todos os campos de dados
    const dataTds = document.querySelectorAll('td.dataTd');

    // Para campo de dado
    dataTds.forEach(dataTd => {
        // Adiciona um eventListener de clique que...
        dataTd.addEventListener('click', () => {

            // Substitui ele por um input
            if (dataTd.querySelector('input')) return;
            
            const prevValue = dataTd.textContent.trim();
            const input = document.createElement('input');

            input.value = prevValue;
            dataTd.textContent = "";
            dataTd.appendChild(input);
            input.focus();

            // Quando tiver foco tirado dele, chama a função de salvar valor
            input.addEventListener('blur', () => saveValue(client, input, dataTd, prevValue));

            // Quando tem Enter clicado, atualiza também
            input.addEventListener('keydown', (e) => {
                if (e.key == "Enter") {
                    input.blur();
                }
            });
        });
    
    });
}

// Função responsável por salvar o novo valor do input
async function saveValue(client, input, td, prevValue) {
    // Pega os dados necessários
    const newValue = input.value.trim();
    const col = td.dataset.col;
    const id = Number(td.closest('tr').dataset.studentId);

    // Se não tiver coluna ou id ou os valores forem iguais
    if ((!col || !id) || newValue == prevValue) {
        td.textContent = prevValue; // Não muda nada
        return;
    }

    // Faz a requisição para atualizar os valores
    const res = await reqs.updateStudent(client, col, newValue, id);

    // Se der erro, volta ao estado anterior
    // Essa parte nem é tão necessária, já que a tabela seria atualizada logo embaixo
    if (res == null) {
        td.textContent = prevValue;
        return;
    }

    // Depois atualiza a tabela
    updateTable(client);
}

// Função que adiciona um eventListener para atualizar a tabela
function refreshListener(client) {
    // Pega o botão de atualizar a tabela
    const refreshTable = document.getElementById('refreshTable');

    // Quando clica, chama a função de atualizar a tabela
    refreshTable.addEventListener('click', () => updateTable(client))
}

// Adiciona um eventListenter no documento para quando ele for carregado
document.addEventListener("DOMContentLoaded", async () => {
    // Dá um alerta
    alert("Olá! Bem vindo ao painel de administrador.\n\nClique na lixeira para apagar um estudante e clique em algum dado da tabela para editá-lo.")
       
    // Configura um cliente do Supabase
    const client = await config.createConnection();
    updateTable(client); // Atualiza a tabela logo de cara
    
    refreshListener(client); // EventListener de atualizar tabela

    // Cria os ícones Lucide
    createIcons();
});