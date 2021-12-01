//Slide
var opciones = document.querySelector(".opciones .titulo");
var formulario = document.querySelector("form.entrar");

function optRegistro() {
    opciones.style.marginLeft = "-50%";
    formulario.style.marginLeft = "-50%";
}

function optEntrar() {
    opciones.style.marginLeft = "0%";
    formulario.style.marginLeft = "0%";
}

// validacion formulario

function mostrarPass() {
    var tipo = document.getElementById("pass");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    } //Fin Si
}

function mostrarPass2() {
    var tipo = document.getElementById("pass2");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    } //Fin Si
}

function mostrarPassEntrar() {
    var tipo = document.getElementById("passEntrar");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    } //Fin Si
}

window.onload = load;

function load() {
    //Entorno:
    var registrar = document.getElementById("registro");

    //Inputs
    var usuario = document.getElementById("usuario");
    var email = document.getElementById("email");
    var pass = document.getElementById("pass");
    var pass2 = document.getElementById("pass2");
    var error = document.getElementById("errores");

    //Pattern:
    var patternUsuario = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;
    var patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var patternPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,18}$/;

    //Asigno un interruptor a cada variable para despues realizar la validación del formulario
    var enviarUsuario = false;
    var enviarEmail = false;
    var enviarPass = false;
    var enviarPass2 = false;

    //Eventos:
    usuario.addEventListener("blur", validar);
    email.addEventListener("blur", validarEmail);
    pass.addEventListener("blur", validarPass);
    pass2.addEventListener("blur", validarPass2);
    registrar.addEventListener("submit", validarEnviar);

    function borrarError() {
        if (error.innerText.length != 0) {
            error.removeChild(error.firstChild);
        } //Fin Si
    } //Fin Función

    function validar() {
        borrarError();
        if (!patternUsuario.test(this.value)) {
            error.innerHTML = "ERROR: El usuario debe contener entre 5 y 12 carcateres.";
            usuario.setAttribute("class", "error");
            enviarUsuario = false;
        } else {
            usuario.removeAttribute("class");
            enviarUsuario = true;
        } //Fin Si
    } //Fin Funcion

    function validarEmail() {
        borrarError();
        if (!patternEmail.test(this.value)) {
            error.innerHTML = "ERROR: El email debe contener @ y .";
            this.setAttribute("class", "error");
            enviarEmail = false;
        } else {
            this.removeAttribute("class");
            enviarEmail = true;
        } //Fin Si
    } //Fin Funcion

    function validarPass() {
        borrarError();
        if (!patternPass.test(this.value)) {
            error.innerHTML = "ERROR: La contraseña debe tener entre 8 y 18 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.";
            this.setAttribute("class", "error");
            enviarPass = false;
        } else {
            this.removeAttribute("class");
            enviarPass = true;
        } //Fin Si
    } //Fin funcion

    function validarPass2() {
        borrarError();
        if (pass.value != pass2.value) {
            error.innerHTML = "ERROR: Las contraseñas deben ser iguales.";
            this.setAttribute("class", "error");
            enviarPass2 = false;
        } else {
            this.removeAttribute("class");
            enviarPass2 = true;
        } //Fin Si
    } //Fin funcion

    function validarEnviar(evento) {
        if (!enviarUsuario || !enviarEmail || !enviarPass || !enviarPass2) {
            borrarError();
            error.innerHTML = "No se puede enviar el formulario con campos invalidos/vacios.";
            evento.preventDefault();
        } else {
            var confirmacion = confirm("Crear usuario");
            if (!confirmacion) {
                evento.preventDefault();
            } //Fin Si
        } //Fin Si
    } //Fin Funcion
}