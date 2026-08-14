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

        // Adiciona os itens no TR, usando a função auxiliar
        const items = [nameTd, emailTd, classTd, birthTd];
        tableUtils.appendData(tr, items);

        table.appendChild(tr);
    }
}

// Função que adiciona um eventListener de enviar formulário
function formListener(client) { 
    // Pega o formulário
    const form = document.querySelector('main > form');
    
    // Ao submeter ele...
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita recarregamento da página
        const inputs = form.querySelectorAll('input'); // Pega todos os inputs
    
        // Monta um objeto com os dados
        const student = {
            name: inputs[0].value,
            email: inputs[1].value,
            class: inputs[2].value,
            birth_date: inputs[3].value
        }

        // Adiciona esses dados no banco
        await reqs.postStudents(client, student);

        // Atualiza a tabela após isso
        await updateTable(client);
    });
}

// Função que adiciona um eventListener para atualizar a tabela
function refreshListener(client) {
    // Pega o botão de atualizar a tabela
    const refreshTable = document.getElementById('refreshTable');

    // Quando clica, chama a função de atualizar a tabela
    refreshTable.addEventListener('click', () => updateTable(client))
}

document.addEventListener("DOMContentLoaded", async () => {  
    // Configura um cliente do Supabase
    const client = await config.createConnection();
    updateTable(client); // Atualiza a tabela logo de cara

    formListener(client); // EventListener de enviar formulário
    refreshListener(client); // EventListener de atualizar tabela

    // Cria os ícones Lucide
    createIcons();
})