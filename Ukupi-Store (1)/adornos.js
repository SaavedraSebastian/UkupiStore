document.addEventListener('DOMContentLoaded', function() {
  feather.replace();

  updateEmptyCartMessage(carrito.length);
});
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

function verProducto() {
  alert('Mostrando detalles del producto');
}

function restarCantidad(event) {
  let cantidadInput = event.target.nextElementSibling;
  let cantidad = parseInt(cantidadInput.value);
  if (cantidad > 1) {
      cantidadInput.value = cantidad - 1;
  }
}

function sumarCantidad(event) {
  let cantidadInput = event.target.previousElementSibling;
  let cantidad = parseInt(cantidadInput.value);
  cantidadInput.value = cantidad + 1;
}

function updateEmptyCartMessage(count) {
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  if (count == 0) {
      emptyCartMessage.style.display = 'block';
  } else {
      emptyCartMessage.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', () => {
    const filters = {
        categoria: [],
        marca: [],
        precio: [0, 1000],
        material: [],
        color: []
    };

    const filterSection = document.querySelector('.filter-section');
    filterSection.addEventListener('change', (event) => {
        const { id, value, checked, type } = event.target;
        const [key, subKey] = id.split(/(?=[A-Z])/);

        if (type === 'checkbox') {
            if (checked) {
                filters[key].push(value);
            } else {
                filters[key] = filters[key].filter(item => item !== value);
            }
        } else if (type === 'range') {
            filters[key] = [0, parseInt(value)];
        }

        filterProducts();
    });

    function filterProducts() {
        const products = document.querySelectorAll('.producto-destacado');
        products.forEach(product => {
            const productCategory = product.dataset.categoria;
            const productBrand = product.dataset.marca;
            const productPrice = parseFloat(product.dataset.precio);
            const productMaterial = product.dataset.material;
            const productColor = product.dataset.color;

            const isCategoryMatch = filters.categoria.length ? filters.categoria.includes(productCategory) : true;
            const isBrandMatch = filters.marca.length ? filters.marca.includes(productBrand) : true;
            const isPriceMatch = productPrice >= filters.precio[0] && productPrice <= filters.precio[1];
            const isMaterialMatch = filters.material.length ? filters.material.includes(productMaterial) : true;
            const isColorMatch = filters.color.length ? filters.color.includes(productColor) : true;

            if (isCategoryMatch && isBrandMatch && isPriceMatch && isMaterialMatch && isColorMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});
document.getElementById('gridViewBtn').addEventListener('click', function() {
    var container = document.getElementById('productlist');
    container.classList.remove('list-view');
    container.classList.add('grid-view');
});

document.getElementById('listViewBtn').addEventListener('click', function() {
    var container = document.getElementById('productlist');
    container.classList.remove('grid-view');
    container.classList.add('list-view');
});
document.addEventListener('DOMContentLoaded', function() {
    const priceInput = document.getElementById('priceInput');
    const filterButton = document.getElementById('filterButton');
    const productList = document.getElementById('productlist');
    const products = document.querySelectorAll('.product');

    filterButton.addEventListener('click', function() {
        const price = parseFloat(priceInput.value);
        if (isNaN(price)) {
            alert("Por favor, ingrese un valor de precio válido.");
            return;
        }

        products.forEach(function(product) {
            const productPrice = parseFloat(product.getAttribute('data-price'));
            if (productPrice === price) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});
document.getElementById('precio').addEventListener('input', function() {
    var minPrice = 0;
    var maxPrice = this.value;
    document.getElementById('minPrice').innerText = minPrice;
    document.getElementById('maxPrice').innerText = maxPrice;
});
document.getElementById('filtroOrden').addEventListener('change', function() {
    const orderBy = this.value;
    let productos = Array.from(document.querySelectorAll('.producto-destacado'));

    if (orderBy === 'precioAsc') {
        productos.sort((a, b) => parseFloat(a.getAttribute('data-precio')) - parseFloat(b.getAttribute('data-precio')));
    } else if (orderBy === 'precioDesc') {
        productos.sort((a, b) => parseFloat(b.getAttribute('data-precio')) - parseFloat(a.getAttribute('data-precio')));
    } else if (orderBy === 'mejorPuntuacion') {
        productos.sort((a, b) => parseFloat(b.getAttribute('data-puntuacion')) - parseFloat(a.getAttribute('data-puntuacion')));
    } else if (orderBy === 'recomendados') {
        productos.sort((a, b) => b.getAttribute('data-recomendado') === 'true' ? -1 : 1);
    }

    const container = document.getElementById('productlist');
    container.innerHTML = '';
    productos.forEach(producto => container.appendChild(producto));
});
function buscarProductos() {
    let input = document.getElementById('buscador').value.toLowerCase();
    let productos = document.getElementsByClassName('producto-destacado');
    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];

        let descripcion = producto.querySelector('.descripcion-ukupi')?.innerText.toLowerCase() || "";
        let categoria = producto.getAttribute('data-categoria')?.toLowerCase() || "";
        let marca = producto.getAttribute('data-marca')?.toLowerCase() || "";
        let material = producto.getAttribute('data-material')?.toLowerCase() || "";
        let color = producto.getAttribute('data-color')?.toLowerCase() || "";

        if (descripcion.includes(input) || categoria.includes(input) || marca.includes(input) || material.includes(input) || color.includes(input)) {
            producto.style.display = '';
        } else {
            producto.style.display = 'none';
        }
    }
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});