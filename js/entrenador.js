//Funcion para desplegable usuario
function opcionesUser() {
    var menuEmergente = document.getElementById("opcionesUsuario");
    if (menuEmergente.style.display == "block") {
        menuEmergente.style.display = "none";
    } else {
        menuEmergente.style.display = "block";
    } //Fin Si
}

//Funcion para plantilla
//Evento multiple
function fueraFoco() {
    var x = document.getElementById("filtroNombre");
    x.value = x.value.toUpperCase();
    x.style.background = "white";
}

function dentroFoco(x) {
    x.style.background = "orange";
}

//Objetos
function Jugador(nombre, dorsal, posicion) {
    // Propiedades
    this.nombre = nombre;
    this.dorsal = dorsal;
    this.posicion = posicion;
}

var arrayJugadores = new Array();
var fichasJugador = document.querySelectorAll(".jugador");

for (var i = 0; i < fichasJugador.length; i++) {
    var nombre = fichasJugador[i].getElementsByTagName("p")[0].innerHTML;
    var dorsal = fichasJugador[i].getElementsByTagName("p")[1].innerHTML;
    var posicion = fichasJugador[i].getElementsByTagName("p")[2].innerHTML;
    var jugador = new Jugador(nombre, dorsal, posicion);
    arrayJugadores.push(jugador);
} //Fin Para

function buscaJugador() {
    var nombre = document.getElementById("filtroNombre").value;
    for (var i = 0; i < arrayJugadores.length; i++) {
        if (!arrayJugadores[i].nombre.toLowerCase().includes(nombre.toLowerCase())) {
            fichasJugador[i].style.display = "none";
        } else {
            fichasJugador[i].style.display = "block";
        } //Fin Si
    } //Fin Para
}

function filtroPos() {
    var pos = document.getElementById("pos").value;
    if (pos != 0) {
        for (var i = 0; i < arrayJugadores.length; i++) {
            if (arrayJugadores[i].posicion.toLowerCase() == (pos.toLowerCase())) {
                fichasJugador[i].style.display = "block";
            } else {
                fichasJugador[i].style.display = "none";
            } //Fin Si
        } //Fin Para
    } else {
        for (var i = 0; i < arrayJugadores.length; i++) {
            fichasJugador[i].style.display = "block";
        } //Fin Para
    }
}

function filtroSelect() {
    var filtro = document.getElementById("tema").value;
    //Ordenar por select value
}

//Anadir jugador
var boton = document.getElementById("boton");
if (arrayJugadores.length > 24) {
    boton.style.display = "none";
    console.log(arrayJugadores.length);
} else {
    boton.style.display = "block";
    console.log(arrayJugadores.length);
}