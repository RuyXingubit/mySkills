---
name: react-best-practices
description: "React and Next.js performance optimization from Vercel Engineering. Use when building React components, optimizing performance, eliminating waterfalls, reducing bundle size, reviewing code for performance issues, or implementing server/client-side optimizations."
risk: unknown
source: community
date_added: "2026-02-27"
triggers: [ciclo de vida, componentes react, desempenho, design de interface, hooks, interface de usuário, otimização, performance, react, ui, ux]
---
# React Best Practices (Vercel)

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains rules across 8 categories, prioritized by impact.

## Use this skill when

- Building React components with Next.js App Router
- Optimizing performance or eliminating waterfalls
- Reducing bundle size or improving Core Web Vitals
- Reviewing code for performance issues

## Do not use this skill when

- The task is unrelated to React/Next.js
- You need basic React syntax explanations

## Rule Categories by Priority

### 1. Eliminating Waterfalls (CRITICAL)

```tsx
// ❌ Sequential — waterfall
const user = await getUser();
const posts = await getPosts(user.id); // waits for user

// ✅ Parallel — no waterfall
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

**Key rules:**
- Fetch all parallel data with `Promise.all`
- Move data fetching to the closest Server Component
- Avoid client-side fetch when SSR/RSC is available

### 2. Bundle Size Optimization (CRITICAL)

```tsx
// ❌ Imports everything
import _ from 'lodash';

// ✅ Tree-shakeable import
import { debounce } from 'lodash-es';

// ✅ Dynamic import for heavy components
const Chart = dynamic(() => import('./Chart'), { ssr: false });
```

### 3. Server-Side Performance (HIGH)

```tsx
// ✅ Server Component — no client JS
export default async function UserProfile({ id }: { id: string }) {
  const user = await db.user.findUnique({ where: { id } });
  return <div>{user.name}</div>;
}

// ✅ Streaming with Suspense
<Suspense fallback={<Skeleton />}>
  <SlowComponent />
</Suspense>
```

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

```tsx
// ✅ SWR for client-side data
const { data, isLoading } = useSWR('/api/user', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000,
});
```

### 5. Re-render Optimization (MEDIUM)

```tsx
// ✅ Memoize only when profiler shows it helps
const MemoComponent = memo(Component, (prev, next) => 
  prev.id === next.id
);

// ✅ Stable selectors with Zustand
const user = useStore(state => state.user); // not state => ({ user: state.user })
```

### 6. Rendering Performance (MEDIUM)

```tsx
// ✅ Virtualize long lists
import { FixedSizeList as List } from 'react-window';

<List height={600} itemCount={10000} itemSize={35} width={300}>
  {({ index, style }) => <div style={style}>Row {index}</div>}
</List>
```

### 7. Image & Asset Optimization

```tsx
// ✅ Always use Next.js Image
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={800} height={600} priority />
```

### 8. Advanced Patterns

```tsx
// ✅ useOptimistic for instant feedback
const [optimisticLikes, addOptimisticLike] = useOptimistic(likes);

// ✅ Server Actions for mutations
async function updateUser(formData: FormData) {
  'use server';
  await db.user.update({ ... });
  revalidatePath('/profile');
}
```

## Decision Tree

```
Is data needed at render? 
→ Yes → Use Server Component (RSC)
→ No, user-triggered → Use Server Action
→ Real-time/subscription → Client Component + SWR/WebSocket
```
