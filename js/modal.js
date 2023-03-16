var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function() {
    myInput.focus()
})

(function(el) {
    window.addEventListener("message", (event) => {
        if (event.origin.startsWith("https://www.sofascore")) {
            if (el.id === event.data.id) {
                el.style.height = event.data.height + "px";
            }
        }
    });
})
(document.getElementById("sofa-player-embed-360938"));