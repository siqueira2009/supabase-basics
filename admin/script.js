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

        nameTd.textContent = students[i].name;
        emailTd.textContent = students[i].email;
        classTd.textContent = students[i].class;
        birthTd.textContent = students[i].birth_date;
        deleteTd.innerHTML = "<i data-lucide='trash-2'></i>"
        deleteTd.classList.add('deleteTd')

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
}

async function deleteTdListener(client) {
    const deleteTds = document.querySelectorAll('.deleteTd svg');

    deleteTds.forEach(td => {
        td.addEventListener('click', async () => {
            const id = Number(td.closest('tr').id);
    
            const result = await reqs.deleteStudent(client, id);
            updateTable(client);
        });
    });

}

document.addEventListener("DOMContentLoaded", async () => {
    createIcons();

    const client = await createConnection();
    updateTable(client);
});