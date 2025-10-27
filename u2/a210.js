let lado = 5;
let contador = 0;
let resultado = "";

while (contador < lado) {
    if (contador === 0 || contador === lado - 1)
        resultado += "*".repeat(lado) + "\n";
    else
        resultado += "*" + " ".repeat(lado - 2) + "*" + "\n";
    
    contador++;
}

document.getElementById("lado").innerText = resultado