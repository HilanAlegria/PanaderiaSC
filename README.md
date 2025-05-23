Sitio Web - Panadería Sabor Caleño Última Actualización: 16 de Mayo de 2025 Autor: Hilan Eduardo Alegria Yate Despliegue: https://hilanalegria.github.io/PanaderiaSC/

Introducción Este proyecto es una página web desarrollada para la panadería Sabor Caleño, ubicada en Cali, Colombia. El objetivo es ofrecer una plataforma informativa e interactiva para que los clientes puedan conocer el menú, la historia de la panadería y realizar pedidos de manera sencilla.

Tecnologías Utilizadas HTML5: Estructura del sitio web.

CSS3: Estilización visual y responsive (styles.css).

JavaScript: Carga dinámica de contenido y funcionalidades interactivas.

GitHub Pages: Plataforma de despliegue del sitio estático.

Imágenes (.png / .jpeg): Ilustraciones, productos y logos.

Estructura del Proyecto css Copiar Editar PanaderiaSC/ ├── imagenes/ │ ├── Logo Sabor Caleño.png │ ├── [varios productos e iconos de redes sociales] ├── index.html ├── menu.html ├── nosotros-contenido.html ├── styles.css └── README.md index.html: Página principal con secciones dinámicas y contenido base.
menu.html: Lista estructurada de productos del menú.

nosotros-contenido.html: Información ampliada sobre la panadería.

styles.css: Estilos personalizados para todo el sitio.

imagenes/: Archivos visuales utilizados en el sitio.

Funcionalidades Clave Página de Inicio (index.html) Hero Section: Presentación visual con nombre, eslogan y acceso al menú.
Productos Destacados: Imágenes, descripciones y precios destacados.

Sección "Sobre Nosotros": Breve descripción con opción a más información.

Mapa (placeholder): Ubicación de la panadería en Cali.

Botones Sociales y de Pedido: Acceso directo a WhatsApp, Facebook e Instagram.

Icono flotante de WhatsApp: Acceso rápido desde cualquier parte del sitio.

Contenido Dinámico Menú (menu.html) y Sobre Nosotros (nosotros-contenido.html) se cargan con fetch() sin recargar la página.

Navegación fluida con scrollIntoView() y botón para cerrar secciones.

JavaScript Interactivo Incluido dentro de index.html:
Carga del Menú: Uso de fetch para cargar menu.html en un contenedor específico.

Sección "Sobre Nosotros": Carga y ocultación dinámica desde nosotros-contenido.html.

Scroll suave: Mejora la navegación hacia contenido recién cargado.

Estilos CSS Diseño limpio, adaptable y amigable.
Componentes personalizados: Hero, secciones destacadas, tarjetas de productos.

Iconos y botones responsivos.

Estilo especial para el ícono de WhatsApp flotante.

Despliegue con GitHub Pages El sitio está disponible en:
https://hilanalegria.github.io/PanaderiaSC/

Para actualizarlo:

bash Copiar Editar git add . git commit -m "Actualización" git push origin master GitHub Pages reflejará los cambios automáticamente.

Posibles Mejoras Futuras Formulario de contacto funcional.
Sistema de pedidos en línea con carrito.

Backend con base de datos para gestión de productos y pedidos.

Versión PWA (App Web Progresiva).

Optimización de rendimiento e imágenes.

Contacto Desarrollador: Hilan Eduardo Alegria Yate, gemini y Diosito