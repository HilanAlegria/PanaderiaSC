// Este es un archivo de JavaScript básico.
// Aquí podrías agregar interactividad a tu página.

console.log("¡Hola desde tu panadería en Cali!");

// Ejemplo básico: agregar un evento a los botones de "Añadir al Carrito"
const botonesCarrito = document.querySelectorAll('.producto .button');

botonesCarrito.forEach(boton => {
    boton.addEventListener('click', function() {
        const nombreProducto = this.parentNode.querySelector('h3').textContent;
        alert(`"${nombreProducto}" ha sido añadido al carrito (funcionalidad no implementada).`);
        // Aquí iría la lógica para agregar el producto al carrito real
    });
});

// Podrías agregar más funcionalidades como:
// - Validación de formularios de contacto
// - Interacción con un carrito de compras (si implementas pedidos en línea)
// - Animaciones o efectos visuales