function elegirClub() {
    var error = document.getElementById("errores");
    var clubes = document.getElementsByName("club");
    var club = "";
    for (var i = 0; i < clubes.length; i++) {
        if (clubes[i].checked) {
            club = clubes[i].value;
        } //Fin Si
    } //Fin Para
    if (club != "") {
        document.getElementById("equipo").style.display = "block";
    } else {
        alert("ERROR: debe seleccionar club.");
    } //Fin Si
    console.log(club);
}

window.onload = load;

function load() {
    //Entorno:
    var registrar = document.getElementById("registro");

    //Inputs
    var nombre = document.getElementById("nombre");
    var apes = document.getElementById("apellidos");
    var tef = document.getElementById("tef");
    var dni = document.getElementById("dni");
    var error = document.getElementById("errores");

    //Pattern:
    var patternNombre = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;
    var patternApes = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;
    var patternNif = /^\d{8}[a-z]$/i;

    //Asigno un interruptor a cada variable para despues realizar la validación del formulario
    var enviarNombre = false;
    var enviarApes = false;
    var enviarTef = false;
    var enviarDni = false;

    //Eventos:
    nombre.addEventListener("blur", validar);
    apes.addEventListener("blur", validarApes);
    tef.addEventListener("blur", validarTef);
    dni.addEventListener("blur", validarDni);
    registrar.addEventListener("submit", validarEnviar);

    function borrarError() {
        if (error.innerText.length != 0) {
            error.removeChild(error.firstChild);
        } //Fin Si
    } //Fin Función

    function validar() {
        borrarError();
        if (!patternNombre.test(nombre)) {
            error.innerHTML = "ERROR: El usuario debe contener entre 3 y 16 letras*.";
            nombre.setAttribute("class", "error");
            enviarNombre = false;
        } else {
            nombre.removeAttribute("class");
            enviarNombre = true;
        } //Fin Si
    } //Fin Funcion

    function validarApes() {
        borrarError();
        if (!patternApes.test(apes)) {
            error.innerHTML = "ERROR: El usuario debe contener entre 3 y 16 letras*.";
            apes.setAttribute("class", "error");
            enviarApes = false;
        } else {
            apes.removeAttribute("class");
            enviarApes = true;
        } //Fin Si
    } //Fin Funcion

    function validarTef() {
        borrarError();
        if (tef.length != 9) {
            error.innerHTML = "ERROR: El tef debe tener 9 digitos.";
            tef.setAttribute("class", "error");
            enviarTef = false;
        } else {
            tef.removeAttribute("class");
            enviarTef = true;
        } //Fin Si
    } //Fin Funcion

    function validarDni() {
        borrarError();
        if (!patternDni.test(dni)) {
            error.innerHTML = "ERROR: El DNI debe contener 8 numero seguido de una letra.";
            dni.setAttribute("class", "error");
            enviarDni = false;
        } else {
            dni.removeAttribute("class");
            enviarDni = true;
        } //Fin Si
    } //Fin Funcion

    function validarEnviar(evento) {
        if (!enviarNombre || !enviarApes || !enviarTef || !enviarDni) {
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