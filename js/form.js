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

//Validacion
function mostrarContrasena() {
    document.getElementById("pass").type = text;
}

window.onload = load;

function load() {
    //Entorno:
    var formulario = document.getElementById('registro');

    var user = document.getElementById("usuario");
    var email = document.getElementById("email");
    var pass = document.getElementById("pass");
    var pass2 = document.getElementById("pass2");

    var nombre = document.getElementById("nombre");
    var ape = document.getElementById("apellidos");

    var error = document.getElementById("errores");

    //Pattern:
    var patternNomApe = /(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/;

    //Con el simbolo '^', indico que debe empezar por lo siguiente que indique
    //'\d' para representar digitos.
    //Los {} para hacer referencia al numero de ocurrencias.
    //'\-' representar el guion.
    //[a-z] para representar el rango de valores del abecedario.
    //El '$' para indicar con lo que tiene que terminar la cadena.
    //Fuera del pattern utilizo 'i', para que no diferencie entre mayusculas y minusculas.
    var patternNif = /^\d{8}\-[a-z]$/i;

    // ^ Busca el principio de nuestra cadena.
    // \w+ Busca una o más palabras alfanuméricas incluyendo el guión subrayado (_). Equivalente a [a-zA-Z0-9_]
    // [\.-]  (\) Indica que el siguiente carácter es especial y no para ser interpretado. (.-) permite nuestros caracteres punto (.) y guión (-)
    // ? Permite que haya 0 o 1 vez nuestra expresión anterior (.-)
    // \w+ Busca una o más palabras alfanuméricas incluyendo el guión subrayado (_). Equivalente a [a-zA-Z0-9_]
    // *  Permite 0 o más veces la expresión anterior ([.-]?\w+)
    // @ Permite solamente el carácter arroba (@)
    // \w+([.-]?\w+)* Vuelve a repetir lo explicado ahora.
    // \.\w{2,3} Permite un punto (.) seguido de dos o tres caracteres, e.g., .org. uk, .us, .es, .com, etc. + El signo (+) especifica que la expresión anterior debe ocurrir una o más veces, mas veces para permitir cualquier URL edu.com por ejemplo
    // $ Indica el final de la cadena
    var patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // ^ Busca el principio de nuestra cadena.
    // Despues 2 digitos
    // Le doy la opcion de utilizar / o -
    // Continuo con otros 2 digitos
    // Repito dandole la opcion de / o -
    // Termino con 4 digitos
    var patternFecha = /^(\d{2})(\/|\-)\d{2}(\/|\-)\d{4}$/;

    // Le indico el rango de valores, y el numero de veces que tiene que aparecer
    var patternTelefono = /\d{9}/;

    //Empiezo el pattern con 2 digitos
    //continuo con un caracter :
    //Termino nuevamente con 2 digitos
    var patternHora = /^(\d{2})\:(\d{2})$/;

    //Asigno un interruptor a cada variable para despues realizar la validación del formulario
    var enviarNombre = false;
    var enviarApellido = false;
    var enviarEdad = false;
    var enviarNif = false;
    var enviarEmail = false;
    var enviarProvincia = false;
    var enviarFecha = false;
    var enviarTef = false;
    var enviarHora = false;

    //Eventos:
    nombre.addEventListener("focusout", ponerMayus);
    ape.addEventListener("focusout", ponerMayus);
    nombre.addEventListener("focusout", validar);
    ape.addEventListener("focusout", validar);
    edad.addEventListener("focusout", validarEdad);
    nif.addEventListener("focusout", validarNif);
    email.addEventListener("focusout", validarEmail);
    provincia.addEventListener("focusout", validarProvincia);
    fecha.addEventListener("focusout", validarFecha);
    telefono.addEventListener("focusout", validarTelefono);
    hora.addEventListener("focusout", validarHora);
    formulario.addEventListener("submit", validarEnviar);

    //Algoritmo:
    //Hago una funcion que voy a repetir en varias partes del codigo
    //La uso para borrar el error cuando voy a realizar una validacion, y que 
    //los errores salgan de uno en uno.
    function borrarError() {
        if (error.innerText.length != 0) {
            error.removeChild(error.firstChild);
        } //Fin Si
    } //Fin Función

    //Ejercicio 2
    function ponerMayus() {
        this.value = this.value.toUpperCase();
    } //Fin Funcion

    //Ejercicio 3
    function validar() {
        borrarError();
        if (this.value == null || this.value == "") {
            error.innerText = "ERROR: " + this.id.toUpperCase() + " no se puede quedar vacio.";
            this.focus();
            this.setAttribute("class", "error");
            if (this.id == "nombre") {
                enviarNombre = false;
            } else {
                enviarApellido = false;
            } //Fin Si
        } else if (!patternNomApe.test(this.value)) {
            error.innerText = "ERROR: " + this.id.toUpperCase() + " debe contener solo letras.";
            this.focus();
            this.setAttribute("class", "error");
            if (this.id == "nombre") {
                enviarNombre = false;
            } else {
                enviarApellido = false;
            } //Fin Si
        } else {
            this.removeAttribute("class");
            if (this.id == "nombre") {
                enviarNombre = true;
            } else {
                enviarApellido = true;
            } //Fin Si
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 4
    function validarEdad() {
        borrarError();
        if (this.value == "" || this.value == null) {
            error.innerHTML = "ERROR: " + this.id.toUpperCase() + " no se puede quedar vacio.";
            this.setAttribute("class", "error");
            this.focus();
            enviarEdad = false;
        } else if (isNaN(this.value)) {
            error.innerHTML = "ERROR: " + this.id.toUpperCase() + " debe ser un numero.";
            this.setAttribute("class", "error");
            this.focus();
            enviarEdad = false;
        } else if (this.value < 0 || this.value > 105) {
            error.innerHTML = "ERROR: " + this.id.toUpperCase() + " debe estar en el rango de 0-105.";
            this.setAttribute("class", "error");
            this.focus();
            enviarEdad = false;
        } else {
            this.removeAttribute("class");
            enviarEdad = true;
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 5
    function validarNif() {
        borrarError();
        if (!patternNif.test(this.value)) {
            error.innerHTML = "ERROR: " + this.id.toUpperCase() + " debe contener 8 numero seguido de un guion y letra ( 88888888-A ).";
            this.setAttribute("class", "error");
            this.focus();
            enviarNif = false;
        } else {
            this.removeAttribute("class");
            enviarNif = true;
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 6
    function validarEmail() {
        borrarError();
        if (!patternEmail.test(this.value)) {
            error.innerHTML = "ERROR: " + this.id.toUpperCase() + " debe contener @ y .";
            this.setAttribute("class", "error");
            this.focus();
            enviarEmail = false;
        } else {
            this.removeAttribute("class");
            enviarEmail = true;
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 7
    function validarProvincia() {
        borrarError();
        if (this.value == 0) {
            error.innerHTML = "ERROR: " + this.id.toUpperCase() + " debe seleccionar una opcion";
            this.setAttribute("class", "error");
            this.focus();
            enviarProvincia = false;
        } else {
            this.removeAttribute("class");
            enviarProvincia = true;
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 8
    function validarFecha() {
        borrarError();
        if (!patternFecha.test(this.value)) {
            error.innerHTML = this.id[0].toUpperCase() + this.id.slice(1) + " errónea. Introdúzcala de nuevo. (dd/mm/yyyy)";
            this.setAttribute("class", "error");
            this.focus();
            enviarFecha = false;
        } else {
            this.removeAttribute("class");
            enviarFecha = true;
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 9
    function validarTelefono() {
        borrarError();
        if (!patternTelefono.test(this.value)) {
            error.innerHTML = "ERROR: " + this.id.toUpperCase() + " debe contener 9 numeros.";
            this.setAttribute("class", "error");
            this.focus();
            enviarTef = false;
        } else {
            this.removeAttribute("class");
            enviarTef = true;
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 10
    function validarHora() {
        borrarError();
        if (!patternHora.test(this.value)) {
            error.innerHTML = this.id[0].toUpperCase() + this.id.slice(1) + " errónea. Introdúzcala de nuevo. (hh:mm)";
            this.setAttribute("class", "error");
            this.focus();
            enviarHora = false;
        } else {
            this.removeAttribute("class");
            enviarHora = true;
        } //Fin Si
    } //Fin Funcion

    //Ejercicio 11
    function validarEnviar(evento) {
        if (!enviarNombre || !enviarApellido || !enviarEdad || !enviarNif || !enviarEmail ||
            !enviarProvincia || !enviarFecha || !enviarTef || !enviarHora) {
            borrarError();
            error.innerHTML = "No se puede enviar el formulario con campos invalidos/vacios.";
            evento.preventDefault();
        } else {
            var confirmacion = confirm("Enviar formulario");
            if (!confirmacion) {
                evento.preventDefault();
            } //Fin Si
        } //Fin Si
    } //Fin Funcion
}

// Registrar.html

function mostrarClubEntrenador() {
    var listaClub = document.getElementById("clubEntrenador");
    listaClub.style.display = "block";

    var opt = document.getElementById("opcionJugador");
    opt.addEventListener('click', function() {
        listaClub.style.display = "none";
    });

    for (var i = 0; i < 3; i++) {
        document.getElementById('club' + (i + 1)).addEventListener('click', function() {
            var listaEquipo = document.getElementById("equipoEntrenador");
            listaEquipo.style.display = "block";
        });
    } //Fin Para

    //Quito la opcion de jugador si esta puesta
    opt.addEventListener('click', function() {
        listaEquipo.style.display = "none";
    });
}

function mostrarClubJugador() {
    var listaClub = document.getElementById("clubJugador");
    listaClub.style.display = "block";

    var opt = document.getElementById("opcionEntrenador");
    opt.addEventListener('click', function() {
        listaClub.style.display = "none";
    });

    var clubes = document.getElementsByTagName('club');
    clubes.addEventListener('click', function() {
        var listaEquipo = document.getElementById("equipoJugador");
        listaEquipo.style.display = "block";
    });

    //Quito la opcion de entrenador si esta puesta
    opt.addEventListener('click', function() {
        listaEquipo.style.display = "none";
    });
}