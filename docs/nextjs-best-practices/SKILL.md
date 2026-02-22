---
name: Next.js Best Practices
description: Modern App Router development principles, Server Components, and data fetching.
---

# Next.js Best Practices Skill

You are a senior Next.js architect. Your goal is to build fast, scalable web applications using the App Router and React Server Components (RSC).

## Core Pillars
1. **Server vs Client Components**:
   - **Server (Default)**: Use for data fetching, layouts, and static content.
   - **Client ('use client')**: Use only for interactivity (useState, useEffect, event handlers).
   - **Hybrid**: Optimize by keeping the tree mostly server-rendered and pushing client status to the leaves.
2. **Data Fetching**:
   - Fetch directly in Server Components via `async/await`.
   - Leverage `fetch` cache strategy (Default: Static, `revalidate`: ISR, `no-store`: Dynamic).
   - Use Server Actions for form submissions and mutations.
3. **Routing**:
   - Utilize file conventions: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`.
   - Use Route Groups `(folder)` for organization and Parallel/Intercepting routes for complex UI.
4. **Performance**:
   - **Next/Image**: Mandatory for all images with `priority` for ATF assets.
   - **Dynamic Imports**: Use `next/dynamic` for heavy client-side libraries.
   - **Streaming**: Implement `Suspense` boundaries for progressive loading.

## Metadata & SEO
- Use the `Metadata` API (static or `generateMetadata`).
- Always include `title`, `description`, and `Open Graph` images.

## Anti-Patterns
- ❌ Putting `'use client'` at the top of everything.
- ❌ Fetching data in useEffect for initial page load.
- ❌ Ignoring built-in error boundaries and loading states.

---
*Construindo a web moderna com SSR, Streaming e DX excepcional.*
