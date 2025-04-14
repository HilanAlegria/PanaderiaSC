
console.log("¡Hola desde tu panadería en Cali!");


const botonesCarrito = document.querySelectorAll('.producto .button');

botonesCarrito.forEach(boton => {
    boton.addEventListener('click', function() {
        const nombreProducto = this.parentNode.querySelector('h3').textContent;
        alert(`"${nombreProducto}" ha sido añadido al carrito (funcionalidad no implementada).`);

    });
});

