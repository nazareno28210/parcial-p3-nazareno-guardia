// ==============================
// FUNCIONES DE LOCAL STORAGE
// ==============================

// Obtiene los usuarios guardados o devuelve un array vacío
function obtenerUsuarios() {
  const data = localStorage.getItem("usuarios");

  // Si hay datos, los convierte de string a objeto
  // Si no hay nada, devuelve array vacío
  return data ? JSON.parse(data) : [];
}

// Guarda el array de usuarios en localStorage
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// ==============================
// REGISTRO DE USUARIO
// ==============================

const formRegistro = document.getElementById("formRegistro");
const mensajeRegistro = document.getElementById("mensajeRegistro");

formRegistro.addEventListener("submit", function(e) {
  e.preventDefault(); // evita que recargue la página

  // Obtener valores del formulario
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Obtener usuarios actuales
  const usuarios = obtenerUsuarios();

  // Verificar si el email ya existe
  const existe = usuarios.some(u => u.email === email);

  if (existe) {
    mensajeRegistro.textContent = "El usuario ya existe";
    mensajeRegistro.style.color = "red";
    return;
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    nombre: nombre,
    email: email,
    password: password
  };

  // Agregar al array
  usuarios.push(nuevoUsuario);

  // Guardar en localStorage
  guardarUsuarios(usuarios);

  // Mostrar mensaje
  mensajeRegistro.textContent = "Usuario registrado correctamente";
  mensajeRegistro.style.color = "green";

  // Limpiar formulario
  formRegistro.reset();
});


// ==============================
// LOGIN DE USUARIO
// ==============================

const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

formLogin.addEventListener("submit", function(e) {
  e.preventDefault();

  // Obtener datos
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Obtener usuarios guardados
  const usuarios = obtenerUsuarios();

  // Buscar usuario por email
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    mensajeLogin.textContent = "Usuario no encontrado";
    mensajeLogin.style.color = "red";
    return;
  }

  // Verificar contraseña
  if (usuario.password !== password) {
    mensajeLogin.textContent = "Contraseña incorrecta";
    mensajeLogin.style.color = "red";
    return;
  }

  // Login correcto
  mensajeLogin.textContent = "Login exitoso";
  mensajeLogin.style.color = "green";

  formLogin.reset();
});