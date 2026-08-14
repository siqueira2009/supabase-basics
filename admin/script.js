import * as reqs from '../database/reqs.js';

const SUPABASE_URL = "https://kjqgvlonlkodstytmdev.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6Yv5Jp_RYe5Yhf8v_ynJKg_CDrYkQ0j";

function createIcons() {
    lucide.createIcons();
}

// Função que cria uma conexão com o Supabase
async function createConnection() {
    // Cria e retorna um objeto que faz requisições HTTP
    // Usam os valores no header
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    return client;
}

async function updateTable(client) {
    const students = await reqs.getStudents(client);
    const table = document.querySelector('table');

    const tr = document.querySelectorAll('tr');

    tr.forEach(tr => {
        if (tr.id != "tableHeader") {
            tr.remove();
        }
    })

    for (let i = 0; i < students.length; i++) {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const emailTd = document.createElement('td');
        const classTd = document.createElement('td');
        const birthTd = document.createElement('td');
        const deleteTd = document.createElement('td');
        const editTd = document.createElement('td');

        nameTd.textContent = students[i].name;
        nameTd.classList.add('dataTd');
        nameTd.dataset.col = 'name';

        emailTd.textContent = students[i].email;
        emailTd.classList.add('dataTd');
        emailTd.dataset.col = 'email';

        classTd.textContent = students[i].class;
        classTd.classList.add('dataTd');
        classTd.dataset.col = 'class';

        birthTd.textContent = students[i].birth_date;
        birthTd.classList.add('dataTd');
        birthTd.dataset.col = 'birth_date';

        deleteTd.innerHTML = "<i data-lucide='trash-2'></i>"
        deleteTd.classList.add('deleteTd');

        tr.id = students[i].id;

        tr.appendChild(nameTd);
        tr.appendChild(emailTd);
        tr.appendChild(classTd);
        tr.appendChild(birthTd);
        tr.appendChild(deleteTd);

        table.appendChild(tr);

        createIcons();
    }

    deleteTdListener(client);
    editTdListener(client);
}

function deleteTdListener(client) {
    const deleteTds = document.querySelectorAll('.deleteTd svg');

    deleteTds.forEach(td => {
        td.addEventListener('click', async () => {
            const id = Number(td.closest('tr').id);
    
            const result = await reqs.deleteStudent(client, id);
            updateTable(client);
        });
    });
}

function editTdListener(client) {
    const dataTds = document.querySelectorAll('td.dataTd');

    dataTds.forEach(dataTd => {
        dataTd.addEventListener('click', () => {
            if (dataTd.querySelector('input')) return;
            
            const prevValue = dataTd.textContent.trim();
            const input = document.createElement('input');

            input.value = prevValue;
            dataTd.textContent = "";
            dataTd.appendChild(input);
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);

            input.addEventListener('blur', () => saveValue(client, input, dataTd, prevValue));
            input.addEventListener('keydown', (e) => {
                if (e.key == "Enter") {
                    input.blur();
                }
            });
        });
    
    });
}

async function saveValue(client, input, td, prevValue) {
    const newValue = input.value.trim();
    const col = td.dataset.col;
    const id = Number(td.closest('tr').id);

    if ((!col || !id) || newValue == prevValue) {
        td.textContent = prevValue;
        return;
    }

    const res = await reqs.updateStudent(client, col, newValue, id);

    if (res == null) {
        td.textContent = prevValue;
        return;
    }

    updateTable(client);
}

document.addEventListener("DOMContentLoaded", async () => {
    alert("Olá! Bem vindo ao painel de administrador.\n\nClique na lixeira para apagar um estudante e clique em algum dado da tabela para editá-lo.")
   
    createIcons();

    const client = await createConnection();
    updateTable(client);
});