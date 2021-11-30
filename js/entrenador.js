//Funcion para desplegable usuario
function opcionesUser() {
    document.getElementById("opcionesUsuario").style.display = "block";
}

//Funcion para plantilla
//Si tiene 25 jugadores, no se pueden añadir mas
window.onload = load;

function load() {
    var listaJugadores = document.getElementById('jugadores').querySelectorAll('li');
    console.log(listaJugadores.length);
    if (listaJugadores.length > 26) {
        document.getElementById("boton").style.display = "none";
    } //Fin Si
}