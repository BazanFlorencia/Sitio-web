const URL = "https://62c42c7eabea8c085a6e4c44.mockapi.io/api/v1/ventas"
let form = document.querySelector("#registro");
form.addEventListener("submit",agregar);
const formEdit = document.querySelector("#form-edit");
let tabla=document.querySelector("#tablaDinamica");
let cuerpoTabla=document.querySelector("#cuerpo-tabla");
let ventas = [];
let productos = [{
    "producto":"Bateria completa con platillos",
    "cod":"percusion_1"
},
{
    "producto":"Bombo murga metálico",
    "cod":"percusion_2"
},
{
    "producto":"Saxo alto ocean oas190",
    "cod":"viento_1"   
},
{
    "producto":"Flauta dulce Yamaha Yrs Soprano",
    "cod":"viento_2"   
},
{
    "producto":"Teclado Órgano 61 teclas 5 ocvtavas + micrófono + fuente",
    "cod":"teclado_1"   
},
{
    "producto":"Teclado musical Casio Casiotone CT-S100 61 teclas negro",
    "cod":"teclado_2"   
},
{
    "producto":"Guitarra clásica criolla gracia modelo M3 de estudio",
    "cod":"cuerda_1"   
},
{
    "producto":"Guitarra eléctrica SX vintage series FST-57",
    "cod":"cuerda_2"   
}]

let entregas = [{
    "nombre":"En domicilio",
    "codigo":"domicilio"
},
{
    "nombre":"Correo argentino",
    "codigo":"correo"
},
{
    "nombre":"Retirar en sucursal",
    "codigo":"sucursal"
}]

document.addEventListener("DOMContentLoaded", inicializar);
mostrar();
async function inicializar(){
    await prepare_select_productos();
    await prepare_select_entrega();
    
    formEdit.addEventListener("submit", async function(event){
        event.preventDefault();
        const formData = new FormData(this)
        let url = URL + "/" + formData.get("id")
        let venta= {
            name: formData.get("name"),
            direction: formData.get("direction"),
            email: formData.get("email"),
            delivery: formData.get("delivery"),
            product: formData.get("product")
        }
        inputsEdit.disabled = true
        let response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(venta)
        })
        console.log(response.ok)
        this.reset()
        inputsEdit.disabled = false
        formEdit.classList.add("ocultar")
        mostrar();
    })
    
}
function asignarListenerModificar(){
    let buttons = document.querySelectorAll(".btn-edit")
    for(let button of buttons){
        button.addEventListener("click", modificar);
    }
}
async function modificar(){
    const idEdit = this.dataset.id
    formEdit.classList.remove("ocultar")
    console.log(idEdit)
    inputEditId.value = idEdit;
    let response=await fetch(URL)
    let ventas=await response.json();
    for (let ventaSeleccionada of ventas){
        ventaSeleccionada =  ventas.find ((elem) => elem.id == idEdit)
        inputEditName.value = ventaSeleccionada.name;
        inputEditDirection.value = ventaSeleccionada.direction;
        inputEditEmail.value = ventaSeleccionada.email;
        editEntrega.value = ventaSeleccionada.delivery;
        editProductos.value = ventaSeleccionada.product;
    }
}

function prepare_select_productos(){
    let select1 = document.querySelector("#producto");
    for(let prod of productos){
        select1.innerHTML += `<option value="${prod.producto}">${prod.producto}</option>`
    }
}

function prepare_select_entrega(){
    let select2 = document.querySelector("#entrega");
    for(let entrega of entregas){
        select2.innerHTML += `<option value="${entrega.nombre}">${entrega.nombre}</option>`
    }
}
async function agregar(e){
    e.preventDefault();
   
    let data = new FormData(form);
    let venta = {
        name: data.get("name"),
        direction: data.get("direction"),
        email: data.get("email"),
        delivery: data.get("delivery"),
        product: data.get("product"),
    };
    
    let response = await fetch(URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(venta)
    })
    let nuevaVenta=await response.json();
    mostrarLinea(nuevaVenta);
    vaciarinputs();
}
function vaciarinputs(){
    document.querySelector("#nombreyapellido").value="";
    document.querySelector("#direccion").value="";
    document.querySelector("#mail").value="";
    document.querySelector("#entrega").value="Selecciona una opcion";
    document.querySelector("#producto").value="Selecciona una opcion";
}
async function mostrar(){
   
    cuerpoTabla.innerHTML="loading";
    try{
        let response = await fetch(URL);
        let ventas = await response.json();
        cuerpoTabla.innerHTML="";
        for(let venta of ventas){
            mostrarLinea(venta);
        }
        asignarListenerEliminar();
        asignarListenerModificar();
    }
    catch(e){
        console.log("No se pudo cargar");
    }
}
function mostrarLinea(venta){
    cuerpoTabla.innerHTML += `<tr>
        <td>${venta.name}</td>
        <td>${venta.direction}</td>
        <td>${venta.email}</td>
        <td>${venta.delivery}</td>
        <td>${venta.product}</td>
        <td class="botonEditar"><button class="btn-edit" data-id="${venta.id}">Editar</i></button></td>
        <td class="botonEliminar"><button class="btn-delete" data-id="${venta.id}">X</button></td>
    </tr>` 
}

function asignarListenerEliminar(){
    let botones=document.querySelectorAll(".btn-delete");
    for(let boton of botones){
        boton.addEventListener("click", function(){
            eliminar(boton);
        })
    }
}
async function eliminar(boton){
    let id=boton.getAttribute("data-id");
    let response=await fetch(URL+"/"+id,{
        "method":"DELETE"
    });
    let json= await response.json();
    mostrar();
   
}



    
    


