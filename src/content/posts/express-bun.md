---
title: "🚀 Express + Bun + TypeScript + express-validator"
description: "Reflexiones sobre desarrollo web moderno"
pubDate: "2025-04-21"
heroImage: "/assets/blog-cover.jpg"
author: "jorge"
url: "mi-primer-blog-post"
date: 2024-01-01
tags:
- astro
- blog
- static site generator
- web development
- tutorial
---


Este proyecto es una plantilla base para crear una aplicación web backend utilizando:

- [Bun](https://bun.sh/) - un runtime ultrarrápido para JavaScript y TypeScript.
- [Express](https://expressjs.com/) - framework web para Node.js (compatible con Bun).
- [TypeScript](https://www.typescriptlang.org/) - tipado estático para JavaScript.
- [express-validator](https://express-validator.github.io/docs/) - validación de entradas HTTP.

---

## 📦 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Bun](https://bun.sh/) – puedes instalarlo con:
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- Git (opcional pero recomendado)

---

## 🛠️ Instalación del Proyecto

1. **Clona el repositorio (o crea uno nuevo)**
   ```bash
   git clone https://github.com/tu-usuario/express-bun-ts-validator.git
   cd express-bun-ts-validator
   ```

2. **Inicializa el proyecto con Bun**
   ```bash
   bun init
   ```

3. **Instala las dependencias**
   ```bash
   bun add express express-validator
   bun add -d typescript @types/node @types/express
   ```

4. **Configura TypeScript**
   Crea un archivo `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "target": "es2020",
       "module": "esnext",
       "moduleResolution": "node",
       "strict": true,
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "skipLibCheck": true,
       "outDir": "dist"
     },
     "include": ["src"]
   }
   ```

---

## 📁 Estructura de Archivos

```bash
📦express-bun-ts-validator
 ┣ 📂src
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜user.routes.ts
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜user.controller.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┗ 📜validate.ts
 ┃ ┣ 📜app.ts
 ┃ ┗ 📜index.ts
 ┣ 📜tsconfig.json
 ┣ 📜.gitignore
 ┣ 📜README.md
```

---

## 🧱 Estructura del Código

### `src/index.ts` - Punto de entrada

```ts
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

### `src/app.ts` - Configuración de la app

```ts
import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

export default app;
```

---

### `src/routes/user.routes.ts`

```ts
import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { validateUser } from '../middlewares/validate';

const router = Router();

router.post('/', validateUser, createUser);

export default router;
```

---

### `src/controllers/user.controller.ts`

```ts
import { Request, Response } from 'express';

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.status(201).json({
    message: 'Usuario creado exitosamente',
    data: { name, email }
  });
};
```

---

### `src/middlewares/validate.ts`

```ts
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUser = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio'),
  body('email')
    .isEmail()
    .withMessage('El correo debe ser válido'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
```

---

## 🧪 Scripts de Desarrollo

Agrega este script a tu `package.json` (Bun usa `"scripts"` como npm):

```json
{
  "scripts": {
    "dev": "bun run tsx src/index.ts",
    "build": "tsc",
    "start": "bun run dist/index.js"
  }
}
```

Para desarrollo:
```bash
bun run dev
```

Para compilar:
```bash
bun run build
```

Para correr compilado:
```bash
bun run start
```

---

## ✅ Prueba la API

Puedes usar herramientas como [Postman](https://www.postman.com/) o `curl`:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Juan", "email": "juan@example.com"}'
```

Respuesta esperada:
```json
{
  "message": "Usuario creado exitosamente",
  "data": {
    "name": "Juan",
    "email": "juan@example.com"
  }
}
```

Si omites algún campo o el email es inválido, obtendrás un error 400 con detalles.

---

## 🧼 Extras Opcionales

- 🔍 Añadir CORS:
  ```bash
  bun add cors
  ```
  ```ts
  import cors from 'cors';
  app.use(cors());
  ```

- 📁 Soporte para `.env`:
  ```bash
  bun add dotenv
  ```
  ```ts
  import dotenv from 'dotenv';
  dotenv.config();
  ```

---

## 📚 Recursos

- [Documentación oficial de Bun](https://bun.sh/docs)
- [Guía de Express con TypeScript](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Validaciones con express-validator](https://express-validator.github.io/docs/)

---

## ✨ Contribuir

¡Las contribuciones son bienvenidas! Puedes hacer un fork, abrir issues o pull requests.

---

## 📄 Licencia

Este proyecto está licenciado bajo la MIT License.