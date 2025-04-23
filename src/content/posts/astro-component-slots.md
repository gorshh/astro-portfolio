---
title: "Understanding Astro Component Slots"
description: "Learn how to use slots in Astro components to build flexible, reusable layouts. A clear guide for developers coming from React or other frameworks."
topic: "Astro"
tags: ["astro", "components", "slots", "frontend", "layout"]
heroImage: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/382714558/original/7d4ac8e718ff11298fe3f87a820251caa385ee82/create-a-fast-and-responsive-website-using-astro-js.png"
author: "jorge"
date: 2025-04-21
---

Slots are one of those features in Astro that feel simple at first… until you realize they’re more powerful than you expected.

If you're coming from React or another component-based framework, the idea of "slots" might seem unfamiliar at first. But once you understand how they work, you’ll probably wonder why other frameworks didn’t make them this clean.

## What is a Slot?

A slot in Astro is a placeholder for child content. Instead of passing children as props (like in React), Astro gives you an actual `<slot />` element that you can place directly in your component.

Here’s a basic example:

```astro
---
// src/components/Card.astro
---
<div class="card">
  <slot />
</div>
```

Now you can use it like this:

```astro
<Card>
  <p>This paragraph will be rendered inside the card.</p>
</Card>
```

Simple, right? But it doesn’t stop there.

## Named Slots

If you want more control over what goes where, Astro supports **named slots**. Think of them like customizable regions inside your component.

```astro
---
// src/components/Layout.astro
---
<header><slot name="header" /></header>
<main><slot /></main>
<footer><slot name="footer" /></footer>
```

And when you use it:

```astro
<Layout>
  <h1 slot="header">My Page</h1>
  <p>This is the main content.</p>
  <small slot="footer">© 2025 Jorshh</small>
</Layout>
```

This is where Astro starts to feel like a design system builder. You can structure components with total clarity.

## Why Use Slots?

If you’re building layouts, templates, or any reusable components, slots are your friend. They force you to think in composition, but without getting stuck in prop-drilling hell.

Some real-world examples where I’ve used slots:
- Blog post layouts (hero + body + author footer)
- Reusable callouts and alert components
- Page wrappers with optional header/footer

## One Caveat

Slots are *content projection*, so they don't re-run scripts inside them. If you're injecting dynamic client-side components (e.g. React components using `client:only`), be mindful of when and where those are mounted.

It’s not a blocker—just something to understand early on.

## Final Thoughts

Astro’s slot system might seem like a small thing, but it’s foundational for building scalable, clean layouts. Once you start using them, they just make sense.

Try rewriting a React layout with Astro slots. You’ll probably end up with fewer lines of code, and a component that’s easier to reason about.


If this helped, share it or drop me a DM. I'm slowly building a set of reusable layout components with slots at the core—more on that soon.
