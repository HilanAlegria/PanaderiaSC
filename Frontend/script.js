console.log("¡Hola desde tu panadería en Cali!");

// Elementos clave del DOM para el carrito
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
                    <div class="input-group input-group-sm" style="width: 120px;">
                        <button class="btn btn-outline-secondary btn-sm" type="button" onclick="window.updateQuantity('${item.id}', -1)">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary btn-sm" type="button" onclick="window.updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </td>
                <td>$${itemTotalPrice.toLocaleString('es-CO')}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="window.removeFromCart('${item.id}')">Eliminar</button>
                </td>
            `;
            cartList.appendChild(row);
            total += itemTotalPrice;
            count += item.quantity;
        });
    }
    cartTotal.textContent = total.toLocaleString('es-CO');
    cartCount.textContent = count; // Actualiza el contador del botón flotante

    saveCart();
}

// Función para agregar un producto al carrito
window.addProductToCart = function(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    renderCart();
    // Muestra una pequeña notificación o abre el modal del carrito
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
};

// Función para actualizar la cantidad de un producto en el carrito
window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== productId);
        }
    }
    renderCart();
};

// Función para eliminar un producto del carrito
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
};

// Limpiar carrito
const clearCartBtn = document.getElementById('clear-cart-btn');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        renderCart();
    });
}

// Lógica para mostrar resumen de compra en modal de confirmación
const confirmPurchaseBtn = document.querySelector('.btn-success[data-bs-toggle="modal"]');
if (confirmPurchaseBtn) {
    confirmPurchaseBtn.addEventListener('click', (event) => {
        const email = emailInput.value;
        const name = nameInput.value;
        const location = locationInput.value;
        const phone = phoneInput.value;
        const paymentMethod = paymentMethodSelect.value;

        if (!email || !name || !location || !phone || !paymentMethod) {
            alert('Por favor, completa todos los campos de información para el envío.');
            event.stopPropagation(); // Previene que se abra el modal si los campos no están completos
            return;
        }

        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de realizar la compra.');
            event.stopPropagation();
            return;
        }

        let summaryHtml = `
            <h5>Información de Contacto y Envío:</h5>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Ubicación:</strong> ${location}</p>
            <p><strong>Método de Pago:</strong> ${paymentMethod}</p>
            <hr>
            <h5>Productos:</h5>
            <ul class="list-group mb-3">
        `;
        let total = 0;
        cart.forEach(item => {
            const itemTotalPrice = item.price * item.quantity;
            summaryHtml += `<li class="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 class="my-0">${item.name}</h6>
                                    <small class="text-muted">Cantidad: ${item.quantity} x $${item.price.toLocaleString('es-CO')}</small>
                                </div>
                                <span class="text-muted">$${itemTotalPrice.toLocaleString('es-CO')}</span>
                            </li>`;
            total += itemTotalPrice;
        });
        summaryHtml += `</ul>
            <h5 class="text-end">Total Final: $<span id="final-order-total">${total.toLocaleString('es-CO')}</span></h5>
        `;
        modalBodySummary.innerHTML = summaryHtml;
    });
}


// Lógica para confirmar y generar PDF
const confirmOrderBtn = document.getElementById('confirm-order-btn');
if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
        const {
            jsPDF
        } = window.jspdf;
        const doc = new jsPDF();

        const email = emailInput.value;
        const name = nameInput.value;
        const location = locationInput.value;
        const phone = phoneInput.value;
        const paymentMethod = paymentMethodSelect.value;
        const cartTotalValue = document.getElementById('final-order-total').textContent; // Obtener el total del resumen

        let y = 10;
        doc.text("Resumen de Compra - Panadería Sabor Caleño", 10, y);
        y += 10;
        doc.text("--------------------------------------------------", 10, y);
        y += 10;
        doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 10, y);
        y += 7;
        doc.text(`Hora: ${new Date().toLocaleTimeString('es-CO')}`, 10, y);
        y += 10;

        doc.text("Información de Contacto y Envío:", 10, y);
        y += 7;
        doc.text(`Nombre: ${name}`, 10, y);
        y += 7;
        doc.text(`Correo: ${email}`, 10, y);
        y += 7;
        doc.text(`Teléfono: ${phone}`, 10, y);
        y += 7;
        doc.text(`Ubicación: ${location}`, 10, y);
        y += 7;
        doc.text(`Método de Pago: ${paymentMethod}`, 10, y);
        y += 10;

        doc.text("Detalle de Productos:", 10, y);
        y += 7;
        cart.forEach(item => {
            doc.text(`${item.name} - Cantidad: ${item.quantity} - Precio Unitario: $${item.price.toLocaleString('es-CO')} - Total: $${(item.price * item.quantity).toLocaleString('es-CO')}`, 10, y);
            y += 7;
        });
        y += 10;
        doc.text(`Total Final: $${cartTotalValue}`, 10, y);
        y += 10;
        doc.text("¡Gracias por tu compra!", 10, y);

        doc.save("resumen_compra_sabor_caleno.pdf");

        // Limpiar el carrito después de la compra exitosa
        cart = [];
        saveCart();
        renderCart();

        // Cerrar modales
        const cartModalElement = document.getElementById('cartModal');
        const confirmationModalElement = document.getElementById('confirmationModal');
        const cartModal = bootstrap.Modal.getInstance(cartModalElement);
        const confirmationModal = bootstrap.Modal.getInstance(confirmationModalElement);

        if (confirmationModal) confirmationModal.hide();
        if (cartModal) cartModal.hide();

        alert('¡Compra realizada con éxito! Se ha generado un PDF con tu resumen.');
    });
}

// --- Lógica de inicialización de botones "Agregar al Carrito" ---

// Función para inicializar los botones de "Agregar al Carrito" en cualquier sección
// Esta función se llamará tanto en index.html como en menu.html
function initializeAddProductButtons() {
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    botonesAgregarCarrito.forEach(boton => {
        // Primero, removemos el listener para evitar duplicados si la función se llama varias veces
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

// Cuando el DOM esté completamente cargado, inicializa los botones del carrito y renderiza el carrito.
document.addEventListener('DOMContentLoaded', () => {
    initializeAddProductButtons(); // Para los productos destacados en index.html
    renderCart(); // Renderiza el carrito al cargar la página en cualquier vista
});


// --- Lógica para "Sobre Nosotros" (AHORA EN EL MISMO INDEX.HTML) ---
// NO USA FETCH: SIMPLEMENTE MUESTRA/OCULTA LA SECCIÓN YA PRESENTE EN EL HTML
const nosotrosBtn = document.getElementById('cargar-nosotros');
const nosotrosSection = document.getElementById('nosotros-contenido');
const cerrarNosotrosBtn = document.getElementById('cerrar-nosotros');

if (nosotrosBtn && nosotrosSection && cerrarNosotrosBtn) { // Asegúrate de que los elementos existan
    nosotrosBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        nosotrosSection.style.display = 'block'; // Muestra la sección
        
        // Desplazar a la sección "Sobre Nosotros" para que sea visible
        nosotrosSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Desplaza para que el inicio de la sección quede visible
        });
    });

    cerrarNosotrosBtn.addEventListener('click', function() {
        nosotrosSection.style.display = 'none'; // Oculta la sección
        // Opcional: puedes añadir un scroll de vuelta a la parte superior de la página si lo deseas
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Lógica para el inicio de sesión/registro ---
// Esta parte maneja el login/registro que podría estar en el index si es un modal,
// o simplemente el enlace que abre 'login.html' en una nueva ventana.
// Si 'login.html' se abre en una ventana separada, el 'login-container' en index.html
// puede ser solo un placeholder o ser completamente removido si no tiene funcionalidad aquí.
// El código de la ventana emergente ya lo tienes en login.html.
const loginButton = document.querySelector('.button[href="login.html"]'); // El botón flotante de login
const loginContainer = document.getElementById('login-container'); // El div #login-container en index.html
const loginForm = document.getElementById('login-form'); // El formulario dentro de #login-container
const loginMessage = document.getElementById('login-message');

// Lógica de inicio de sesión/registro para el login-container (si se usa como modal en index.html)
if (loginForm) { // Solo si el formulario de login existe en el index.html
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginForm.elements['login-username'].value;
        const password = loginForm.elements['login-password'].value;

        // Lógica de autenticación simplificada (debería ser más robusta en un entorno real)
        // Esta lógica es para el login DENTRO del index.html, no el de login.html
        if (username === 'test' && password === 'test') {
            loginMessage.textContent = 'Inicio de sesión exitoso.';
            loginMessage.style.color = 'green';
            // Puedes redirigir o cerrar el contenedor aquí si es un modal
            // loginContainer.style.display = 'none';
            alert('Bienvenido, ' + username);
        } else {
            loginMessage.textContent = 'Usuario o contraseña incorrectos.';
            loginMessage.style.color = 'red';
        }
    });
}


// Escucha mensajes desde la ventana de login (para cuando login.html cierra y notifica éxito)
window.addEventListener('message', function(event) {
    // Asegúrate de que el origen del mensaje sea el esperado en un entorno de producción
    // if (event.origin !== 'http://tu-dominio.com') return; // Descomenta y ajusta en producción
    if (event.data === 'loginSuccess') {
        // Cierra el modal de login en index.html si estaba abierto, o simplemente actualiza la UI
        if (loginContainer) {
            loginContainer.style.display = 'none'; // Oculta el contenedor de login
        }
        alert('Inicio de sesión exitoso desde ventana externa.');
        // Puedes actualizar la UI de index.html aquí, por ejemplo, mostrar el nombre del usuario
    }
});