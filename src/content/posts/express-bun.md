---
title: "Construyendo una API con Express + Bun + TypeScript + express-validator"
description: "Reflexiones sobre desarrollo web moderno"
pubDate: "2025-04-21"
heroImage: "https://codigoencasa.com/content/images/size/w2000/2022/07/Expressjs--1-.JPG"
author: "jorge"
date: 2024-01-01
tags:
- astro
- blog
- static site generator
- web development
- tutorial
topic: "Backend/ExpressJs"
---


¿Estás buscando una forma **ultrarrápida y moderna** de construir APIs con Express? En este post vamos a crear una base sólida de backend utilizando:

- 🐰 **[Bun](https://bun.sh/)**: un runtime de JavaScript y TypeScript extremadamente rápido.
- ⚙️ **Express**: el framework web clásico de Node, ahora corriendo sobre Bun.
- 🧠 **TypeScript**: para desarrollo tipado y seguro.
- ✅ **express-validator**: para validar entradas de forma sencilla y declarativa.

Vamos a crear una pequeña API REST con validación, escrita en TypeScript y ejecutada con Bun.

---

## 🚀 ¿Por qué usar Bun?

Bun es un runtime moderno (como Node.js o Deno), pero enfocado en el rendimiento:

- 🔥 Compila TypeScript y transpila ES6+ sin configuración.
- ⚡ ¡Hasta 20 veces más rápido en benchmarks que Node en ciertas tareas!
- 🧩 Incluye gestor de paquetes (`bun install`) y bundler.

---

## 📦 Requisitos

- [Instala Bun](https://bun.sh/docs/installation)

```bash
curl -fsSL https://bun.sh/install | bash
```

> Asegúrate de reiniciar la terminal tras instalarlo, o añade Bun al PATH manualmente.

---

## 🛠️ Inicializando el proyecto

```bash
bun init express-api
cd express-api
```

Selecciona la plantilla `typescript`, o edítalo después.

### Instalar dependencias

```bash
bun add express express-validator
bun add -d @types/express @types/express-validator
```

---

## 📁 Estructura del proyecto

```plaintext
express-api/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── users.ts
│   └── validators/
│       └── userValidator.ts
├── tsconfig.json
├── bunfig.toml
└── package.json (opcional)
```

---

## ⚙️ Configuración de TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

---

## 📄 src/index.ts

```ts
import express from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
```

---

## 📄 src/routes/users.ts

```ts
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createUserValidator } from '../validators/userValidator';

const router = Router();

router.post(
  '/',
  createUserValidator,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user: { name, email }
    });
  }
);

export default router;
```

---

## 📄 src/validators/userValidator.ts

```ts
import { body } from 'express-validator';

export const createUserValidator = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  body('email')
    .isEmail().withMessage('Debe ser un email válido'),
];
```

---

## 🚀 Ejecutar el servidor

Bun detecta automáticamente TypeScript. Ejecuta:

```bash
bun src/index.ts
```

Verás en consola:

```bash
🚀 Servidor escuchando en http://localhost:3000
```

---

## 📬 Probar la API

### POST `/api/users`

#### ✅ Cuerpo válido:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@lovelace.dev"
}
```

**Respuesta:**

```json
{
  "message": "Usuario creado correctamente",
  "user": {
    "name": "Ada Lovelace",
    "email": "ada@lovelace.dev"
  }
}
```

#### ❌ Cuerpo inválido:

```json
{
  "name": "",
  "email": "noesunemail"
}
```

**Respuesta:**

```json
{
  "errors": [
    {
      "msg": "El nombre es obligatorio",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Debe ser un email válido",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## 💡 Ventajas de esta stack

- ⚡ **Velocidad**: Bun compila y ejecuta TypeScript directamente.
- ✅ **Validación robusta**: express-validator permite definir reglas claras y centralizadas.
- 🧼 **Código limpio**: separando rutas, validaciones y lógica.
- 🚀 **Listo para producción**: puedes extender con bases de datos, auth, middlewares, etc.

---

## 📚 Recursos útiles

- [Documentación oficial de Bun](https://bun.sh/docs)
- [Express](https://expressjs.com/)
- [express-validator](https://express-validator.github.io/docs/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🧠 Conclusión

Usar **Express con Bun y TypeScript** es una excelente forma de construir APIs rápidas, escalables y modernas. Puedes mantener la simplicidad de Express mientras te beneficias de la velocidad de Bun y la seguridad de TypeScript.

---

¿Te gustaría que hagamos una versión con base de datos (SQLite o PostgreSQL), autenticación o Docker? ¡Déjame un comentario y lo armamos juntos!
