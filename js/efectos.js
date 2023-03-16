$(function() {
    //Cojo el boton eliminar por su id, y le paso el evento onclick
    $("#elimina").on("click", function(event) {
        //Oculto el modal
        $("#elimina").parent().parent().parent().parent().modal('hide');
        //Le meto la animacion para que desaparezca lentamente
        $("#elimina").parent().parent().parent().parent().parent().parent().parent().animate({
            opacity: 0
        }, 1000, function() {
            // La funcion se realiza cuando termina la animacion
            $(this).remove();
        });
    });
});