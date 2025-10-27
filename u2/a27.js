let nota1 = ""
let nota2 = ""
let nota3 = ""

while (true) {
    nota1 = prompt("Dime la nota 1")
    nota1 = parseInt(nota1)
    if (!isNaN(nota1))
        break
}

while (true) {
    nota2 = prompt("Dime la nota 2")
    nota2 = parseInt(nota2)
    if (!isNaN(nota2))
        break
}

while (true) {
    nota3 = prompt("Dime la nota 2")
    nota3 = parseInt(nota3)
    if (!isNaN(nota3))
        break
}
    
let media = (nota1 + nota2 + nota3) / 3
media = Number(media.toFixed(2))
alert(media)
