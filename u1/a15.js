function aplicarEstilos() {
    const negrita = document.getElementById('negritaSelect').value;
    const cursiva = document.getElementById('cursivaSelect').value;
    const texto = document.getElementById('texto');

    texto.style.fontWeight = negrita;
    texto.style.fontStyle = cursiva;
}