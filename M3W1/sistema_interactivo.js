// ==============================
// Interactive messaging system
// ==============================

// ----- TASK 2: User data entry -----

const userName = prompt("Ingresa tu nombre:");
const ageInput = prompt("Ingresa tu edad:");

// -----TASK 3: Age validation -----

const userAge = Number(ageInput);

// -----TASK 4: Conditionals and dynamic messages -----

if (Number.isNaN(userAge)) {
    console.error("Error: Por favor, ingresa una edad válida en números.");
} else {

    if (userAge < 18) {
        alert(`Hola ${userName}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`);
        console.log(`Hola ${userName}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`);
    } else {
        alert(`Hola ${userName}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`);
        console.log(`Hola ${userName}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`);
    }
}
