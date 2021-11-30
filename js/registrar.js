function mostrarClub() {

    var opcion = document.getElementById("perfilClub").value;
    console.log(opcion);
    if (opcion == "entrenador") {
        console.log("ENTRENADOR");
        var lista = document.getElementById("clubEntrenador");
        lista.style.display = "block"
        while (lista.childNodes.length > 4) {
            lista.removeChild(lista.lastChild);
        } //Fin Mientras
        for (var i = 0; i < 5; i++) {
            var sMensaje = document.createElement('p');
            sMensaje.innerHTML = "Club " + i;
            document.getElementById("clubEntrenador").appendChild(sMensaje);
        } //Fin Para
    } else {
        document.getElementById("clubJugador").style.display = "block";
        if (error.innerText.length != 0) {
            error.removeChild(error.firstChild);
        } //Fin Si
        console.log("JUGADOR");
    }

}