const form = document.getElementById("inicio");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const mostrar = document.getElementById("mostrar");
const contador = document.getElementById("contador");
const fuerza = document.getElementById("fuerza");
const mensajeLogin = document.getElementById("mensajeLogin");
const botonEnviar = document.getElementById("enviar");

let intentos = 0;
let bloqueado = false;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (bloqueado) return;

    const userValido = validarUsuario();
    const passValido = validarPassword();

    if (userValido && passValido) {
        mensajeLogin.innerHTML = "<span class='text-success'>Login correcto (simulado)</span>";
        intentos = 0;
    } else {
        intentos++;
        mensajeLogin.innerHTML = "<span class='text-danger'>Datos incorrectos</span>";

        if (intentos >= 3) {
            bloquearFormulario();
        }
    }
});
function validarUsuario() {
    const regex = /^[a-zA-Z0-9.-]{3,}$/;

    if (!regex.test(usuario.value)) {
        document.getElementById("mensajeUsuario").textContent =
            "Mínimo 3 caracteres. Solo letras, números, puntos y guiones.";
        return false;
    }

    document.getElementById("mensajeUsuario").textContent = "";
    return true;
}

mostrar.addEventListener("click", function() {
    if (password.type === "password") {
        password.type = "text";
        mostrar.textContent = "Ocultar";
    } else {
        password.type = "password";
        mostrar.textContent = "Mostrar";
    }
});

password.addEventListener("input", function() {
    contador.textContent = password.value.length;
    validarPassword();
});

function validarPassword() {
    const valor = password.value;

    const tieneNumero = /[0-9]/.test(valor);
    const tieneEspecial = /[!@#$%^&*]/.test(valor);
    const tieneMayus = /[A-Z]/.test(valor);

    if (valor.length >= 8 && tieneNumero && tieneEspecial && tieneMayus) {
        fuerza.textContent = "Fortaleza: Fuerte";
        fuerza.className = "text-success";
        return true;
    } else if (valor.length >= 6) {
        fuerza.textContent = "Fortaleza: Media";
        fuerza.className = "text-warning";
        return false;
    } else {
        fuerza.textContent = "Fortaleza: Débil";
        fuerza.className = "text-danger";
        return false;
    }
}

function bloquearFormulario() {
    bloqueado = true;
    botonEnviar.disabled = true;

    mensajeLogin.innerHTML =
        "<span class='text-danger'>Demasiados intentos. Espere 30 segundos.</span>";

    setTimeout(() => {
        bloqueado = false;
        botonEnviar.disabled = false;
        intentos = 0;
        mensajeLogin.innerHTML = "";
    }, 30000);
}
