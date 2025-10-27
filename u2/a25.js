let numero1 = prompt("Dime un número")
let numero2 = prompt("Dime otro número")
numero1 = parseInt(numero1)
numero2 = parseInt(numero2)
let suma = 0
if (!isNaN(numero1) && !isNaN(numero2)) {
    suma = numero1 + numero2
    alert(suma)
} else
    alert("Uno o los valores introducidos no son números")