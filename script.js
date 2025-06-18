let vida = 5;
let miembros = 3;
let mochila = [];

const mensaje = document.getElementById("mensaje");
const opciones = document.getElementById("opciones");
const vidaSpan = document.getElementById("vida");
const miembrosSpan = document.getElementById("miembros");
const mochilaSpan = document.getElementById("mochila");

function actualizarEstado() {
  vidaSpan.textContent = vida;
  miembrosSpan.textContent = miembros;
  mochilaSpan.textContent = mochila.length ? mochila.join(", ") : "vacía";
}

function mostrarOpciones(texto, opcionesDisponibles) {
  mensaje.textContent = texto;
  opciones.innerHTML = "";
  opcionesDisponibles.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.texto;
    btn.onclick = op.funcion;
    opciones.appendChild(btn);
  });
}

function escenarioComida() {
  mostrarOpciones("¿Dónde buscar comida?", [
    {
      texto: "Supermercado abandonado",
      funcion: () => {
        mochila.push("comida", "agua");
        vida--;
        actualizarEstado();
        escenarioRefugio();
      }
    },
    {
      texto: "Robar a un sobreviviente",
      funcion: () => {
        mochila.push("linterna");
        miembros--;
        actualizarEstado();
        escenarioRefugio();
      }
    }
  ]);
}

function escenarioRefugio() {
  mostrarOpciones("¿Dónde refugiarse?", [
    {
      texto: "Farmacia",
      funcion: () => {
        mochila.push("botiquin");
        vida++;
        actualizarEstado();
        escenarioAyuda();
      }
    },
    {
      texto: "Estación de buses",
      funcion: () => {
        vida--;
        actualizarEstado();
        escenarioAyuda();
      }
    },
    {
      texto: "Tienda abandonada",
      funcion: () => {
        mochila.push("bateria");
        vida--;
        actualizarEstado();
        escenarioAyuda();
      }
    }
  ]);
}

function escenarioAyuda() {
  mostrarOpciones("Escuchas gritos desde un callejón...", [
    {
      texto: "Ayudar a la familia",
      funcion: () => {
        miembros++;
        mochila.push("mapa");
        actualizarEstado();
        escenarioHumo();
      }
    },
    {
      texto: "Ignorar y seguir",
      funcion: () => {
        miembros--;
        actualizarEstado();
        escenarioHumo();
      }
    },
    {
      texto: "Distraer enemigos",
      funcion: () => {
        mochila.push("linterna");
        vida--;
        actualizarEstado();
        escenarioHumo();
      }
    },
    {
      texto: "Robar sin ser visto",
      funcion: () => {
        mochila.push("comida");
        miembros -= 2;
        actualizarEstado();
        escenarioHumo();
      }
    }
  ]);
}

function escenarioHumo() {
  mostrarOpciones("Ves una columna de humo a lo lejos...", [
    {
      texto: "Investigar",
      funcion: () => {
        mochila.push("llave", "gasolina");
        actualizarEstado();
        escenarioExplorar();
      }
    },
    {
      texto: "Evitar la zona",
      funcion: () => {
        actualizarEstado();
        escenarioExplorar();
      }
    }
  ]);
}

function escenarioExplorar() {
  mostrarOpciones("¿Cómo obtener información?", [
    {
      texto: "Subir a un edificio",
      funcion: () => {
        mochila.push("intel");
        actualizarEstado();
        escenarioTransporte();
      }
    },
    {
      texto: "Callejones",
      funcion: () => {
        vida--;
        actualizarEstado();
        escenarioTransporte();
      }
    },
    {
      texto: "Usar alcantarilla",
      funcion: () => {
        mochila.push("tarjeta-acceso");
        actualizarEstado();
        escenarioTransporte();
      }
    }
  ]);
}

function escenarioTransporte() {
  mostrarOpciones("Debes moverte antes que oscurezca...", [
    {
      texto: "Reparar bicicleta",
      funcion: () => {
        mochila.push("medicinas", "bateria");
        actualizarEstado();
        finalJuego();
      }
    },
    {
      texto: "Ir a pie",
      funcion: () => {
        vida--;
        actualizarEstado();
        finalJuego();
      }
    }
  ]);
}

function finalJuego() {
  const tieneMapa = mochila.includes("mapa");
  if (vida >= 3 && mochila.length >= 2 && tieneMapa) {
    mensaje.textContent = "✅ ¡Sobreviviste y accediste al túnel del metro! La historia continúa...";
  } else {
    mensaje.textContent = "❌ No cumpliste los requisitos. Quedas atrapado en la ciudad...";
  }
  opciones.innerHTML = "<button onclick='location.reload()'>Reintentar</button>";
}

actualizarEstado();
escenarioComida();