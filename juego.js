// Variables del juego (globales o encapsuladas si es un módulo más grande)
let vida = 5;
let miembros = 3;
let mochila = [];

// Referencias a los elementos del DOM
const gameOutputDiv = document.getElementById("game-output");
const gameOptionsDiv = document.getElementById("game-options");
const gameStatusDiv = document.getElementById("game-status");

// Función para mostrar texto en la salida del juego
function logToGameOutput(message) {
    gameOutputDiv.innerHTML += `<p>${message}</p>`;
    gameOutputDiv.scrollTop = gameOutputDiv.scrollHeight; // Auto-scroll al final
}

// Función para mostrar el estado actual del juego
function mostrarEstado() {
    gameStatusDiv.innerText = `🧠 VIDA: ${vida} | 👥 MIEMBROS: ${miembros} | 🎒 MOCHILA: [${mochila.join(", ") || "vacía"}]`;
}

// Función principal para preguntar y manejar las opciones
function preguntar(pregunta, opciones, acciones) {
    mostrarEstado();
    logToGameOutput(`\n${pregunta}`); // Añade la pregunta a la salida
    gameOptionsDiv.innerHTML = ''; // Limpia las opciones anteriores

    opciones.forEach((op, i) => {
        const button = document.createElement("button");
        button.innerText = `${i + 1}. ${op}`;
        button.onclick = () => {
            // Cuando se hace clic en un botón, ejecuta la acción correspondiente
            acciones[i]();
        };
        gameOptionsDiv.appendChild(button);
    });
}

// --- Funciones de escenarios ---

function escenario1() {
    preguntar(
        "¿Dónde buscar comida?",
        ["Supermercado abandonado", "Robar a un sobreviviente"],
        [
            () => {
                mochila.push("comida", "agua");
                vida--;
                logToGameOutput("Encuentras comida y agua, pero un saqueador te hiere. (vida -1)");
                escenario2();
            },
            () => {
                mochila.push("linterna");
                miembros--;
                logToGameOutput("Robas una linterna, pero un miembro muere en represalia. (miembros -1)");
                escenario2();
            },
        ]
    );
}

function escenario2() {
    preguntar(
        "¿Dónde refugiarse?",
        ["Farmacia", "Estación de buses", "Tienda abandonada"],
        [
            () => {
                mochila.push("botiquin");
                vida++;
                logToGameOutput("Encuentras un botiquín y descansas. (vida +1)");
                escenario3();
            },
            () => {
                vida--;
                logToGameOutput("Te lastimas entre los escombros. (vida -1)");
                escenario3();
            },
            () => {
                mochila.push("bateria");
                vida--;
                logToGameOutput("Encuentras una batería, pero hay radiación. (vida -1)");
                escenario3();
            },
        ]
    );
}

function escenario3() {
    preguntar(
        "Escuchas gritos en un callejón...",
        ["Ayudar a la familia", "Ignorar", "Distraer enemigos", "Robar recursos"],
        [
            () => {
                miembros++;
                mochila.push("mapa");
                logToGameOutput("Salvas a la familia. Ganas un miembro y un mapa.");
                escenario4();
            },
            () => {
                miembros--;
                logToGameOutput("Ignoras los gritos. El grupo se debilita moralmente. (miembros -1)");
                escenario4();
            },
            () => {
                mochila.push("linterna");
                vida--;
                logToGameOutput("Los distraes desde lejos. Ganas linterna, pierdes vida. (vida -1)");
                escenario4();
            },
            () => {
                mochila.push("comida");
                miembros -= 2;
                logToGameOutput("Robas comida, pero te descubren. (miembros -2)");
                escenario4();
            },
        ]
    );
}

function escenario4() {
    preguntar(
        "Ves una columna de humo a lo lejos...",
        ["Investigar", "Evitar la zona"],
        [
            () => {
                mochila.push("llave", "gasolina");
                logToGameOutput("Encuentras gasolina y una llave vieja.");
                escenario5();
            },
            () => {
                logToGameOutput("Evitaste la zona y una posible emboscada.");
                escenario5();
            },
        ]
    );
}

function escenario5() {
    preguntar(
        "¿Cómo obtener información?",
        ["Subir a un edificio", "Moverse por callejones", "Usar alcantarilla"],
        [
            () => {
                mochila.push("intel");
                logToGameOutput("Encuentras un dron con información útil.");
                escenario6();
            },
            () => {
                vida--;
                logToGameOutput("Te atacan animales salvajes. (vida -1)");
                escenario6();
            },
            () => {
                mochila.push("tarjeta-acceso");
                logToGameOutput("Llegas a una entrada secreta al metro.");
                escenario6();
            },
        ]
    );
}

function escenario6() {
    preguntar(
        "Debes moverte antes del anochecer...",
        ["Reparar bicicleta", "Ir a pie"],
        [
            () => {
                mochila.push("medicinas", "bateria");
                logToGameOutput("Encuentras recursos valiosos en una mochila.");
                final();
            },
            () => {
                vida--;
                logToGameOutput("Caminas mucho y te agotas. (vida -1)");
                final();
            },
        ]
    );
}

function final() {
    logToGameOutput("\n🎬 Evaluando condiciones...");
    mostrarEstado();
    // Limpiar las opciones después de que el juego termina
    gameOptionsDiv.innerHTML = '';
    const tieneMapa = mochila.includes("mapa");
    if (vida >= 3 && mochila.length >= 2 && tieneMapa) {
        logToGameOutput("\n✅ ¡Sobreviviste! Has accedido al túnel del metro. La historia continúa...");
    } else {
        logToGameOutput("\n❌ No cumples con las condiciones para avanzar. Quedas atrapado en la ciudad.");
    }
}

// Inicio del juego
logToGameOutput("🌆 ESCENARIO 1: LA SUPERFICIE");
logToGameOutput("Te despiertas entre escombros. El cielo es rojo y la ciudad está en ruinas.");
escenario1();