import z from 'https://cdn.jsdelivr.net/npm/zod@3.25.11/+esm';

// 1️⃣ Definir el esquema de validación
const registroSchema = z.object({
  nombre: z.string()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  email: z.string()
    .email("El correo no es válido"),

  password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
});

// 2️⃣ Obtener referencias al formulario y mensajes de error
const form = document.getElementById("registroForm");
const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");
const resultado = document.getElementById("resultado");

// 3️⃣ Validación en tiempo real
form.addEventListener("input", () => {
  validarFormulario();
});

// 4️⃣ Manejar el envío del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const esValido = validarFormulario();

  if (esValido) {
    resultado.textContent = "✅ Registro exitoso!";
    resultado.style.color = "green";
  } else {
    resultado.textContent = "❌ Corrige los errores antes de continuar.";
    resultado.style.color = "red";
  }
});

// 5️⃣ Función de validación
function validarFormulario() {
  // Capturar datos del formulario
  const userData = {
    nombre: form.nombre.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value.trim(),
  };

  // Validar usando Zod
  const validacion = registroSchema.safeParse(userData);

  // Limpiar mensajes previos
  errorNombre.textContent = "";
  errorEmail.textContent = "";
  errorPassword.textContent = "";

  if (!validacion.success) {
    validacion.error.errors.forEach(err => {
      if (err.path[0] === "nombre") errorNombre.textContent = err.message;
      if (err.path[0] === "email") errorEmail.textContent = err.message;
      if (err.path[0] === "password") errorPassword.textContent = err.message;
    });
    return false;
  }
  return true;
}
