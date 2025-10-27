let dia = parseInt(prompt("Dime el día"))
let mes = parseInt(prompt("Dime el mes"))
let anio = parseInt(prompt("Dime el año"))

let bisiesto = false
let valido = true

if (mes == 2 && (anio % 4 == 0 && anio % 100 != 0) || anio % 100 == 0 && anio % 400 == 0)
    bisiesto = true

if (dia < 1 || dia > 31)
    valido = false

else if ([4, 6, 9, 11].includes(mes) && dia > 30)
    valido = false

else if ([1, 3, 5, 7, 8, 10, 12].includes(mes) && dia > 31)
    valido = false

else if (mes == 2 && (!bisiesto && dia > 28))
    valido = false

if (valido)
    alert(`La fecha ${dia}/${mes}/${anio} es válida`)
else
    alert(`La fecha ${dia}/${mes}/${anio} no es válida`)