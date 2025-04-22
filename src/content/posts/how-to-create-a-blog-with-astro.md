---
title: "How to Create a Blog with Astro"
author: jorge
heroImage: "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F4f3c8986d48b47d6845bebfc8d0c0610"
date: 2024-01-01
tags:
- astro
- blog
- static site generator
- web development
- tutorial
topic: "Frontend/Astro"

---

Astro is a modern static site generator that makes building fast and optimized websites easy. In this guide, we'll walk through the steps to create a blog using Astro.

## Prerequisites
- Node.js installed on your machine
- Basic knowledge of JavaScript and web development

## Step 1: Create a New Astro Project
Run the following command to create a new Astro project:
```bash
npm create astro@latest
```
Follow the prompts to set up your project. Choose a blog template if available, or start with a basic template.

## Step 2: Install Dependencies
Navigate to your project directory and install the dependencies:
```bash
cd your-project-name
npm install
```

## Step 3: Set Up Blog Content
Create a `src/content` directory to store your blog posts. Use Markdown files (`.md`) for each post. For example:
```plaintext
src/content/posts/my-first-post.md
```

### Example Markdown File
```markdown
---
title: "My First Blog Post"
date: "2023-10-01"
description: "An introduction to my new blog."
---
Welcome to my blog! This is my first post using Astro.
```

## Step 4: Create a Blog Layout
In the `src/layouts` directory, create a layout file for your blog posts, e.g., `BlogLayout.astro`:
```astro
---
export const Layout = ({ children, frontmatter }) => (
  <article>
    <h1>{frontmatter.title}</h1>
    <p>{frontmatter.date}</p>
    <div>{children}</div>
  </article>
);
---
```

## Step 5: Display Blog Posts
Create a page to list all blog posts. For example, in `src/pages/blog.astro`:
```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
---
<h1>Blog</h1>
<ul>
  {posts.map(post => (
    <li>
      <a href={`/posts/${post.slug}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

## Step 6: Run Your Blog Locally
Start the development server:
```bash
npm run dev
```
Visit `http://localhost:3000` to see your blog in action.

## Step 7: Deploy Your Blog
Astro supports deployment to platforms like Vercel, Netlify, and GitHub Pages. Build your site with:
```bash
npm run build
```
Then follow the deployment instructions for your chosen platform.

## Conclusion
You've successfully created a blog using Astro! Customize it further by adding styles, components, and features to make it your own.

For more details, visit the [Astro documentation](https://docs.astro.build).