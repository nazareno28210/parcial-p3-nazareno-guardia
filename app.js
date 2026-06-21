// ---------- ELEMENTOS DEL DOM ----------

const formRegistro = document.getElementById("formRegistro");
const formLogin = document.getElementById("formLogin");

const mensajeRegistro = document.getElementById("mensaje-registro");
const mensajeLogin = document.getElementById("mensaje-login");

// ---------- SIMULACIÓN DE SERVIDOR ----------

function fakeRequest(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}

// ---------- FUNCIONES AUXILIARES ----------

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrarMensaje(elemento, mensaje, tipo) {
    elemento.textContent = mensaje;
    elemento.className = tipo;
}

function calcularEdad(fechaNacimiento) {

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const diferenciaMeses =
        hoy.getMonth() - nacimiento.getMonth();

    if (
        diferenciaMeses < 0 ||
        (
            diferenciaMeses === 0 &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {
        edad--;
    }

    return edad;
}

// ---------- REGISTRO ----------

formRegistro.addEventListener("submit", async function (e) {

    e.preventDefault();

    mensajeRegistro.textContent = "";

    const nombre =
        document.getElementById("nombre-registro").value.trim();

    const apellido =
        document.getElementById("apellido-registro").value.trim();

    const email =
        document.getElementById("email-registro").value.trim();

    const fechaNacimiento =
        document.getElementById("fechaDeNacimiento-registro").value;

    const password =
        document.getElementById("password-registro").value;

    const passwordConfirmacion =
        document.getElementById("password-confirmation-registro").value;

    const terminos =
        document.getElementById("terminos").checked;

    // VALIDACIONES

    if (
        !nombre ||
        !apellido ||
        !email ||
        !fechaNacimiento ||
        !password ||
        !passwordConfirmacion
    ) {
        mostrarMensaje(
            mensajeRegistro,
            "Todos los campos son obligatorios.",
            "error"
        );
        return;
    }

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        mostrarMensaje(
            mensajeRegistro,
            "El email no es válido.",
            "error"
        );
        return;
    }

    if (password.length < 8) {
        mostrarMensaje(
            mensajeRegistro,
            "La contraseña debe tener al menos 8 caracteres.",
            "error"
        );
        return;
    }

    if (!/\d/.test(password)) {
        mostrarMensaje(
            mensajeRegistro,
            "La contraseña debe contener al menos un número.",
            "error"
        );
        return;
    }

    if (password !== passwordConfirmacion) {
        mostrarMensaje(
            mensajeRegistro,
            "Las contraseñas no coinciden.",
            "error"
        );
        return;
    }

    if (calcularEdad(fechaNacimiento) < 18) {
        mostrarMensaje(
            mensajeRegistro,
            "Debes ser mayor de 18 años.",
            "error"
        );
        return;
    }

    if (!terminos) {
        mostrarMensaje(
            mensajeRegistro,
            "Debes aceptar los términos y condiciones.",
            "error"
        );
        return;
    }

    const usuarios = obtenerUsuarios();

    const usuarioExistente = usuarios.find(
        usuario => usuario.email === email
    );

    if (usuarioExistente) {
        mostrarMensaje(
            mensajeRegistro,
            "Ese email ya está registrado.",
            "error"
        );
        return;
    }

    // ASINCRONÍA

    mostrarMensaje(
        mensajeRegistro,
        "Cargando...",
        ""
    );

    await fakeRequest();

    usuarios.push({
        nombre,
        apellido,
        email,
        password,
        fechaNacimiento
    });

    guardarUsuarios(usuarios);

    mostrarMensaje(
        mensajeRegistro,
        "Usuario registrado correctamente.",
        "exito"
    );

    formRegistro.reset();
});

// ---------- LOGIN ----------

formLogin.addEventListener("submit", async function (e) {

    e.preventDefault();

    mensajeLogin.textContent = "";

    const email =
        document.getElementById("email-login").value.trim();

    const password =
        document.getElementById("password-login").value;

    mostrarMensaje(
        mensajeLogin,
        "Cargando...",
        ""
    );

    await fakeRequest();

    const usuarios = obtenerUsuarios();

    const usuario = usuarios.find(
        usuario => usuario.email === email
    );

    if (!usuario) {

        mostrarMensaje(
            mensajeLogin,
            "Usuario no encontrado.",
            "error"
        );

        return;
    }

    if (usuario.password !== password) {

        mostrarMensaje(
            mensajeLogin,
            "Contraseña incorrecta.",
            "error"
        );

        return;
    }

    mostrarMensaje(
        mensajeLogin,
        `Bienvenido ${usuario.nombre}`,
        "exito"
    );

    formLogin.reset();
});