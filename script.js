console.log("¡Hola desde tu panadería en Cali!");

// Elementos clave del DOM
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const phoneInput = document.getElementById('phone');
const paymentMethodSelect = document.getElementById('payment-method');
const modalBodySummary = document.getElementById('modal-body-summary');

// Cargar carrito desde localStorage. Usamos 'cart' como clave universal.
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para renderizar el carrito en el modal
function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío.</td></tr>';
    } else {
        cart.forEach(item => {
            const row = document.createElement('tr');
            const itemTotalPrice = item.price * item.quantity;
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toLocaleString('es-CO')}</td>
                <td>
                    <input type="number" class="form-control form-control-sm" value="${item.quantity}" min="1" 
                        onchange="updateCartQuantity('${item.id}', this.value)">
                </td>
                <td>$${itemTotalPrice.toLocaleString('es-CO')}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')">Eliminar</button>
                </td>
            `;
            cartList.appendChild(row);
            total += itemTotalPrice;
            count += item.quantity;
        });
    }
    cartTotal.textContent = total.toLocaleString('es-CO');
    cartCount.textContent = count;
}

// Funciones de manipulación del carrito (hechas globales para onclick en HTML)
window.addProductToCart = function(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    saveCart();
    renderCart();
};

window.updateCartQuantity = function(productId, quantity) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
};

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
};

window.clearCart = function() {
    cart = [];
    saveCart();
    renderCart();
};

window.showConfirmationModal = function() {
    const email = emailInput.value;
    const name = nameInput.value;
    const location = locationInput.value;
    const phone = phoneInput.value;
    const paymentMethod = paymentMethodSelect.value;

    if (!email || !name || !phone || !location) {
        alert('Por favor, completa todos los campos de información personal y de envío.');
        return;
    }

    if (cart.length === 0) {
        alert('Tu carrito está vacío. No puedes realizar una compra.');
        return;
    }

    let summaryHtml = '<h5>Resumen de tu Pedido:</h5><ul>';
    cart.forEach(item => {
        summaryHtml += `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}</li>`;
    });
    summaryHtml += `</ul><p><strong>Total a Pagar: $${cartTotal.textContent}</strong></p>`;
    summaryHtml += `<h6>Tus Datos:</h6>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Correo:</strong> ${email}</p>
                    <p><strong>Ubicación para envío:</strong> ${location}</p>
                    <p><strong>Teléfono:</strong> ${phone}</p>
                    <p><strong>Método de Pago:</strong> ${paymentMethod}</p>`;
    modalBodySummary.innerHTML = summaryHtml;

    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
};

window.checkout = function() {
    const email = emailInput.value;
    const name = nameInput.value;
    const location = locationInput.value;
    const phone = phoneInput.value;
    const paymentMethod = paymentMethodSelect.value;
    const total = cartTotal.textContent;

    // 1. Generar el PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10; // Posición inicial Y

    // Título del Recibo
    doc.setFontSize(20);
    doc.text('Recibo de Compra Panadería Sabor Caleño', 105, y, null, null, 'center');
    y += 10;

    // Información del Cliente
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 10, y);
    y += 7;
    doc.text(`Nombre: ${name}`, 10, y);
    y += 7;
    doc.text(`Correo: ${email}`, 10, y);
    y += 7;
    doc.text(`Teléfono: ${phone}`, 10, y);
    y += 7;
    doc.text(`Ubicación para envío: ${location}`, 10, y);
    y += 10;

    // Detalles del Pedido
    doc.setFontSize(14);
    doc.text('Detalles del Pedido:', 10, y);
    y += 7;

    // Encabezados de la tabla
    doc.setFontSize(12);
    doc.text('Producto', 10, y);
    doc.text('Cantidad', 80, y);
    doc.text('Precio Unit.', 120, y);
    doc.text('Total', 170, y);
    y += 5;
    doc.line(10, y, 200, y); // Línea divisoria
    y += 5;

    cart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        doc.text(item.name, 10, y);
        doc.text(item.quantity.toString(), 80, y);
        doc.text(`$${item.price.toLocaleString('es-CO')}`, 120, y);
        doc.text(`$${itemTotalPrice.toLocaleString('es-CO')}`, 170, y);
        y += 7;
    });

    y += 5;
    doc.line(10, y, 200, y); // Línea divisoria
    y += 5;

    // Resumen
    doc.setFontSize(14);
    doc.text(`Método de Pago: ${paymentMethod}`, 10, y);
    y += 10;
    doc.text(`Total a Pagar: $${total}`, 10, y);
    y += 15;

    doc.setFontSize(10);
    doc.text('¡Gracias por tu compra en Panadería Sabor Caleño!', 105, y, null, null, 'center');
    y += 5;
    doc.text('Pronto nos pondremos en contacto contigo para coordinar la entrega.', 105, y, null, null, 'center');

    // Guardar el PDF
    doc.save(`Recibo_SaborCaleño_${name.replace(/\s/g, '_')}_${new Date().getTime()}.pdf`);

    // 2. Mostrar la alerta y limpiar el carrito
    alert('¡Compra realizada con éxito! Nos pondremos en contacto contigo para coordinar la entrega.');
    clearCart();

    // 3. Cerrar los modales
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) {
        cartModal.hide();
    }
    const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    if (confirmationModal) {
        confirmationModal.hide();
    }
};

// --- Lógica de carga de menú y asignación de eventos ---
document.addEventListener('DOMContentLoaded', function() {
    const cargarMenuBtnNav = document.getElementById('cargar-menu');
    const cargarMenuBtnHero = document.getElementById('cargar-menu-hero');
    const cargarMenuBtnCompleto = document.getElementById('cargar-menu-completo');
    const contenedorMenu = document.getElementById('contenedor-menu');

    function cargarMenu(event) {
        event.preventDefault(); 
        fetch('/PanaderiaSC/menu.html')
            .then(response => response.text())
            .then(data => {
                contenedorMenu.innerHTML = data;
                contenedorMenu.style.display = 'block';
                contenedorMenu.scrollIntoView({ behavior: 'smooth' });
                initializeMenuButtons();
            })
            .catch(error => {
                console.error('Error al cargar el menú:', error);
                contenedorMenu.innerHTML = '<p>Error al cargar el menú.</p>';
                contenedorMenu.style.display = 'block';
            });
    }

    cargarMenuBtnNav.addEventListener('click', cargarMenu);
    cargarMenuBtnHero.addEventListener('click', cargarMenu);
    cargarMenuBtnCompleto.addEventListener('click', cargarMenu);

    // Función para inicializar los botones de "Agregar al Carrito" en el menú cargado
    function initializeMenuButtons() {
        const botonesAgregarCarritoMenu = document.querySelectorAll('#contenedor-menu .agregar-carrito');
        botonesAgregarCarritoMenu.forEach(boton => {
            boton.removeEventListener('click', handleAddProductClick); 
            boton.addEventListener('click', handleAddProductClick);
        });
    }

    // Manejador de evento para los botones "Agregar al Carrito"
    function handleAddProductClick() {
        const productDiv = this.closest('.menu-item');
        const productId = productDiv.dataset.id;
        const productName = productDiv.dataset.name;
        const productPrice = parseFloat(productDiv.dataset.price);
        
        window.addProductToCart(productId, productName, productPrice);
    }

    // Renderiza el carrito al cargar la página
    renderCart();
});

// Eliminada la lógica de inicio de sesión flotante