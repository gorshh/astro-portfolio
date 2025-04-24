---
title: "Cómo usar Hooks en React"
description: "Aprende a usar Hooks en React de forma efectiva. Domina useState, useEffect, useContext y más para escribir código limpio y reutilizable."
topic: "React"
tags: ["react", "hooks", "estado"]
heroImage: "https://miro.medium.com/v2/resize:fit:1400/1*-Ijet6kVJqGgul6adezDLQ.png"
author: "jorge"
date: 2024-01-01
---
# Cómo usar Hooks en React  

Desde la llegada de los **Hooks** en React 16.8, manejar el estado y los ciclos de vida en componentes funcionales nunca fue tan simple. Pero con gran poder viene gran responsabilidad 😄. En esta guía vamos a repasar los hooks más importantes y cómo usarlos correctamente para construir componentes más limpios, reutilizables y fáciles de mantener.

---

## ¿Qué son los Hooks?

Los Hooks son funciones que te permiten **"engancharte"** al estado y al ciclo de vida de React desde componentes funcionales. Antes necesitábamos clases para esto, pero con Hooks, podemos hacer lo mismo (y más) usando solo funciones.

---

## Hooks más comunes

### 1. `useState`
Para manejar **estado local** en un componente.

```jsx
import { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

✅ Ideal para valores simples como números, strings, booleanos, etc.

---

### 2. `useEffect`
Para manejar **efectos secundarios** (peticiones, suscripciones, manipulación del DOM, etc).

```jsx
import { useEffect, useState } from 'react';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []); // Se ejecuta solo una vez al montar

  return (
    <ul>
      {usuarios.map(user => <li key={user.id}>{user.nombre}</li>)}
    </ul>
  );
}
```

✅ El array de dependencias `[]` controla cuándo se ejecuta el efecto.

---

### 3. `useContext`
Para acceder a un **contexto React** (como un global state).

```jsx
import { useContext } from 'react';
import { TemaContext } from './TemaProvider';

function BotonTema() {
  const tema = useContext(TemaContext);

  return <button style={{ background: tema.fondo }}>Cambiar tema</button>;
}
```

✅ Evita el "prop drilling" (pasar props innecesarios entre componentes).

---

### 4. `useRef`
Para acceder a **referencias mutables** o al DOM.

```jsx
import { useRef } from 'react';

function InputEnfocado() {
  const inputRef = useRef(null);

  const enfocar = () => inputRef.current.focus();

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={enfocar}>Enfocar</button>
    </>
  );
}
```

✅ También útil para guardar valores que no provocan render.

---

### 5. `useMemo` y `useCallback`
Para **memorizar valores o funciones** y mejorar el rendimiento.

```jsx
const resultadoMemo = useMemo(() => calcularPesado(valor), [valor]);

const funcionMemorizada = useCallback(() => {
  hacerAlgo(complejo);
}, [dependencias]);
```

✅ Solo se recalculan si cambian sus dependencias.

---

## Buenas prácticas

- ❌ No uses hooks dentro de condicionales o bucles.
- ✅ Siempre colócalos al **nivel superior** del componente.
- 📦 Extrae lógica repetida en **custom hooks**.
- 🧪 Usa `React DevTools` para inspeccionar hooks fácilmente.

---

## Custom Hooks: nivel PRO

Puedes crear tus propios hooks para reutilizar lógica compleja.

```jsx
function useContador(inicial = 0) {
  const [valor, setValor] = useState(inicial);
  const incrementar = () => setValor(v => v + 1);
  return { valor, incrementar };
}
```

Y luego usarlo como:

```jsx
function Componente() {
  const { valor, incrementar } = useContador(5);
  return <button onClick={incrementar}>{valor}</button>;
}
```

---

## Conclusión

Los hooks son una de las herramientas más poderosas en React. Te permiten escribir componentes **más concisos y expresivos**. Dominar los hooks es clave para desarrollar apps modernas con React.

> _"Piensa en hooks como piezas de LEGO: simples por separado, pero juntos puedes construir cosas increíbles."_ 🧱

---

## Recursos adicionales

- [Documentación oficial de Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Patterns](https://reactpatterns.com/)
- [useHooks.com](https://usehooks.com)
