// ==============================
// Mini-app: Notas con DOM + LocalStorage
// ==============================

// ----- Selección e inspección -----
const inputNota = document.getElementById("inputNota");
const btnAgregar = document.getElementById("btnAgregar");

const listaNotas = document.querySelector("#listaNotas");

console.log("inputNota:", inputNota);
console.log("btnAgregar:", btnAgregar);
console.log("listaNotas:", listaNotas);

// ----- Persistencia -----
let notas = [];

const notasGuardadas = localStorage.getItem("notas");

if (notasGuardadas) {
    notas = JSON.parse(notasGuardadas);
    console.log(`Se cargaron ${notas.length} notas desde LocalStorage.`);
} else {
    console.log("No hay notas guardadas en LocalStorage.");
}

// ----- Guardar en LocalStorage -----
function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Notas guardadas en LocalStorage:", notas);
}

// ----- Eliminar notas y actualizar -----
function eliminarNota(notaAEliminar) {
    const index = notas.indexOf(notaAEliminar);
    if (index === -1) return;

    notas.splice(index, 1);

    guardarNotas();
    renderNotas();

    console.log("Nota eliminada:", notaAEliminar);
}

// ----- Render y agregar notas al DOM -----
function renderNotas() {
    listaNotas.textContent = "";

    for (const nota of notas) {
        const li = document.createElement("li");
        li.textContent = nota;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        btnEliminar.addEventListener("click", () => {
            listaNotas.removeChild(li);
            eliminarNota(nota);
            console.log("Se eliminó la nota desde el DOM:", nota);
        });

        li.appendChild(btnEliminar);
        listaNotas.appendChild(li);
    }
}

// ----- Evento Agregar -----
function agregarNota() {
    const texto = inputNota.value.trim();

    if (texto === "") {
        alert("Debes agregar una nota antes.");
        return;
    }

    notas.push(texto);

    guardarNotas();
    renderNotas();

    inputNota.value = "";
    inputNota.focus();

    console.log("Nota agregada:", texto);
}

btnAgregar.addEventListener("click", agregarNota);

renderNotas();