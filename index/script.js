import * as reqs from '../database/reqs.js';

const SUPABASE_URL = "https://kjqgvlonlkodstytmdev.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6Yv5Jp_RYe5Yhf8v_ynJKg_CDrYkQ0j";

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

        nameTd.textContent = students[i].name;
        emailTd.textContent = students[i].email;
        classTd.textContent = students[i].class;
        birthTd.textContent = students[i].birth_date;

        tr.appendChild(nameTd);
        tr.appendChild(emailTd);
        tr.appendChild(classTd);
        tr.appendChild(birthTd);

        table.appendChild(tr);
    }


    return students;
}

function formListener(client) { 
    const form = document.querySelector('main > form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input')
    
        const student = {
            name: inputs[0].value,
            email: inputs[1].value,
            class: inputs[2].value,
            birth_date: inputs[3].value
        }

        await reqs.postStudents(client, student);

        await updateTable(client);
    });
}

function refreshListener(client) {
    const refreshTable = document.getElementById('refreshTable');

    refreshTable.addEventListener('click', () => updateTable(client))
}

document.addEventListener("DOMContentLoaded", async () => {
    const client = await createConnection();
    updateTable(client);
    formListener(client);
    refreshListener(client);
})