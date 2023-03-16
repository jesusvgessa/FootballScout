//Objetos
function Jugador(nombre, dorsal, posicion) {
    // Propiedades
    this.nombre = nombre;
    this.dorsal = dorsal;
    this.posicion = posicion;
}

var arrayJugadores = new Array();
var fichasJugador = document.querySelectorAll("#jugador");

fichasJugador.forEach(ficha => {
    var nombre = ficha.getElementsByTagName("p")[0].innerHTML;
    var dorsal = ficha.getElementsByTagName("p")[1].innerHTML;
    var posicion = ficha.getElementsByTagName("p")[2].innerHTML;
    var jugador = new Jugador(nombre, dorsal, posicion);
    arrayJugadores.push(jugador);
});

//Filtro por posicion
document.getElementById('pos').addEventListener("change", filtroPos);

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

//Filtro por nombre
document.getElementById('filtroNombre').addEventListener('keyup', buscaJugador);

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

//Evento multiple
document.getElementById('filtroNombre').addEventListener('focusout', fueraFoco);
document.getElementById('filtroNombre').addEventListener('focus', dentroFoco);

function fueraFoco() {
    var x = document.getElementById("filtroNombre");
    x.value = x.value.toUpperCase();
    x.style.background = "white";
}

function dentroFoco() {
    this.style.background = "orange";
}