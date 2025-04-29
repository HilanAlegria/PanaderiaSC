# Documentación del Proyecto: Sitio Web Panadería Sabor Caleño

**Última Actualización:** 29 de abril de 2025

## 1. Introducción

Este documento describe la estructura, funcionalidades y tecnologías utilizadas en el sitio web de la Panadería "Sabor Caleño" ubicada en Cali, Colombia. El objetivo del sitio web es presentar el menú de la panadería, compartir la historia de la empresa, proporcionar información de contacto y facilitar la realización de pedidos a los clientes.

## 2. Tecnologías Utilizadas

* **HTML:** Estructura y contenido de las páginas web.
* **CSS:** Estilos visuales y diseño del sitio web (`styles.css`).
* **JavaScript:** Interacción dinámica para cargar contenido del menú y la sección "Sobre Nosotros" en la página principal (`index.html`).
* **Imágenes:** Archivos `.png` y `.jpeg` para el logo, productos, iconos de redes sociales y otras ilustraciones (almacenadas en la carpeta `imagenes/`).

## 3. Estructura de Carpetas y Archivos

```
├── imagenes/
│   ├── Logo Sabor Caleño.png
│   ├── Variedad SC.png
│   ├── pan frances.jpeg
│   ├── torta de chocolate.jpeg
│   ├── galletas de avena.jpeg
│   ├── pastel de avena.jpeg
│   ├── Panadera trabajando.jpeg
│   ├── Pan campesino colombiano.jpeg
│   ├── Croissant de Almendras.jpeg
│   ├── icono fb.png
│   ├── icono ig.jpeg
│   └── icono whatsapp.jpeg
├── menu.html
├── nosotros-contenido.html
├── index.html
└── styles.css
```

* `imagenes/`: Contiene todos los archivos de imagen utilizados en el sitio web.
* `menu.html`: Contenido del menú de la panadería, cargado dinámicamente en la página principal.
* `nosotros-contenido.html`: Contenido de la sección "Sobre Nosotros", cargado dinámicamente en la página principal.
* `index.html`: La página principal del sitio web, que incluye la estructura general, el contenido estático y la lógica para cargar contenido dinámico.
* `styles.css`: Archivo que contiene todos los estilos CSS para el diseño y la presentación del sitio web.

## 4. Funcionalidades Principales

* **Página de Inicio (`index.html`):**
    * **Hero Section:** Presenta el nombre de la panadería, un eslogan y un enlace destacado al menú. Muestra una imagen de variedad de productos.
    * **Sección de Productos Destacados:** Muestra una selección de productos populares con imágenes, nombres, descripciones y precios. Incluye un enlace para ver el menú completo.
    * **Sección "Sobre Nosotros":** Presenta una breve introducción a la historia y valores de la panadería, con un botón para cargar más información dinámicamente.
    * **Sección de Ubicación:** Muestra un mapa de Google Maps (actualmente un placeholder) y la información de la dirección y horario en Cali.
    * **Carga Dinámica del Menú:** Al hacer clic en los enlaces "Menú" en la navegación o en la sección Hero/Destacados, el contenido de `menu.html` se carga dinámicamente dentro de un contenedor (`#contenedor-menu`) en la misma página sin necesidad de recargar o abrir una nueva pestaña.
    * **Carga Dinámica de "Sobre Nosotros":** Al hacer clic en el botón "Conoce Más Sobre Nosotros", el contenido de `nosotros-contenido.html` se carga dinámicamente dentro de un contenedor (`#contenedor-nosotros`) en la misma página. Esta sección incluye una introducción, misión, visión y la lista de trabajadores. Un botón "Ocultar Información" permite cerrar esta sección.
    * **Sección de Pedidos:** Proporciona enlaces directos para realizar pedidos a través de WhatsApp y la página de Facebook.
    * **Iconos de Redes Sociales:** En el pie de página, enlaces a las páginas de Facebook e Instagram de la panadería.
    * **Icono de WhatsApp Flotante:** Un icono persistente en la esquina inferior derecha que permite a los usuarios contactar directamente por WhatsApp.

* **Contenido del Menú (`menu.html`):**
    * Estructura HTML que organiza los productos del menú por categorías (ej. Panes Artesanales, Pasteles y Tortas).
    * Estilos CSS específicos para la presentación del menú.

* **Contenido "Sobre Nosotros" (`nosotros-contenido.html`):**
    * Presenta información detallada sobre la panadería, incluyendo introducción, misión, visión y la lista de trabajadores con sus roles.
    * Incluye estilos CSS para la presentación de esta información.
    * Contiene un botón para ocultar la sección.

## 5. Lógica de JavaScript

La interactividad principal del sitio web se gestiona mediante JavaScript incluido en la etiqueta `<script>` al final del `index.html`:

* **Carga Dinámica del Menú:**
    * Se obtienen referencias a los botones "Menú" y al contenedor `#contenedor-menu`.
    * Al hacer clic en los botones, se utiliza la función `fetch` para cargar el contenido de `menu.html`.
    * El contenido HTML recibido se inserta en el contenedor y se muestra.
    * Se utiliza `scrollIntoView` para desplazar suavemente la página hacia la sección del menú cargada.

* **Carga Dinámica de "Sobre Nosotros":**
    * Se obtienen referencias al botón "Conoce Más Sobre Nosotros" y al contenedor `#contenedor-nosotros`.
    * Al hacer clic en el botón, se utiliza `fetch` para cargar el contenido de `nosotros-contenido.html`.
    * El contenido HTML recibido se inserta en el contenedor y se muestra.
    * Se utiliza `scrollIntoView` para desplazar suavemente la página hacia la sección "Sobre Nosotros" cargada.
    * Se añade funcionalidad al botón "Ocultar Información" dentro del contenido cargado para ocultar la sección.

## 6. Estilos CSS (`styles.css`)

El archivo `styles.css` contiene todos los estilos para la presentación visual del sitio web, incluyendo:

* Estilos generales para el cuerpo, encabezado, navegación, pie de página y secciones principales.
* Estilos específicos para la sección Hero, productos destacados, "Sobre Nosotros" (en la página principal), ubicación, menú cargado y la sección de pedidos.
* Estilos para los botones y otros elementos interactivos.
* Estilos para el icono de WhatsApp flotante.

## 7. Despliegue

El sitio web está desplegado utilizando GitHub Pages. Para actualizar el sitio, simplemente se deben subir los archivos actualizados al repositorio de GitHub. GitHub Pages se encarga de servir los archivos estáticos.


## 9. Contacto

Hilan Eduardo Alegria Yate
