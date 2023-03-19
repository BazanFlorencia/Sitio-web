"use strict";
//Validacion
let valor1, valor2, valor3, valor4;
valor1 = Math.floor(Math.random()*10);
valor2 = Math.floor(Math.random()*10);
valor3 = Math.floor(Math.random()*10);
valor4 = Math.floor(Math.random()*10);
console.log("La combinación aleatoria del captcha es: " + valor1, valor2, valor3, valor4);
let valor = document.querySelector("#numero");
let aleatorio = document.querySelector("#aleatorio");
aleatorio.innerHTML = valor1 +""+ valor2 +""+ valor3 +""+ valor4;
let botonEnviar= document.querySelector("#btn-submit");
botonEnviar.addEventListener("click", validacion);


function validacion() {
  
  if(aleatorio.innerHTML == valor.value){
    let resultado = document.querySelector("#resultado");
    resultado.innerHTML = "SU CONSULTA HA SIDO ENVIADA CON ÉXITO";
  } 
  else{
    let resultado = document.querySelector("#resultado");
    resultado.innerHTML = "Volver a intentarlo";
  }
  
}
