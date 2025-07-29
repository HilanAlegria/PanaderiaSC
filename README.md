# Sitio Web - Panadería Sabor Caleño

## Última Actualización: 05 de Junio de 2025

## Autores: Hilan Eduardo Alegría Yate 
            

## Despliegue: [https://hilanalegria.github.io/PanaderiaSC/](https://hilanalegria.github.io/PanaderiaSC/)

---

## Introducción

Este proyecto es una página web desarrollada para la panadería "Sabor Caleño", ubicada en Cali, Colombia. El objetivo principal es ofrecer una plataforma informativa e interactiva que permita a los clientes:

* Conocer el menú completo de productos.
* Aprender sobre la historia y misión de la panadería.
* Realizar pedidos de manera sencilla a través de un carrito de compras.
* Acceder a funcionalidades de registro e inicio de sesión para una experiencia personalizada.

---

## Tecnologías Utilizadas

* **HTML5:** Estructura semántica del sitio web.
* **CSS3:** Estilización visual, diseño responsivo (mobile-first) y efectos.
* **JavaScript:** Interactividad, carga dinámica de contenido, gestión del carrito de compras y funcionalidades de autenticación (Registro/Inicio de Sesión).
* **Bootstrap 5.3.0:** Framework CSS para componentes pre-diseñados y sistema de cuadrícula responsivo.
* **Font Awesome 6.0.0:** Librería de iconos vectoriales.
* **jsPDF 2.5.1:** Librería para la generación de documentos PDF (confirmación de compra).
* **GitHub Pages:** Plataforma para el despliegue del sitio web estático.
* **Imágenes (.png / .jpeg):** Recursos visuales de productos, logos y elementos de diseño.

---

## Estructura del Proyecto

El proyecto sigue una estructura de directorios clara para organizar los archivos:

PanaderiaSC/
├── imagenes/
│   ├── Logo Sabor Caleño.png
│   ├── Fondo pan.png
│   └── [otras imágenes de productos, iconos de redes sociales, etc.]
├── css/ (Se recomienda mover los archivos CSS aquí para una mejor organización)
│   ├── styles.css        # Estilos generales del sitio
│   ├── menu.css          # Estilos específicos de la sección de menú
│   └── login.css         # Estilos para las páginas de login y registro
├── js/ (Se recomienda mover los archivos JS aquí para una mejor organización)
│   ├── script.js         # Lógica principal del carrito y carga de contenido
│   └── login.js          # Lógica específica para login/registro (si se separa)
├── index.html            # Página principal del sitio
├── menu.html             # Página con el menú completo de productos
├── login.html            # Página para inicio de sesión y registro de usuarios
├── nosotros-contenido.html # Contenido de la sección "Sobre Nosotros" (cargada dinámicamente)
└── README.md             # Documentación del proyecto


**Archivos Clave:**

* `index.html`: La página de inicio, actúa como el punto de entrada principal del sitio. Carga dinámicamente secciones como el menú y "Sobre Nosotros".
* `menu.html`: Contiene la estructura y el listado de todos los productos disponibles en la panadería.
* `login.html`: Implementa las interfaces de usuario para el registro de nuevos usuarios y el inicio de sesión.
* `nosotros-contenido.html`: Almacena la información detallada sobre la panadería ("Sobre Nosotros"), que se carga en la página principal.
* `styles.css`: Hoja de estilos principal con la configuración global de diseño.
* `menu.css`: Estilos adicionales y específicos para la presentación del menú.
* `login.css`: Estilos para el formulario de inicio de sesión y registro.
* `script.js`: Contiene toda la lógica JavaScript para la interactividad del sitio, incluyendo el carrito de compras, la carga dinámica de contenido y la gestión de la autenticación.

---

## Funcionalidades Clave

### Experiencia del Usuario

* **Página Principal (`index.html`):**
    * **Hero Section:** Presentación visual impactante con el logo, nombre de la panadería, eslogan y acceso directo al menú.
    * **Productos Destacados:** Sección con imágenes, descripciones y precios de productos selectos.
    * **"Sobre Nosotros" (Carga Dinámica):** Breve descripción con la opción de cargar más información desde `nosotros-contenido.html` sin recargar la página.
    * **Mapa (Placeholder):** Sección designada para la ubicación de la panadería en Cali.
    * **Botones Sociales y de Pedido:** Acceso directo a WhatsApp, Facebook e Instagram.
    * **Icono Flotante de WhatsApp:** Acceso rápido y persistente a WhatsApp desde cualquier parte del sitio.
* **Navegación:**
    * Navegación fluida entre secciones con `scrollIntoView()` cuando se carga contenido dinámico.
    * Botón para cerrar las secciones cargadas dinámicamente ("Menú" y "Sobre Nosotros").

### Carrito de Compras

* **Añadir al Carrito:** Los usuarios pueden agregar productos del menú a un carrito de compras.
* **Actualización en Tiempo Real:** El carrito muestra la cantidad de productos y el total en tiempo real.
* **Vaciar Carrito:** Funcionalidad para eliminar todos los productos del carrito.
* **Realizar Compra:** Proceso de compra con recopilación de datos del cliente (email, nombre, ubicación, teléfono, método de pago).
* **Confirmación de Compra:** Modal de confirmación antes de finalizar el pedido.
* **Generación de PDF:** Al confirmar la compra, se genera un PDF con el resumen del pedido, que incluye detalles del cliente, productos y total.
* **Persistencia:** El carrito se guarda en `localStorage` para mantener los productos incluso si el usuario cierra la página.

### Autenticación de Usuarios

* **Ventana de Acceso Separada (`login.html`):**
    * Se abre en una nueva ventana para el proceso de registro e inicio de sesión.
* **Registro de Usuario:** Los usuarios pueden registrarse con nombre, correo electrónico, teléfono y contraseña.
    * Validación de coincidencia de contraseñas.
    * Los datos se almacenan en `localStorage`.
* **Inicio de Sesión:** Permite a los usuarios existentes iniciar sesión con su correo electrónico y contraseña.
    * Validación de credenciales contra los datos almacenados.
    * Notificación de inicio de sesión exitoso al `index.html` para actualizar la interfaz.
* **Persistencia de Sesión (Básica):** Uso de `localStorage` para una simulación básica de sesión (aunque en un entorno real se requeriría un backend).
* **Toggle de Contraseña:** Icono para mostrar/ocultar la contraseña en los campos de entrada.

---

## Estilos CSS

* **Diseño Limpio y Adaptable:** Interfaz de usuario moderna, responsive y amigable.
* **Componentes Personalizados:** Estilos definidos para el `hero`, secciones destacadas, tarjetas de productos y elementos del menú.
* **Iconos y Botones Responsivos:** Aseguran una correcta visualización en diferentes dispositivos.
* **Estilo Flotante de WhatsApp:** Diseño distintivo para el icono de WhatsApp, visible en todo momento.

---

## Puntos Pendientes / Mejoras Futuras

* **Funcionalidad de Administrador:** Implementar un panel de administrador para gestionar productos, pedidos y usuarios.
* **Accesibilidad y Adaptabilidad:** Mejorar el cumplimiento de estándares de accesibilidad (ARIA, navegación por teclado) para usuarios con diferentes necesidades.
* **Backend Real:** Para un sistema de autenticación y pedidos robusto, se requeriría un servidor backend con base de datos.
* **Optimización de Imágenes:** Comprimir y optimizar imágenes para mejorar los tiempos de carga.
* **Validación de Formularios:** Implementar validaciones más robustas en el lado del cliente y en el lado del servidor (si se añade un backend).
* **Manejo de Errores Mejorado:** Implementar mensajes de error más amigables para el usuario.

---

## Contacto Desarrollador

**Hilan Eduardo Alegría Yate**

---
