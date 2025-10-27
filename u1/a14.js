
let archivos = [];

document.getElementById('imagenInput').addEventListener('change', function(event) {
    archivos = Array.from(event.target.files);
    const lista = document.getElementById('listaImagenes');

    lista.innerHTML = '<option value="">Selecciona una imagen</option>';

    archivos.forEach((archivo, index) => {
    const opcion = document.createElement('option');
    opcion.value = index;
    opcion.textContent = archivo.name;
    lista.appendChild(opcion);
    });
});

function mostrarImagen() {
    const seleccion = document.getElementById('listaImagenes').value;
    const img = document.getElementById('imagenSeleccionada');

    if (seleccion !== '') {
        const archivo = archivos[seleccion];
        const url = URL.createObjectURL(archivo);
        img.src = url;
        img.style.display = 'block';
    } else {
        img.src = '';
        img.style.display = 'none';
        }
    }