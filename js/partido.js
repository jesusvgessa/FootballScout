//Cojo todos los select y sus valores
document.querySelectorAll('select').forEach( e =>{
    e.addEventListener("change", (element) => {
        let opciones = document.querySelectorAll("select");
        opciones.forEach((cosa,index)=>{
            if(index != element.target.name.substring(element.target.name.length-1,element.target.name.length)){
                cosa.childNodes.forEach((nodo) => {
                    if(nodo.value == element.target.value){
                        cosa.removeChild(nodo)
                    }else if(nodo.value == " "){
                        //nada
                    }
                })
            }
        })
    })})