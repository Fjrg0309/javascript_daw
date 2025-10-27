let numero1 = prompt("Dime un número")
let numero2 = prompt("Dime otro número")

numero1 = parseInt(numero1)
numero2 = parseInt(numero2)

if (numero1 > numero2)
    alert("El número 1 es mayor")
else if (numero1 < numero2)
    alert("El número 2 es mayor")
else
    alert("Son iguales")