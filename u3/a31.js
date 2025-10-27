let fecha = new Date()
let diaSemana = fecha.getDay()
let dia = fecha.getDate()
let mes = fecha.getMonth()
let anio = fecha.getFullYear()
let diaSemanaString = ""

switch (diaSemana) {
    case 0: diaSemanaString = "Domingo"
    case 1: diaSemanaString = "Lunes"
    case 2: diaSemanaString = "Martes"
    case 3: diaSemanaString = "Miércoles"
    case 4: diaSemanaString = "Jueves"
    case 5: diaSemanaString = "Viernes"
    case 6: diaSemanaString = "Sábado"
}

let mesString = ""
switch (mes) {
    case 0: mesString = "Enero"
    case 1: mesString = "Febrero"
    case 2: mesString = "Marzo"
    case 3: mesString = "Abril"
    case 4: mesString = "Mayo"
    case 5: mesString = "Junio"
    case 6: mesString = "Julio"
    case 7: mesString = "Agosto"
    case 8: mesString = "Septiembre"
    case 9: mesString = "Octubre"
    case 10: mesString = "Noviembre"
    case 11: mesString = "Diciembre"
}

