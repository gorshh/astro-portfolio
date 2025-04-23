---
title: "Understanding the JavaScript Event Loop (Without Losing Your Mind)"
description: "Ever wondered why your async code doesn’t run when you think it will? Here’s a practical, no-BS explanation of how the JavaScript event loop really works."
topic: "JavaScript"
tags: ["javascript", "event loop", "async", "performance", "callbacks"]
heroImage: "https://miro.medium.com/v2/resize:fit:1011/1*LBemN-DH6ErirX6HzhAGwg.jpeg"
author: "jorge"
date: 2025-04-21
---

Let’s be real. Most devs (myself included at one point) didn’t really understand how the JavaScript event loop works. We just knew: “Hey, this code runs after a timeout” or “Why is this `console.log` happening *before* my `await`?”

So here it is — the **event loop explained without academic fluff**. You’ll understand it, and you’ll actually remember it.

---

## First: JavaScript Is Single-Threaded

One thread. That’s it. JavaScript runs on a single thread, meaning it can do one thing at a time.

So how do we write things like:

```js
setTimeout(() => {
  console.log("Done!");
}, 1000);
```

…without freezing everything for a second?

That’s where the event loop comes in.

---

## The Big Picture (Simplified)

Here’s what’s happening under the hood:

```
[ Call Stack ]
     |
     ↓
[ Web APIs (DOM, Timers, Fetch, etc.) ]
     |
     ↓
[ Callback / Task Queue ] ←— Event Loop pulls from here
```

- **Call Stack**: Where functions are run.
- **Web APIs**: Browser or Node features that run in the background.
- **Callback Queue**: Where finished tasks wait.
- **Event Loop**: The traffic cop that puts callbacks back into the call stack *when it's empty*.

---

## Example Time

```js
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");
```

**Output?**
```
1
3
2
```

Wait what?

Even with `0` delay, `setTimeout` doesn’t run immediately. It gets sent to the Web API zone, waits its turn, then the callback gets put into the queue. The **event loop** waits until the call stack is empty (after `console.log("3")`) to push the `console.log("2")` back in.

---

## And What About Promises?

Promises go into a **different queue**: the **microtask queue**, which gets prioritized *before* regular callbacks.

```js
console.log("A");

Promise.resolve().then(() => {
  console.log("B");
});

console.log("C");
```

**Output?**
```
A
C
B
```

Even though it's async, the `.then()` gets scheduled immediately after the current stack finishes. It doesn't wait like a `setTimeout` does.

---

## Why Does This Matter?

Because if you're not careful, you can accidentally block the thread, create race conditions, or just confuse the heck out of yourself.

Ever had a bug that disappeared when you added a `setTimeout(..., 0)`? That’s an event loop hack.

---

## A Mental Model I Use

Imagine a chef cooking in a tiny kitchen. He can cook one thing at a time:

- Requests come in and are put in a **queue**.
- The chef (event loop) grabs the first **microtask** first, then regular tasks.
- He *never multitasks*. Just one dish at a time.

If one dish takes too long (e.g. while-loop from hell), all the other orders wait. That’s why **long sync tasks are a performance killer**.

---

## What Can You Do With This Knowledge?

- Avoid blocking code on the main thread.
- Understand why `await` doesn’t pause *everything*.
- Know why `setTimeout(..., 0)` doesn’t mean "run now".
- Write better code when dealing with animations, UI rendering, or background tasks.

---

## Final Thought

The event loop isn’t just a weird thing interviewers ask about — it’s a tool you use every time you `await` something or use a `setTimeout`. Understanding it means writing smoother, less buggy async code.

If you’ve ever said “Why the hell is this running out of order?”, now you know why.

---

Still confused? Try writing your own mini examples. Mess around with timeouts, promises, `await`, and see what comes first. That’s how I finally got it.
