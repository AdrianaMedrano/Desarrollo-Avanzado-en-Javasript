const form = document.getElementById('myForm');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Capturar valores
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const intereses = Array.from(document.querySelectorAll('input[name="intereses"]:checked'))
                          .map(el => el.value);
    const horario = document.querySelector('input[name="horario"]:checked');
    const fecha = document.getElementById('fecha').value;
    const archivo = document.getElementById('archivo').files[0];

    // ✅ Validaciones
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/;
    if (!regexNombre.test(name)) {
        alert('Por favor, introduce un nombre válido (mínimo 3 letras).');
        return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(email)) {
        alert('Introduce un correo electrónico válido.');
        return;
    }

    const regexTelefono = /^[0-9]{10}$/;
    if (!regexTelefono.test(telefono)) {
        alert('Introduce un número de teléfono válido de 10 dígitos.');
        return;
    }

    if (intereses.length === 0) {
        alert('Selecciona al menos un interés.');
        return;
    }

    if (!horario) {
        alert('Selecciona un horario.');
        return;
    }

    const hoy = new Date().toISOString().split("T")[0];
    if (fecha < hoy) {
        alert('La fecha debe ser hoy o en el futuro.');
        return;
    }

    // ✅ Construir resumen
    resultado.innerHTML = `
      <h3>✅ Registro exitoso</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Intereses:</strong> ${intereses.join(", ")}</p>
      <p><strong>Horario preferido:</strong> ${horario.value}</p>
      <p><strong>Fecha del evento:</strong> ${fecha}</p>
      <p><strong>Archivo:</strong> ${archivo ? archivo.name : "No adjuntado"}</p>
    `;

    // Reiniciar formulario
    form.reset();
});
