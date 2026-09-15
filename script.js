let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardar() {
localStorage.setItem("productos", JSON.stringify(productos));
}

function agregarProducto() {
let nombre = document.getElementById("nombre").value;
let precio = document.getElementById("precio").value;
let descripcion = document.getElementById("descripcion").value;
let imagen = document.getElementById("imagen").value;
let categoria = document.getElementById("categoria").value;

if (nombre === "" || precio === "") {
alert("Completa los datos");
return;
}

let producto = {
nombre,
precio,
descripcion,
imagen,
categoria,
fecha: new Date().toLocaleDateString()
};

productos.push(producto);
guardar();
mostrar(productos);
}

function mostrar(listaProductos) {
let lista = document.getElementById("lista");
lista.innerHTML = "";

listaProductos.forEach((p, index) => {
let div = document.createElement("div");
div.className = "producto";

div.innerHTML = `
  <strong>${p.nombre}</strong><br>
  Precio: $${p.precio}<br>
  ${p.descripcion}<br>
  Categoría: ${p.categoria}<br>
  Fecha: ${p.fecha}<br>
  ${p.imagen ? `<img src="${p.imagen}">` : ""}
  <button onclick="eliminar(${index})">Eliminar</button>
`;

lista.appendChild(div);

});
}

function eliminar(index) {
productos.splice(index, 1);
guardar();
mostrar(productos);
}

function filtrar(categoria) {
if (categoria === "Todos") {
mostrar(productos);
} else {
let filtrados = productos.filter(p => p.categoria === categoria);
mostrar(filtrados);
}
}

// Cargar al inicio
mostrar(productos);