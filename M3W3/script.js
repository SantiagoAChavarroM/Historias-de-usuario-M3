// ==============================
// Mini-app: Notes with DOM + LocalStorage
// ==============================

// ----- Selection and inspection -----
const inputNota = document.getElementById("inputNota");
const btnAgregar = document.getElementById("btnAgregar");

const listaNotas = document.querySelector("#listaNotas");

console.log("inputNota:", inputNota);
console.log("btnAgregar:", btnAgregar);
console.log("listaNotas:", listaNotas);

// ----- Persistence -----
let notas = [];

const notasGuardadas = localStorage.getItem("notas");

if (notasGuardadas) {
    notas = JSON.parse(notasGuardadas);
    console.log(`Se cargaron ${notas.length} notas desde LocalStorage.`);
} else {
    console.log("No hay notas guardadas en LocalStorage.");
}

// ----- Save to LocalStorage -----
function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("Notas guardadas en LocalStorage:", notas);
}

// ----- Delete notes and update -----
function eliminarNota(notaAEliminar) {
    const index = notas.indexOf(notaAEliminar);
    if (index === -1) return;

    notas.splice(index, 1);

    guardarNotas();
    renderNotas();

    console.log("Nota eliminada:", notaAEliminar);
}

// ----- Render and add notes to the DOM -----
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

// ----- Event Add -----
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