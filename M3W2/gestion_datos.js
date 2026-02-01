// ==============================
// Gestión de datos
// ==============================

// ----- TASK 1: Creación del objeto de productos -----
const products = {
    P01: { id: "P01", nombre: "Corolla", precio: 120_000_000},
    P02: { id: "P02", nombre: "RAV4", precio: 180_000_000},
    P03: { id: "P03", nombre: "Fortuner", precio: 250_000_000}
};

// ----- TASK 2: Uso de Set en JavaScript -----

const numbers = [10, 20 , 20, 30, 40, 40, 50];
const uniqueNumbers = new Set(numbers);

console.log("Set sin duplicados:", uniqueNumbers);

// ----- Operaciones -----

uniqueNumbers.add(80);
console.log("Después de add(80):", uniqueNumbers);

console.log("¿Existe el número 20?", uniqueNumbers.has(20));

uniqueNumbers.delete(50);
console.log("Después de delete(50):", uniqueNumbers);

console.log("Recorrido del Set con for...of:");
for (const value of uniqueNumbers) {
    console.log("Valor:", value);
}

// ----- TASK 3: Uso de Map en JavaScript -----

const categoryToProductName = new Map();

categoryToProductName.set("SUV", ["RAV4", "Fortuner"]);
categoryToProductName.set("Sedan", ["Corolla"]);

// ----- TASK 4: Iteración sobre estructuras -----

console.log("Recorrido del objeto products con for...in:");
for (const key in products) {
    console.log("Clave:", key, "Valor:", products[key]);
}

console.log("Recorrido del Map con for...Each:");
categoryToProductName.forEach((value, key) => {
    console.log(`Categoría: ${key} -> Productos: ${value.join(", ")}`);
});

console.log("Recorrido del Map con for...of:");
for (const [key, value] of categoryToProductName) {
    console.log(`Categoría: ${key} -> Productos: ${value.join(", ")}`);
}

console.log("Object.keys(products)", Object.keys(products));
console.log("Object.values(products)", Object.values(products));
console.log("Object.entries(products)", Object.entries(products));

// TASK 5: Validación de productos

function isValidProduct(product) {
    const hasValidId = typeof product.id === "string" && product.id.trim() !== "";
    const hasValidName = typeof product.nombre === "string" && product.nombre.trim() !== "";
    const hasValidPrice = typeof product.precio === "number" && !Number.isNaN(product.precio) && product.precio > 0;

    return hasValidId && hasValidName && hasValidPrice;
}

console.log("Validación de productos:");
for (const key in products) {
    const product = products[key];
    if (!isValidProduct(product)) {
        console.error("Producto inválido:", key, product);
    } else {
        console.log("Producto válido:", key, product);
    }
}

// ==============================

console.log("Lista completa de productos (objeto):", products);
console.log("lista de números únicos (Set):", uniqueNumbers);
console.log("Categorías y productos (Map):", categoryToProductName);