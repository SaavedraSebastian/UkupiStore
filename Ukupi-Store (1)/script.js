document.addEventListener('DOMContentLoaded', function() {
  feather.replace();
});

function sumarCantidad(event) {
  let cantidadElement = event.target.closest('.producto-destacado').querySelector('.cantidadProducto');
  let cantidad = parseInt(cantidadElement.value);
  cantidad++;
  cantidadElement.value = cantidad;
}

function restarCantidad(event) {
  let cantidadElement = event.target.closest('.producto-destacado').querySelector('.cantidadProducto');
  let cantidad = parseInt(cantidadElement.value);
  if (cantidad > 1) {
    cantidad--;
    cantidadElement.value = cantidad;
  }
}

function agregarAlCarrito(event) {
  let cantidadElement = event.target.closest('.producto-destacado').querySelector('.cantidadProducto');
  const cantidad = parseInt(cantidadElement.value);
  alert(`Se agregaron ${cantidad} unidades al carrito.`);
}
let carrito = [];

function toggleCarrito() {
  const carritoElement = document.getElementById('carrito');
  carritoElement.style.display = carritoElement.style.display === 'none' ? 'block' : 'none';
}

function agregarAlCarrito(event, nombre, precio, imagen) {
  const cantidad = parseInt(event.target.closest('.producto-tarjeta').querySelector('.cantidadProducto').value);
  const producto = { nombre, precio, cantidad, imagen };
  carrito.push(producto);
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoBody = document.getElementById('carritoBody');
  carritoBody.innerHTML = '';

  let total = 0;
  carrito.forEach((producto, index) => {
      total += producto.precio * producto.cantidad;
      carritoBody.innerHTML += `
          <div class="carrito-item">
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <div class="carrito-item-details">
                  <span>${producto.nombre} (S/. ${producto.precio.toFixed(2)}) x ${producto.cantidad}</span>
              </div>
              <button onclick="eliminarDelCarrito(${index})"><i class="fa-solid fa-trash"></i></button>
          </div>
      `;
  });

  document.getElementById('carritoTotal').innerText = total.toFixed(2);
  document.getElementById('carritoCount').innerText = carrito.length;
  updateEmptyCartMessage(carrito.length);
}

document.getElementById('suscribete-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('modal-success').style.display = 'flex';
});

document.getElementById('close-success').addEventListener('click', function() {
  document.getElementById('modal-success').style.display = 'none';
  location.reload();
});

document.getElementById('btn-close-success').addEventListener('click', function() {
  document.getElementById('modal-success').style.display = 'none';
  location.reload();
});

window.onclick = function(event) {
  var modal = document.getElementById('modal-success');
  if (event.target == modal) {
    modal.style.display = 'none';
    location.reload();
  }
}
function changeMainImage(image) {
  document.getElementById('main-product-image').src = image;
}
$(document).ready(function(){
    $('#registerModal').modal();
});
function buscarProductos() {
    let input = document.getElementById('buscador').value.toLowerCase();
    let productos = document.getElementsByClassName('producto-destacado');

    console.log("Buscar: " + input);
    console.log("Total de productos: " + productos.length);

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let descripcion = producto.querySelector('.descripcion-ukupi')?.innerText.toLowerCase() || "";
        let categoria = producto.getAttribute('data-categoria')?.toLowerCase() || "";
        let marca = producto.getAttribute('data-marca')?.toLowerCase() || "";
        let material = producto.getAttribute('data-material')?.toLowerCase() || "";
        let color = producto.getAttribute('data-color')?.toLowerCase() || "";

        console.log("Producto " + i + ":");
        console.log("Descripción: " + descripcion);
        console.log("Categoría: " + categoria);
        console.log("Marca: " + marca);
        console.log("Material: " + material);
        console.log("Color: " + color);

        if (descripcion.includes(input) || categoria.includes(input) || marca.includes(input) || material.includes(input) || color.includes(input)) {
            producto.style.display = '';
            console.log("Mostrar producto " + i);
        } else {
            producto.style.display = 'none';
            console.log("Ocultar producto " + i);
        }
    }
}

