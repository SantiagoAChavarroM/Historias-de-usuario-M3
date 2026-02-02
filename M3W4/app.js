// ==============================
// DOM + LocalStorage + Fetch CRUD (JSON Server)
// ==============================

// ----- TASK 1: Config -----
const API_URL = "http://localhost:3000/items";
const STORAGE_KEY = "items";

// ----- TASK 2: DOM Selection -----
const formProducto = document.getElementById("formProducto");
const inputNombre = document.getElementById("inputNombre");
const inputPrecio = document.getElementById("inputPrecio");

const listaItems = document.querySelector("#listaItems");
const btnSync = document.querySelector("#btnSync");
const mensaje = document.querySelector("#mensaje");

// Inspection: confirm references
console.log("DOM refs:", {
    formProducto,
    inputNombre,
    inputPrecio,
    listaItems,
    btnSync,
    mensaje
});

// ----- Memory status (TASK 4) -----
let items = [];

// ----- dynamic messages (TASK 2) -----
function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo || "info";
    console.log("[" + (tipo || "info").toUpperCase() + "] " + texto);
}

// ----- Validations (TASK 2) -----
function validarDatos(nombre, precio) {
    if (nombre.trim() === "") return "El nombre no puede estar vacío.";

    const precioNum = Number(precio);
    if (Number.isNaN(precioNum) || precioNum <= 0) {
        return "El precio debe ser un número mayor que 0.";
    }
    return null;
}

// ----- LocalStorage (TASK 4) -----
function guardarEnLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    console.log("LocalStorage actualizado:", items);
}

function cargarDesdeLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        items = [];
        console.log("No hay items guardados en LocalStorage.");
        return;
    }
    items = JSON.parse(data);
    console.log("Cargados " + items.length + " items desde LocalStorage.");
}

// ----- TASK 5: Fetch API CRUD -----
async function apiGetItems() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("GET falló: " + res.status);
        const data = await res.json();

        console.log("GET /items:", data);
        mostrarMensaje("GET OK: " + data.length + " items cargados desde API.", "success");

        items = data;
        guardarEnLocalStorage();
        renderItems();
    } catch (err) {
        console.error(err);
        mostrarMensaje("Error GET: revisa si JSON Server está corriendo.", "error");
    }
}

async function apiPostItem(item) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
        if (!res.ok) throw new Error("POST falló: " + res.status);

        const creado = await res.json();
        console.log("POST /items:", creado);
        return creado;
    } catch (err) {
        console.error(err);
        mostrarMensaje("Error POST.", "error");
        return null;
    }
}

async function apiDeleteItem(id) {
    try {
        const res = await fetch(API_URL + "/" + id, { method: "DELETE" });
        if (!res.ok) throw new Error("DELETE falló: " + res.status);

        console.log("DELETE /items/" + id + ": OK");
        return true;
    } catch (err) {
        console.error(err);
        mostrarMensaje("Error DELETE.", "error");
        return false;
    }
}

async function apiPutItem(id, cambios) {
    try {
        const res = await fetch(API_URL + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cambios)
        });
        if (!res.ok) throw new Error("PUT falló: " + res.status);

        const actualizado = await res.json();
        console.log("PUT /items/:id:", actualizado);
        return actualizado;
    } catch (err) {
        console.error(err);
        mostrarMensaje("Error PUT.", "error");
        return null;
    }
}

// ----- TASK 3: Render (DOM) using appendChild/removeChild -----
function renderItems() {
    listaItems.textContent = "";

    for (const item of items) {
        const li = document.createElement("li");
        li.textContent = item.nombre + " - $" + item.precio + " ";

        // ----- EDIT BUTTON (PUT) -----
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", async function () {
            const nuevoNombre = prompt("Nuevo nombre:", item.nombre);
            const nuevoPrecio = prompt("Nuevo precio:", String(item.precio));

            if (nuevoNombre === null || nuevoPrecio === null) return;

            const error = validarDatos(nuevoNombre, nuevoPrecio);
            if (error) {
                mostrarMensaje(error, "error");
                return;
            }

            const cambios = {
                id: item.id,
                nombre: nuevoNombre.trim(),
                precio: Number(nuevoPrecio)
            };

            const actualizado = await apiPutItem(item.id, cambios);
            if (!actualizado) return;

            items = items.map(function (x) {
                return x.id === item.id ? actualizado : x;
            });

            guardarEnLocalStorage();
            renderItems();

            mostrarMensaje("Actualizado: " + actualizado.nombre, "success");
        });

        // ----- DELETE BUTTON (DELETE) -----
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.addEventListener("click", async function () {
            listaItems.removeChild(li);

            items = items.filter(function (x) {
                return x.id !== item.id;
            });
            guardarEnLocalStorage();

            await apiDeleteItem(item.id);

            mostrarMensaje("Eliminado: " + item.nombre, "success");
        });

        // Group buttons in a container
        const actions = document.createElement("div");
        actions.className = "actions";

        actions.appendChild(btnEditar);
        actions.appendChild(btnEliminar);

        li.appendChild(actions);
        listaItems.appendChild(li);

    }
}

// ----- Events -----
formProducto.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = inputNombre.value;
    const precio = inputPrecio.value;

    const error = validarDatos(nombre, precio);
    if (error) {
        mostrarMensaje(error, "error");
        return;
    }

    const nuevoItem = {
        id: crypto.randomUUID(),
        nombre: nombre.trim(),
        precio: Number(precio)
    };

    const creado = await apiPostItem(nuevoItem);
    if (!creado) return;

    items.push(creado);
    guardarEnLocalStorage();
    renderItems();

    inputNombre.value = "";
    inputPrecio.value = "";
    inputNombre.focus();

    mostrarMensaje("Agregado: " + creado.nombre, "success");
});

btnSync.addEventListener("click", apiGetItems);

// ----- Initialization (TASK 4) -----
async function iniciarApp() {
    cargarDesdeLocalStorage();
    renderItems();
    mostrarMensaje("App lista. Datos cargados desde LocalStorage.", "info");

    await apiGetItems();
}

iniciarApp();