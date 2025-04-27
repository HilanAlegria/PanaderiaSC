console.log("¡Hola desde tu panadería en Cali!");

// Elementos clave
const botonesCarrito = document.querySelectorAll('.agregar-carrito');
const listaPedidos = document.getElementById('lista-pedidos');
const totalPedido = document.getElementById('total-pedido');

// Cargar carrito desde localStorage si existe
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

botonesCarrito.forEach(boton => {
    boton.addEventListener('click', function () {
        const menuItem = this.closest('.menu-item');
        const nombreProducto = menuItem.querySelector('h3').textContent;
        const precioTexto = menuItem.querySelector('.precio').textContent;
        const precio = parseFloat(precioTexto.replace('$', '').replace('.', ''));

        carrito.push({ nombre: nombreProducto, precio: precio });
        guardarCarrito();
        renderizarPedidos();
    });
});

function renderizarPedidos() {
    listaPedidos.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btn-eliminar');
        botonEliminar.addEventListener('click', () => {
            carrito.splice(index, 1);
            guardarCarrito();
            renderizarPedidos();
        });

        li.appendChild(botonEliminar);
        listaPedidos.appendChild(li);
    });

    actualizarTotal();
}

function actualizarTotal() {
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);
    totalPedido.innerHTML = `<strong>Total:</strong> $${total.toLocaleString()}`;
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Render inicial
renderizarPedidos();

const btnFinalizar = document.getElementById('btn-finalizar');

btnFinalizar.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 😅");
        return;
    }

    window.location.href = "checkout.html";
});

btnFinalizar.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 😅");
        return;
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Redirigir a la página de pedidos
    window.location.href = "pedidos.html";
});
