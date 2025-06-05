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
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary quantity-btn" data-name="${item.name}" data-action="decrease">-</button>
                        <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary quantity-btn" data-name="${item.name}" data-action="increase">+</button>
                    </div>
                </td>
                <td>$${itemTotalPrice.toLocaleString('es-CO')}</td>
                <td><button class="btn btn-danger btn-sm eliminar-item" data-name="${item.name}">Eliminar</button></td>
            `;
            cartList.appendChild(row);
            total += itemTotalPrice;
            count += item.quantity;
        });
    }

    cartTotal.textContent = total.toLocaleString('es-CO');
    cartCount.textContent = count; // Actualiza el contador del carrito flotante
}


// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    // Validar que el precio sea un número válido
    const price = parseInt(productPrice);
    if (isNaN(price)) {
        console.error(`Error: El precio para '${productName}' no es un número válido.`);
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas, en lugar de la notificación de éxito
        return;
    }

    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    saveCart();
    renderCart();

    // ELIMINACIÓN DEL MENSAJE DE NOTIFICACIÓN:
    // Comento o elimino la línea que muestra el alert o la notificación.
    // alert(`${productName} ha sido agregado al carrito.`); // Esto es un alert nativo del navegador, poco estético.
    // Si usabas alguna librería para notificaciones (como Toastr, SweetAlert, etc.), su código estaría aquí.
    // Por ejemplo: toastr.success(`${productName} agregado al carrito!`);
    console.log(`${productName} agregado al carrito.`); // Solo para depuración en consola
}

// Event Listeners
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('agregar-carrito')) {
        const menuItem = event.target.closest('.menu-item');
        if (menuItem) {
            const productName = menuItem.dataset.name;
            const productPrice = menuItem.dataset.price; // Obtener el precio directamente del data attribute

            if (productName && productPrice) {
                addToCart(productName, productPrice);
            } else {
                console.error('No se pudo obtener el nombre o el precio del producto.');
            }
        }
    }

    if (event.target.classList.contains('eliminar-item')) {
        const productName = event.target.dataset.name;
        removeFromCart(productName);
    }

    if (event.target.classList.contains('quantity-btn')) {
        const productName = event.target.dataset.name;
        const action = event.target.dataset.action;
        updateQuantity(productName, action);
    }
});


// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    renderCart();
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productName, action) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity--;
            if (item.quantity <= 0) {
                removeFromCart(productName); // Eliminar si la cantidad llega a 0 o menos
                return; // Salir para evitar que renderCart se llame dos veces
            }
        }
        saveCart();
        renderCart();
    }
}

// Inicializar el carrito al cargar la página
renderCart();

// --- Funcionalidades adicionales (Sobre Nosotros, Login, Pedido, etc.) ---

// Lógica para cargar el contenido de "Sobre Nosotros"
document.addEventListener('DOMContentLoaded', () => {
    const cargarNosotrosBtn = document.getElementById('cargar-nosotros');
    const nosotrosContainer = document.getElementById('nosotros-contenido');
    const cerrarNosotrosBtn = document.getElementById('cerrar-nosotros');

    if (cargarNosotrosBtn && nosotrosContainer && cerrarNosotrosBtn) {
        cargarNosotrosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nosotrosContainer.style.display = 'block'; // Muestra la sección
            nosotrosContainer.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
        });

        cerrarNosotrosBtn.addEventListener('click', () => {
            nosotrosContainer.style.display = 'none'; // Oculta la sección
        });
    }

    // Manejar el clic en "Sobre Nosotros" en la barra de navegación para volver a la sección si ya está cargada
    const navNosotrosLink = document.querySelector('nav ul li a[href="/Frontend/#nosotros-contenido"]');
    if (navNosotrosLink) {
        navNosotrosLink.addEventListener('click', (e) => {
            // Solo prevenir el comportamiento por defecto si estamos en la misma página y la sección no está visible
            if (window.location.pathname === '/Frontend/' || window.location.pathname === '/Frontend/index.html') {
                e.preventDefault();
                if (nosotrosContainer && nosotrosContainer.style.display === 'none') {
                    nosotrosContainer.style.display = 'block';
                }
                nosotrosContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Lógica de validación del formulario de compra y confirmación
document.getElementById('confirmationModal').addEventListener('show.bs.modal', function (event) {
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const location = locationInput.value.trim();
    const phone = phoneInput.value.trim();
    const paymentMethod = paymentMethodSelect.value;

    if (!email || !name || !location || !phone || cart.length === 0) {
        alert('Por favor, completa todos los campos de información y asegúrate de que el carrito no esté vacío antes de proceder.');
        event.preventDefault(); // Evita que se abra el modal de confirmación
        return;
    }

    let summaryHtml = `
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Ubicación de Envío:</strong> ${location}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Método de Pago:</strong> ${paymentMethod}</p>
        <h5>Detalle del Pedido:</h5>
        <ul>
    `;
    let total = 0;
    cart.forEach(item => {
        summaryHtml += `<li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CO')}</li>`;
        total += item.price * item.quantity;
    });
    summaryHtml += `</ul><p><strong>Total a Pagar:</strong> $${total.toLocaleString('es-CO')}</p>`;
    modalBodySummary.innerHTML = summaryHtml;
});

// Lógica para confirmar la compra y generar PDF
document.getElementById('confirm-order-btn').addEventListener('click', function() {
    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const location = locationInput.value.trim();
    const phone = phoneInput.value.trim();
    const paymentMethod = paymentMethodSelect.value;
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Generar el contenido del PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Resumen de tu Pedido en Sabor Caleño", 10, 20);

    doc.setFontSize(12);
    let y = 40;
    doc.text(`Correo Electrónico: ${email}`, 10, y); y += 10;
    doc.text(`Nombre: ${name}`, 10, y); y += 10;
    doc.text(`Ubicación de Envío: ${location}`, 10, y); y += 10;
    doc.text(`Teléfono: ${phone}`, 10, y); y += 10;
    doc.text(`Método de Pago: ${paymentMethod}`, 10, y); y += 20;

    doc.text("Detalle del Pedido:", 10, y); y += 10;
    cart.forEach(item => {
        doc.text(`- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('es-CO')}`, 15, y);
        y += 10;
    });

    y += 10;
    doc.setFontSize(16);
    doc.text(`Total a Pagar: $${total.toLocaleString('es-CO')}`, 10, y);

    doc.save("pedido_sabor_caleno.pdf");

    // Vaciar el carrito y cerrar los modales
    cart = [];
    saveCart();
    renderCart();
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) {
        cartModal.hide();
    }
    const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    if (confirmationModal) {
        confirmationModal.hide();
    }

    alert('¡Gracias por tu compra! Se ha generado un PDF con el resumen de tu pedido.');
});


// Lógica del botón "Vaciar carrito"
document.getElementById('clear-cart-btn').addEventListener('click', function() {
    cart = [];
    saveCart();
    renderCart();
    alert('El carrito ha sido vaciado.');
});

// Lógica para el login/registro flotante (si existe y se usa como modal/overlay)
const loginFloatButton = document.querySelector('.login-float-button');
const loginContainer = document.getElementById('login-container'); // Asegúrate de que este ID exista en tu HTML

if (loginFloatButton && loginContainer) {
    loginFloatButton.addEventListener('click', function(e) {
        e.preventDefault(); // Previene la navegación
        // Abrir login.html en una nueva ventana o pestaña
        window.open('login.html', '_blank', 'width=600,height=700');
    });

    // Si tu login-container es un div que aparece/desaparece
    // document.getElementById('login-form').addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     const username = document.getElementById('login-username').value;
    //     const password = document.getElementById('login-password').value;

    //     if (username === 'test' && password === 'test') {
    //         alert('Inicio de sesión exitoso.');
    //         loginContainer.style.display = 'none'; // Oculta el contenedor de login
    //     } else {
    //         alert('Usuario o contraseña incorrectos.');
    //     }
    // });
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
        console.log('Inicio de sesión exitoso desde ventana externa.'); // Cambio de alert a console.log
        // Puedes actualizar la UI de index.html aquí, por ejemplo, mostrar el nombre del usuario
    }
});