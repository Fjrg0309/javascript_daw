let db;

// Abrir base de datos IndexedDB y crear object store si es necesario
const request = indexedDB.open("CRM_Database", 1);

request.onerror = function(event) {
    console.error("Error abriendo IndexedDB", event);
};

request.onsuccess = function(event) {
    db = event.target.result;
    fetchClients(); // Cargar clientes almacenados
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    if(!db.objectStoreNames.contains('clients')) {
        const objectStore = db.createObjectStore('clients', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
        objectStore.createIndex('phone', 'phone', { unique: false });
    }
};

// --- VALIDACIONES ---
const form = document.getElementById('client-form');
const addBtn = document.getElementById('add-btn');
const inputs = form.querySelectorAll('input');

addBtn.disabled = true;

// Expresiones regulares simples
const patterns = {
    name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]{7,15}$/
};

const validationState = {
    name: false,
    email: false,
    phone: false
};

inputs.forEach(input => {
    input.addEventListener('blur', e => {
        const field = e.target.name;
        const value = e.target.value.trim();

        if(patterns[field].test(value)) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            validationState[field] = true;
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            validationState[field] = false;
        }

        // Activar botón si todos válidos
        addBtn.disabled = !(validationState.name && validationState.email && validationState.phone);
    });
});

// --- AGREGAR CLIENTE ---
form.addEventListener('submit', e => {
    e.preventDefault();

    const newClient = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value
    };

    const transaction = db.transaction(['clients'], 'readwrite');
    const store = transaction.objectStore('clients');
    store.add(newClient);

    transaction.oncomplete = function() {
        form.reset();
        inputs.forEach(i => i.classList.remove('valid'));
        addBtn.disabled = true;
        fetchClients();
    };
});

// --- LISTADO DINÁMICO ---
function fetchClients() {
    const transaction = db.transaction(['clients'], 'readonly');
    const store = transaction.objectStore('clients');
    const request = store.getAll();

    request.onsuccess = function() {
        const list = document.getElementById('clients-list');
        list.innerHTML = '';

        request.result.forEach(client => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${client.name} - ${client.email} - ${client.phone}
                <button onclick="editClient(${client.id})">Editar</button>
                <button onclick="deleteClient(${client.id})">Eliminar</button>
            `;
            list.appendChild(li);
        });
    };
}

// --- EDITAR CLIENTE ---
window.editClient = function(id) {
    const transaction = db.transaction(['clients'], 'readonly');
    const store = transaction.objectStore('clients');
    const request = store.get(id);

    request.onsuccess = function() {
        const client = request.result;
        form.name.value = client.name;
        form.email.value = client.email;
        form.phone.value = client.phone;

        addBtn.textContent = "Guardar cambios";

        form.onsubmit = function(e) {
            e.preventDefault();
            client.name = form.name.value;
            client.email = form.email.value;
            client.phone = form.phone.value;

            const updateTx = db.transaction(['clients'], 'readwrite');
            updateTx.objectStore('clients').put(client);

            updateTx.oncomplete = function() {
                form.reset();
                addBtn.textContent = "Añadir";
                fetchClients();
            };
        };
    };
};

// --- ELIMINAR CLIENTE ---
window.deleteClient = function(id) {
    const transaction = db.transaction(['clients'], 'readwrite');
    const store = transaction.objectStore('clients');
    store.delete(id);

    transaction.oncomplete = function() {
        fetchClients();
    };
};


