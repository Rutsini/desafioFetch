


 //Empieza pidiendo el nombre y la edad para poder determinar si la persona puede comprar o no 

let boton1 = document.getElementById("ingresar");
boton1.addEventListener("click", ingresarClick);
function ingresarClick(){
  persona()
};


function persona(){
     
    nombre = document.getElementById("nombreDom").value;
    
    direccion = document.getElementById("direccionDom").value; 

    let edad = document.getElementById("edadDom").value; 
      
    edad >= 18 ? ingresa() : noIngresa();
    };



    function ingresa(){
        const boton2 = document.getElementById("aceptar");
        boton2.addEventListener("click", () => (
            Swal.fire({
                icon: 'Bienvenido',
                title: 'Puede ingresar',
                text: 'Disfrute',
                
              }
    
            ))
        )

    }



    function noIngresa(){
        const boton2 = document.getElementById("aceptar");
        boton2.addEventListener("click", () => (
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No cumple el requisito de edad',
                
              }
    
            ))
        )
        
    }


const carritoClave = "Carrito"

let listaDePrecios = [];



const lista = document.querySelector(`#listado`);

fetch(`./data.json`)
.then(res => res.json())
.then(data => {
  listaDePrecios = data
  console.log(data)
  dibujarCarrito();
  dibujarCarritoSacar();
  dibujarProductos();
})

// Estan el array y constructor donde se encuentran los productos del carrito
const carrito = JSON.parse(localStorage.getItem(carritoClave)) || [];


/* En la function (dibujarProductos) se dibuja a cada uno de los 
productos de la listaDePrecios en el DOM y se le agregan buttons */

function dibujarProductos() {
  listaDePrecios.forEach(producto => {
    
    let listaDeProductos = document.createElement("div");
    listaDeProductos.className = "producto"
    listaDeProductos.innerHTML = producto.producto + " a " + producto.precio ;
    
    let botonAgregar = document.createElement("button");
      botonAgregar.innerHTML = " + " 
      botonAgregar.addEventListener("click", function() {
      agregarCarrito(producto)
      dibujarCarrito()
    })
    listaDeProductos.append(botonAgregar);
    
    let botonQuitar = document.createElement("button");
      botonQuitar.innerHTML = " - " 
      botonQuitar.addEventListener("click", function() {
      quitarCarrito(producto);
      dibujarCarritoSacar();
      
    })
    listaDeProductos.append(botonQuitar);
    
    document.body.append(listaDeProductos);
  })
}

/* en la funcion precioCarrito lo que se realiza es buscar
 el producto y sumaar su precio al precio final  */

function precioCarrito(){
  let precioTotal = 0
  for(idProducto of carrito){

  console.log( "lsita de precios", listaDePrecios);
    
    let producto = listaDePrecios.find(producto => producto.id === idProducto);
    if(producto) {
      precioTotal += producto.precio
    }
    
  }
  
  let mostrarCarrito = document.getElementById("precioCarrito");
    mostrarCarrito.innerText = "PRECIO A PAGAR:" + precioTotal
    document.body.append(mostrarCarrito);
}

/* en la funcion quitarCarrito lo que se realiza es que se busca el
 producto seleccionado y lo quita del carrito */

function quitarCarrito(producto){

  let indiceProducto = carrito.indexOf(producto.id);

  carrito.splice(indiceProducto, 1);

console.log(carrito);

  localStorage.setItem(carritoClave, JSON.stringify(carrito));


  
}

/* en la funcion agregarCarrito lo que se hace es agregar el prodcuto seleccionado al carrito */

function agregarCarrito(producto){
  carrito.push(producto.id);
  localStorage.setItem(carritoClave, JSON.stringify(carrito));
}

/* en la funcion dibujarCarrito y en dibujarCarritoSacar lo que se hace es buscar los productos guardados en el carrito y escribirlos en el DOM */

function dibujarCarrito(){
  
  precioCarrito();
  
    let contenidoCarrito = document.getElementById("contenidoCarrito");
    
      contenidoCarrito.innerHTML = "";

for(idProducto of carrito){
    
    let producto = listaDePrecios.find(producto => producto.id === idProducto);

    if(producto){
      let productito = document.createElement("h5");
      productito.innerHTML = producto.producto + " a " + producto.precio
      contenidoCarrito.append(productito);
    }
    
  
}

}

function dibujarCarritoSacar(){
  
  precioCarrito();
  
    let contenidoCarrito = document.getElementById("contenidoCarrito");
    
      contenidoCarrito.innerHTML = "";

for(idProducto of carrito){
    
  let producto = listaDePrecios.find(producto => producto.id === idProducto);
  if(producto){
    let productito = document.createElement("h5");
    productito.innerHTML = producto.producto + " a " + producto.precio
    contenidoCarrito.append(productito);
  }
 
}
}



