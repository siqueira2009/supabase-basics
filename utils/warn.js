export function createWarn(title, message) {
    const warnDiv = document.getElementById('warn');
    warnDiv.innerHTML = `<h2>${title}</h2><p>${message}</p>`;
    warnDiv.style.display = 'block';
    
    setTimeout(() => {
        warnDiv.style.display = 'none';
    }, 5500);
}