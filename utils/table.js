export function createTableData(text, classList, dataset) {
    const td = document.createElement('td');

    td.textContent = text;
    td.classList.add(classList);
    td.dataset.col = dataset;

    return td;
}

export function appendData(tr, items = []) {
    if (!Array.isArray(items)) {
        return;
    }

    items.forEach(item => {
        tr.appendChild(item);
    });
}