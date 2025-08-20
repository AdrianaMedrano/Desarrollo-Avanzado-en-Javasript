// Número de mesas disponibles en el restaurante
let mesasDisponibles = 5;

// Actualiza el contador de mesas en pantalla
function actualizarContador() {
  document.getElementById("contadorMesas").textContent =
    `Mesas disponibles: ${mesasDisponibles}`;
}

// 1️⃣ Verificar Disponibilidad de Mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve(`✅ ${mesasSolicitadas} mesa(s) reservada(s).`);
      } else {
        reject(`❌ No hay suficientes mesas disponibles. Disponibles: ${mesasDisponibles}`);
      }
    }, 1500); // simulamos un retraso
  });
}

// 2️⃣ Simular Envío de Confirmación por Correo
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) { // 80% de éxito
        resolve(`📧 Correo de confirmación enviado a ${nombreCliente}`);
      } else {
        reject("❌ Error al enviar el correo de confirmación");
      }
    }, 2000);
  });
}

// 3️⃣ Función principal con control de flujo usando async/await
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    // Paso 1: Verificar disponibilidad
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad);

    // Actualizar las mesas disponibles
    mesasDisponibles -= mesasSolicitadas;
    actualizarContador();

    // Paso 2: Enviar confirmación
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion);

    return `🎉 Reserva completada para ${nombreCliente}.`;
  } catch (error) {
    return error; // Captura errores de disponibilidad o correo
  } finally {
    console.log("➡️ Proceso de reserva finalizado.");
  }
}

// 4️⃣ Conexión con la interfaz
document.getElementById("formReserva").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const mesasSolicitadas = parseInt(document.getElementById("mesas").value, 10);
  const resultado = document.getElementById("resultado");

  resultado.textContent = "⏳ Procesando reserva...";
  resultado.style.color = "black";

  const mensaje = await hacerReserva(nombre, mesasSolicitadas);
  resultado.textContent = mensaje;
  resultado.style.color = mensaje.startsWith("❌") ? "red" : "green";
});

// Inicializa el contador al cargar la página
actualizarContador();
