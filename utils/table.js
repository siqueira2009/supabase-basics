// Função responsável por criar os <td>
export function createTableData(text, classList, dataset) {
    const td = document.createElement('td'); // Cria um <td>

    // Preenche com os dados passados nos parâmetros
    td.textContent = text;
    td.classList.add(classList);
    td.dataset.col = dataset;

    // Retorna ele
    return td;
}

// Função responsável por adicionar os <td> dentro de um <tr>
export function appendData(tr, items = []) {
    if (!Array.isArray(items)) { // Não for Array, retorna
        return;
    }

    // Se for array, pega cada item e adiciona no <tr> passado como parâmetro
    items.forEach(item => {
        tr.appendChild(item);
    });
}