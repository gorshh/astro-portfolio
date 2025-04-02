https://codepen.io/aybukeceylan/pen/yLdQXmP
https://codepen.io/mobalti/pen/poYmvqj
https://codepen.io/giancarlosgza/pen/MWzxgXV

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


```
/* Small (S): ≤ 480px */
@media (max-width: 480px) {
  .text-responsive {
    font-size: 14px;
  }
}

/* Medium (M): ≤ 768px */
@media (max-width: 768px) {
  .text-responsive {
    font-size: 15px;
  }
}

/* Large (L): ≤ 1024px */
@media (max-width: 1024px) {
  .text-responsive {
    font-size: 16px;
  }
}

/* Extra Large (XL): ≤ 1366px */
@media (max-width: 1366px) {
  .text-responsive {
    font-size: 18px;
  }
}
```