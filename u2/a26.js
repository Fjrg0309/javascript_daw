let numero1 = prompt("Dime un número")
let numero2 = prompt("Dime otro número")
let operacion = prompt("Operación a realizar")
numero1 = parseInt(numero1)
numero2 = parseInt(numero2)
if (!isNaN(numero1) && !isNaN(numero2)) {
    let resultado = 0
    if (["+", "-", "*", "/"].includes(operacion)) {
        if (operacion == "+")
            resultado = numero1 + numero2
        else if (operacion == "-")
            resultado = numero1 - numero2
        else if (operacion == "*")
            resultado = numero1 * numero2
        else
            resultado = numero1 / numero2
        alert(resultado)
    } else
        alert("Operación incorrecta")
} else
    alert("Uno de los o los números no son valores númericos")