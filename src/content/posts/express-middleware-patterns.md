---
title: "Middleware Patterns in Express.js: Clean APIs Without the Mess"
description: "Middleware in Express can be powerful... or a complete mess. In this post, I break down practical patterns I've used to keep things clean, modular, and testable."
topic: "ExpressJs"
tags: ["express", "node", "middleware", "api design", "backend"]
heroImage: "https://miro.medium.com/v2/resize:fit:1400/1*23BkSGzcN3cBxvTuf0zFfg.png"
author: "jorge"
date: 2025-04-21
---

Express.js is probably the most "yeah just works" tool in the Node.js ecosystem. But the moment your API grows a little, and your routes go from three to thirty, the whole thing starts to feel like wet spaghetti.

So today I want to talk about middleware—how to actually **use it properly**, and not just slap `next()` everywhere until your stack trace is unreadable.

## What’s Middleware, Actually?

Middleware in Express is just a function that gets `req`, `res`, and `next`. It lives in the middle of the request and the response, and it’s what makes Express flexible... and dangerous if misused.

```js
app.use((req, res, next) => {
  console.log('Request received');
  next();
});
```

Cool, but let’s be honest: most real middleware logic ends up tangled, especially when you mix auth, validation, and business logic in the same place.

Let’s fix that.

---

## Pattern 1: Composable Middleware Chains

Split concerns early. Don’t throw auth, rate limiting, and validation in the same file. Make small, reusable middlewares and compose them.

```js
import validate from './middleware/validate.js';
import authenticate from './middleware/authenticate.js';

app.post('/api/posts', authenticate, validate(postSchema), createPostHandler);
```

This is clean, declarative, and scalable. You can read it top-down and know exactly what’s happening.

---

## Pattern 2: Middleware Factories

Instead of hardcoding values in your middleware, use factories to generate them.

```js
// middleware/requireRole.js
export function requireRole(role) {
  return function (req, res, next) {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
```

Now in your route:

```js
import { requireRole } from './middleware/requireRole.js';

app.delete('/api/posts/:id', authenticate, requireRole('admin'), deletePostHandler);
```

This pattern scales *way* better than hardcoding logic inside each route.

---

## Pattern 3: Error-First Middleware

Always wrap your middlewares with error handlers. This is especially useful when you’re dealing with async/await.

Here’s a small wrapper you’ll want to keep forever:

```js
export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

Use it like this:

```js
app.get('/api/posts', asyncHandler(async (req, res) => {
  const posts = await db.getPosts();
  res.json(posts);
}));
```

You avoid `try/catch` hell and get proper error bubbling with one line.

---

## Pattern 4: Middleware as Layered Architecture

You can even think of middleware as architectural layers. Here’s a simple diagram I use in my head:

```
[ Incoming Request ]
       ↓
[ Logging ]
       ↓
[ Auth ]
       ↓
[ Validation ]
       ↓
[ Business Logic ]
       ↓
[ Response ]
```

Each middleware is a checkpoint. If something fails, we short-circuit early and don’t keep going.

---

## A Word About Overdoing It

Sometimes developers go middleware-crazy. You don’t need 15 tiny middlewares for something that could be one clean function. Keep balance.

When in doubt:
- If it’s **reused**, middleware.
- If it’s **specific to one route**, keep it inline.

---

## Bonus: Middleware You Actually Want to Reuse

Here’s a list of reusable middlewares I’ve personally kept around in projects:

- `authenticate` → Verifies and attaches `req.user`
- `requireRole(role)` → Guards by role
- `validate(schema)` → Uses Zod or Joi for input validation
- `logRequest()` → Logs method and URL
- `rateLimit()` → Basic IP rate limiter
- `wrapAsync()` → Handles async errors

Most of them are under 20 lines and live in `src/middleware`.

---

## Wrapping Up

Express middleware is where simplicity and chaos meet. But with some discipline, you can keep it elegant and actually enjoyable to write.

The moment you treat middleware like **pipelines of logic**, everything becomes clearer: smaller pieces, layered flow, and fewer bugs that come from things firing out of order.

Start small. Wrap your async. Compose your flow. It works.

---

Let me know if you’ve found your own patterns, or if you’ve turned away from Express completely. Personally, I still think Express + Bun or Astro backends still have a place when you want something minimal and clean.
