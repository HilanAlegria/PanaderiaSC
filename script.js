// script.js
console.log("¡Hola desde tu panadería en Cali!");

// Elementos clave
// Ya no necesitamos seleccionar botones de la página principal aquí
// Los botones se seleccionarán e inicializarán dinámicamente cuando el menú se cargue.
const cartList = document.getElementById('cart-list'); // tbody del carrito en el modal
const cartTotal = document.getElementById('cart-total'); // span del total en el modal
const cartCount = document.getElementById('cart-count'); // span del contador en el botón flotante
const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal')); // Instancia del modal de confirmación
const cartModal = new bootstrap.Modal(document.getElementById('cartModal')); // Instancia del modal del carrito

// Cargar carrito desde localStorage si existe
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// La función para añadir producto al carrito se ha movido al script de carga del menú en index.html
// para asegurar que se vincule a los elementos cargados dinámicamente.
// script.js solo se encargará de las funciones del carrito en sí.

function renderCart() {
    cartList.innerHTML = ''; // Limpiar la lista antes de renderizar
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<tr><td colspan="5" class="text-center">El carrito está vacío</td></tr>';
    } else {
        cart.forEach(item => {
            const row = document.createElement('tr');
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toLocaleString()}</td>
                <td>
                    <div class="input-group" style="width: 120px;">
                        <button class="btn btn-outline-secondary btn-sm" type="button" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <input type="text" class="form-control form-control-sm text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary btn-sm" type="button" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </td>
                <td>$${itemTotal.toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeItem('${item.id}')">Eliminar</button>
                </td>
            `;
            cartList.appendChild(row);
        });
    }

    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Actualiza el badge del botón flotante
}

// Estas funciones deben ser globales para que puedan ser llamadas desde los onclick en el HTML del modal
window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(productId); // Eliminar si la cantidad llega a 0 o menos
        }
        saveCart();
        renderCart();
    }
}

window.removeItem = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

window.clearCart = function() {
    cart = [];
    saveCart();
    renderCart();
    alert('Carrito vaciado.');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para mostrar el modal de confirmación
window.showConfirmationModal = function() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío 😅");
        return;
    }

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!email || !name || !phone) {
        alert("Por favor, completa todos los campos obligatorios (Correo, Nombre, Teléfono).");
        return;
    }

    let summaryHtml = `
        <p><strong>Detalle del Pedido:</strong></p>
        <ul>
    `;
    cart.forEach(item => {
        summaryHtml += `<li>${item.name} x ${item.quantity} = $${(item.price * item.quantity).toLocaleString()}</li>`;
    });
    summaryHtml += `
        </ul>
        <p><strong>Total a Pagar:</strong> $${cartTotal.textContent}</p>
        <p><strong>Datos del Cliente:</strong></p>
        <ul>
            <li><strong>Nombre:</strong> ${name}</li>
            <li><strong>Correo:</strong> ${email}</li>
            <li><strong>Género:</strong> ${gender}</li>
            <li><strong>Teléfono:</strong> ${phone}</li>
            <li><strong>Método de Pago:</strong> ${paymentMethod}</li>
        </ul>
        <p>¿Confirmas tu compra?</p>
    `;

    document.getElementById('modal-body-summary').innerHTML = summaryHtml;
    cartModal.hide(); // Ocultar el modal del carrito antes de mostrar el de confirmación
    confirmationModal.show();
}

// Función para procesar la compra (se llama al confirmar en el modal)
window.checkout = function() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cartTotal.textContent;

    // Generar PDF del pedido
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Resumen de tu Pedido - Sabor Caleño", 10, 20);

    doc.setFontSize(12);
    let y = 30;
    cartItems.forEach(item => {
        doc.text(`${item.name} x ${item.quantity} = $${(item.price * item.quantity).toLocaleString()}`, 10, y += 10);
    });

    doc.text(`Total: $${totalAmount}`, 10, y += 20);
    doc.text("Datos del Cliente:", 10, y += 10);
    doc.text(`Nombre: ${name}`, 10, y += 10);
    doc.text(`Correo: ${email}`, 10, y += 10);
    doc.text(`Género: ${gender}`, 10, y += 10);
    doc.text(`Teléfono: ${phone}`, 10, y += 10);
    doc.text(`Método de Pago: ${paymentMethod}`, 10, y += 10);

    doc.save(`pedido_sabor_caleno_${name}.pdf`);

    alert('¡Gracias por tu compra! Tu pedido ha sido procesado y se ha generado un PDF.');
    clearCart(); // Vaciar el carrito después de la compra
    confirmationModal.hide(); // Ocultar el modal de confirmación
}

// Render inicial del carrito cuando la página carga
document.addEventListener('DOMContentLoaded', renderCart);

// Listener para el botón flotante del carrito
document.querySelector('.cart-float-button').addEventListener('click', function(event) {
    event.preventDefault();
    renderCart(); // Asegurarse de que el carrito esté actualizado al abrir el modal
});