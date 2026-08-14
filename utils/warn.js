// Função responsável por criar um aviso
export function createWarn(title, message) {
    // Pega a <div> de avisos
    const warnDiv = document.getElementById('warn');
    
    // Coloca as mensagem
    warnDiv.innerHTML = `<h2>${title}</h2><p>${message}</p>`;
    
    // Deixa ela visível
    warnDiv.style.display = 'block';
    
    // Desaparece com ela depois de 5 segundos e meio
    setTimeout(() => {
        warnDiv.style.display = 'none';
    }, 5500);
}