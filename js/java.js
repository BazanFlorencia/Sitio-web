"use strict";

let valor = document.getElementById("numero").value;
let text = document.getElementById("respuesta").innerHTML;
let btn = document.getElementById("btn-validar");

btn.addEventListener("click", validacion());



function validacion(valor) {
    
    if (isNaN(valor) || (valor !== 4))  {
      
      text.innerHTML = "Volver a intentarlo";
      
    
    } else {
      
      text.innerHTML = "Correcto";
      
    }
    document.getElementById("respuesta").innerHTML = text;
    
}

