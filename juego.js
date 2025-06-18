const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let vida = 5;
let miembros = 3;
let mochila = [];

function mostrarEstado() {
  console.log(`\n🧠 VIDA: ${vida} | 👥 MIEMBROS: ${miembros} | 🎒 MOCHILA: [${mochila.join(", ") || "vacía"}]`);
}

function preguntar(pregunta, opciones, acciones) {
  mostrarEstado();
  console.log(`\n${pregunta}`);
  opciones.forEach((op, i) => console.log(`${i + 1}. ${op}`));
  rl.question("> Elige una opción: ", (respuesta) => {
    const eleccion = parseInt(respuesta) - 1;
    if (acciones[eleccion]) {
      acciones[eleccion]();
    } else {
      console.log("❌ Opción no válida. Intenta otra vez.");
      preguntar(pregunta, opciones, acciones);
    }
  });
}

function escenario1() {
  preguntar(
    "¿Dónde buscar comida?",
    ["Supermercado abandonado", "Robar a un sobreviviente"],
    [
      () => {
        mochila.push("comida", "agua");
        vida--;
        console.log("Encuentras comida y agua, pero un saqueador te hiere. (vida -1)");
        escenario2();
      },
      () => {
        mochila.push("linterna");
        miembros--;
        console.log("Robas una linterna, pero un miembro muere en represalia. (miembros -1)");
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
        console.log("Encuentras un botiquín y descansas. (vida +1)");
        escenario3();
      },
      () => {
        vida--;
        console.log("Te lastimas entre los escombros. (vida -1)");
        escenario3();
      },
      () => {
        mochila.push("bateria");
        vida--;
        console.log("Encuentras una batería, pero hay radiación. (vida -1)");
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
        console.log("Salvas a la familia. Ganas un miembro y un mapa.");
        escenario4();
      },
      () => {
        miembros--;
        console.log("Ignoras los gritos. El grupo se debilita moralmente. (miembros -1)");
        escenario4();
      },
      () => {
        mochila.push("linterna");
        vida--;
        console.log("Los distraes desde lejos. Ganas linterna, pierdes vida. (vida -1)");
        escenario4();
      },
      () => {
        mochila.push("comida");
        miembros -= 2;
        console.log("Robas comida, pero te descubren. (miembros -2)");
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
        console.log("Encuentras gasolina y una llave vieja.");
        escenario5();
      },
      () => {
        console.log("Evitaste la zona y una posible emboscada.");
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
        console.log("Encuentras un dron con información útil.");
        escenario6();
      },
      () => {
        vida--;
        console.log("Te atacan animales salvajes. (vida -1)");
        escenario6();
      },
      () => {
        mochila.push("tarjeta-acceso");
        console.log("Llegas a una entrada secreta al metro.");
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
        console.log("Encuentras recursos valiosos en una mochila.");
        final();
      },
      () => {
        vida--;
        console.log("Caminas mucho y te agotas. (vida -1)");
        final();
      },
    ]
  );
}

function final() {
  console.log("\n🎬 Evaluando condiciones...");
  mostrarEstado();
  const tieneMapa = mochila.includes("mapa");
  if (vida >= 3 && mochila.length >= 2 && tieneMapa) {
    console.log("\n✅ ¡Sobreviviste! Has accedido al túnel del metro. La historia continúa...");
  } else {
    console.log("\n❌ No cumples con las condiciones para avanzar. Quedas atrapado en la ciudad.");
  }
  rl.close();
}

console.log("🌆 ESCENARIO 1: LA SUPERFICIE");
console.log("Te despiertas entre escombros. El cielo es rojo y la ciudad está en ruinas.");
escenario1();