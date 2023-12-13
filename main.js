const Prenda = function(id,nombre,precio,marca,cant){
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.marca = marca
    this.cant = cant
}



let prenda1 =  new Prenda(1, "zapatillas negras", 55000, "nike", 2);
let prenda2 =  new Prenda(2, "pantalon cargo", 25000, "Levis", 10);
let prenda3 =  new Prenda(3, "buzo violeta", 12000, "vatra", 5);
let prenda4 =  new Prenda(4, "buzo negro", 12000, "vatra", 7);
let prenda5 =  new Prenda(5, "remera vatra violeta", 5000, "nike", 10);

let ropa = [prenda1, prenda2, prenda3, prenda4, prenda5];

if(localStorage.getItem("prendas")){
    ropa = JSON.parse(localStorage.getItem("prendas"))
}
else{
    ropa = ropa
}

function filtrarPrendas(){
    const body = document.querySelector("body")
    const input = document.getElementById("filtpre").value
    const palabra = input.trim().toUpperCase()
    const busqueda = ropa.filter(  (prenda)=> prenda.nombre.toUpperCase().includes(palabra))

    if(busqueda.length > 0){

        const container = document.createElement("div")
    
        busqueda.forEach( (prenda)=>{
            const card = document.createElement("div")

        const id = document.createElement("h2")
        id.textContent = `ID: ${prenda.id}`
        card.appendChild(id)

        const nombre = document.createElement("p")
        nombre.textContent = `Prenda: ${prenda.nombre}`
        card.appendChild(nombre)

        const marca = document.createElement("p")
        marca.textContent = `Marca: ${prenda.marca}`
        card.appendChild(marca)

        const cant = document.createElement("p")
        cant.textContent = `Stock: ${prenda.cant}`
        const inputNuevoCant = document.createElement("input")
        inputNuevoCant.placeholder = "Cantidad";
        const btnNuevoCant = document.createElement("button")
        btnNuevoCant.textContent = "Añadir Stock";
        btnNuevoCant.addEventListener("click", (e) => {
            const nuevoCant = parseInt(inputNuevoCant.value)
            const prendaele = ropa.find( (produc) => produc.id === prenda.id);

            if (prendaele) {
                if (isNaN(nuevoCant)) {
                    alert("Ingrese producto");
                    return;
                } 
                else {
                    if (nuevoCant <= 0) {
                        alert("No robe o añada producto");
                    } 
                    else {
                        prendaele.cant += nuevoCant;
                        alert(`Se añadieron ${nuevoCant} ahora hay ${prendaele.cant}`)
                        localStorage.setItem("prendas", JSON.stringify(ropa));

                    }
                }
            } else {
                console.log(`No existe prenda con ID ${prenda.id}`);
            }

        });


        card.appendChild(cant)
        card.appendChild(inputNuevoCant)
        card.appendChild(btnNuevoCant)

        const precio = document.createElement("p")
        precio.textContent = `Precio: $${prenda.precio}`
        const inputNuevoPrecio = document.createElement("input");
        inputNuevoPrecio.placeholder = "Nuevo Precio";
        const btnNuevoPrecio = document.createElement("button");
        btnNuevoPrecio.textContent = "Cambiar Precio";
        btnNuevoPrecio.addEventListener("click",  () => {

            const nuevoPrecio = parseFloat(inputNuevoPrecio.value);

            if (isNaN(nuevoPrecio)) {
                alert("Usted no ingreso un precio");
            } else {
                prenda.precio = nuevoPrecio;
                localStorage.setItem("prendas", JSON.stringify(ropa));
                alert(`El precio de ${prenda.nombre} fue modificado a $${nuevoPrecio} con exito`);
            }
        });

        
        card.appendChild(precio)
        card.appendChild(inputNuevoPrecio)
        card.appendChild(btnNuevoPrecio)


        container.appendChild(card)

        })

        body.appendChild(container)
    
    
    
    }
    else{
        alert("no hay resultados para '"+palabra+"'")
    }


}


const botonbuscar = document.getElementById("buscar")
botonbuscar.addEventListener("click", ()=>{filtrarPrendas()})



