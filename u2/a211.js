let resultado = ""
let lado = 4
let espacios = lado - 1

for (i = 1 ; i < (lado * 2) ; i+=2) {
    resultado += " ".repeat(espacios) + "*".repeat(i) + "\n"
    espacios--
}

espacios = 1

for (j = (lado * 2) - 3 ; j > 0 ; j-=2) {
    resultado += " ".repeat(espacios) + "*".repeat(j) + "\n"
    espacios++
}
console.log(resultado)
//document.getElementById("rombo").innerText = resultado