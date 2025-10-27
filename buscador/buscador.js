let listaPokemon = [];

async function cargarListaPokemon() {
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000');
        const datos = await respuesta.json();
        
        listaPokemon = datos.results.map(p => p.name);

        console.log(`Lista de ${listaPokemon.length} Pokémon cargada.`);
    } catch (error) {
        console.error('Error al cargar la lista de Pokémon:', error);
    }
}

cargarListaPokemon();

const inputBuscador = document.getElementById('buscador');
const contenedorSugerencias = document.getElementById('sugerencias');

inputBuscador.addEventListener('input', () => {
    const texto = inputBuscador.value.toLowerCase().trim();
    contenedorSugerencias.innerHTML = '';

    if (!texto || listaPokemon.length === 0) return;

    const coincidencias = listaPokemon.filter(nombre => nombre.includes(texto));

    const primeros = coincidencias.slice(0, 20);

    primeros.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        li.classList.add('sugerencia-item');
        contenedorSugerencias.appendChild(li);
    });
});

contenedorSugerencias.addEventListener('click', (e) => {

    if (e.target && e.target.matches('li.sugerencia-item')) {
        const nombreSeleccionado = e.target.textContent;

        inputBuscador.value = nombreSeleccionado;

        contenedorSugerencias.innerHTML = '';

        document.getElementById('buscar').click();
    }
});

let indiceSeleccionado = -1;

inputBuscador.addEventListener('keydown', (e) => {
    const sugerencias = contenedorSugerencias.querySelectorAll('li.sugerencia-item');

    if (sugerencias.length === 0) return;

    if (e.key === 'ArrowDown') {

        indiceSeleccionado = (indiceSeleccionado + 1) % sugerencias.length;
        actualizarSeleccion(sugerencias);
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {

        indiceSeleccionado = (indiceSeleccionado - 1 + sugerencias.length) % sugerencias.length;
        actualizarSeleccion(sugerencias);
        e.preventDefault();
    } else if (e.key === 'Enter') {

        if (indiceSeleccionado >= 0) {
            const nombreSeleccionado = sugerencias[indiceSeleccionado].textContent;
            inputBuscador.value = nombreSeleccionado;
            contenedorSugerencias.innerHTML = '';
            document.getElementById('buscar').click();
            indiceSeleccionado = -1;
            e.preventDefault();
        }
    } else {
        indiceSeleccionado = -1;
    }
});

function actualizarSeleccion(sugerencias) {
    sugerencias.forEach((li, i) => {
        if (i === indiceSeleccionado) {
            li.classList.add('seleccionado');
            li.scrollIntoView({ block: 'nearest' });
        } else {
            li.classList.remove('seleccionado');
        }
    });
}

document.addEventListener('click', (e) => {
    const dentroDelBuscador = e.target.closest('.buscador-wrap');
    if (!dentroDelBuscador) {
        contenedorSugerencias.innerHTML = '';
        indiceSeleccionado = -1;
    }
});

document.getElementById('buscar').addEventListener('click', () => {
    contenedorSugerencias.innerHTML = '';
    indiceSeleccionado = -1;
});

document.getElementById('buscar').addEventListener('click', async () => {
    const nombre = document.getElementById('buscador').value.toLowerCase().trim();
    const resultado = document.getElementById('resultado');

    if (!nombre) {
        resultado.innerHTML = '<p>Por favor, escribe el nombre o número de un Pokémon.</p>';
        return;
    }

    resultado.innerHTML = '<p>Buscando...</p>';

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!respuesta.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const datos = await respuesta.json();

        resultado.innerHTML = `
            <div class="pokemon-card">
                <h2>${datos.name.toUpperCase()} (#${datos.id})</h2>
                <img src="${datos.sprites.other['official-artwork'].front_default}" alt="${datos.name}">
                <p><strong>Altura:</strong> ${datos.height / 10} m</p>
                <p><strong>Peso:</strong> ${datos.weight / 10} kg</p>
                <p><strong>Tipo:</strong> ${datos.types.map(t => t.type.name).join(', ')}</p>
            </div>
        `;
    } catch (error) {
        resultado.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
});
