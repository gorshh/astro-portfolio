---
title: "Web Components: Construyendo Interfaces Reutilizables como un Pro"
author: jorge
heroImage: "https://www.dannymoerkerke.com/src/img/blog/480/everything-you-always-wanted-to-know-about-web-components-but-were-afraid-to-ask.jpg"
tags:
- astro
- blog
- static site generator
- web development
- tutorial
topic: Frontend
date: 2025-04-23
---


En el desarrollo moderno de aplicaciones web, uno de los mayores retos es mantener el código organizado y reutilizable. Frameworks como React, Vue o Angular abordan este problema con componentes, pero... ¿sabías que el navegador ya soporta **componentes nativos** sin necesidad de un framework?

En este artículo vamos a explorar **Web Components**, una poderosa especificación del W3C que permite crear elementos personalizados reutilizables utilizando solo HTML, CSS y JavaScript nativo.

---

## ¿Qué son los Web Components?

Los Web Components son un conjunto de tecnologías que permiten crear elementos HTML personalizados, encapsulados y reutilizables. Están compuestos por cuatro especificaciones clave:

1. **Custom Elements**: Permiten definir nuevos elementos HTML.
2. **Shadow DOM**: Encapsula el estilo y la estructura de un componente.
3. **HTML Templates**: Definen plantillas reutilizables sin renderizarlas inmediatamente.
4. **ES Modules**: Permiten cargar componentes de forma modular.

---

## ¿Por qué usar Web Components?

- ✅ **Reutilizables**: Puedes crear botones, modales o sliders que se reutilicen en múltiples proyectos.
- ✅ **Framework-agnostic**: Funcionan en cualquier entorno: React, Vue, Angular... o simplemente HTML plano.
- ✅ **Encapsulados**: El estilo no se filtra fuera del componente, y viceversa.
- ✅ **Compatibilidad creciente**: Todos los navegadores modernos ya los soportan.

---

## Empecemos: Tu primer Web Component

Vamos a crear un componente sencillo: `<mi-tarjeta>` que muestra una tarjeta con nombre e imagen.

### Estructura del proyecto

```plaintext
/mi-tarjeta
├── index.html
└── mi-tarjeta.js
```

---

### `index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Mi primer Web Component</title>
</head>
<body>

  <mi-tarjeta nombre="Ada Lovelace" imagen="https://upload.wikimedia.org/wikipedia/commons/0/0f/Ada_Lovelace_portrait.jpg"></mi-tarjeta>

  <script type="module" src="./mi-tarjeta.js"></script>
</body>
</html>
```

---

### `mi-tarjeta.js`

```javascript
class MiTarjeta extends HTMLElement {
  constructor() {
    super();

    // Crea shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Estilos
    const estilo = document.createElement('style');
    estilo.textContent = `
      .tarjeta {
        border: 1px solid #ddd;
        border-radius: 10px;
        width: 250px;
        padding: 1em;
        font-family: sans-serif;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        text-align: center;
      }
      .tarjeta img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
      }
    `;

    // Contenido
    const contenedor = document.createElement('div');
    contenedor.classList.add('tarjeta');

    const imagen = document.createElement('img');
    imagen.src = this.getAttribute('imagen');

    const nombre = document.createElement('h3');
    nombre.textContent = this.getAttribute('nombre');

    contenedor.appendChild(imagen);
    contenedor.appendChild(nombre);

    shadow.appendChild(estilo);
    shadow.appendChild(contenedor);
  }
}

// Define el nuevo elemento
customElements.define('mi-tarjeta', MiTarjeta);
```

---

## Reactividad con Observed Attributes

¿Y si queremos que el componente se actualice cuando cambian sus atributos? Podemos usar `attributeChangedCallback`.

```javascript
static get observedAttributes() {
  return ['nombre', 'imagen'];
}

attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'nombre') {
    this.shadowRoot.querySelector('h3').textContent = newValue;
  }
  if (name === 'imagen') {
    this.shadowRoot.querySelector('img').src = newValue;
  }
}
```

Esto hará que `<mi-tarjeta>` se actualice si cambiamos los atributos dinámicamente con JavaScript.

---

## Reutilízalo en cualquier proyecto

Lo genial es que este componente se puede empaquetar como un archivo JS, incluirlo en cualquier sitio web, y usarlo como un nuevo tag HTML.

```html
<script type="module" src="https://tusitio.com/components/mi-tarjeta.js"></script>
<mi-tarjeta nombre="Linus Torvalds" imagen="https://upload.wikimedia.org/wikipedia/commons/9/91/Linus_Torvalds.jpeg"></mi-tarjeta>
```

---

## Casos de uso reales

- **Botones estilizados reutilizables**: `<boton-primary></boton-primary>`
- **Alertas**: `<alerta tipo="error">¡Algo salió mal!</alerta>`
- **Spinners de carga**
- **Modales, tooltips, sliders, tabs, etc.**

---

## Conclusión

Los Web Components son una tecnología poderosa y nativa que te permite construir interfaces modulares sin atarte a ningún framework. Son ideales para librerías de diseño, sistemas de componentes compartidos, y micro frontends.

Si bien frameworks como React siguen siendo muy populares, Web Components están ganando terreno, especialmente en entornos empresariales o cuando se necesita interoperabilidad entre proyectos.

---

## Recursos adicionales

- [MDN: Web Components](https://developer.mozilla.org/es/docs/Web/Web_Components)
- [WebComponents.org](https://www.webcomponents.org/)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)

---

¿Te animas a construir tu propio set de Web Components? ¡Cuéntame en los comentarios qué idea tienes en mente!
