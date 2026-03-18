---
name: react-state-management
description: "Comprehensive guide to modern React state management patterns, from local component state to global stores and server state synchronization."
risk: unknown
source: community
date_added: "2026-02-27"
---

# React State Management

Comprehensive guide to modern React state management patterns, from local component state to global stores and server state synchronization.

## Use this skill when

- Choosing the right state management solution
- Implementing Zustand, Redux Toolkit, Jotai, or React Query
- Migrating from legacy Redux to modern patterns
- Combining client and server state

## Do not use this skill when

- The task is unrelated to React state
- Simple useState is clearly sufficient

## Core Concepts

### 1. State Categories

| Category | Examples | Best Solution |
|----------|----------|---------------|
| **Local UI** | modal open, input focus | useState |
| **Form** | values, errors, submission | React Hook Form + Zod |
| **Server** | fetched data, cache | React Query / SWR |
| **Global Client** | auth, theme, cart | Zustand |
| **Atomic** | fine-grained subscriptions | Jotai |

### 2. Selection Criteria

```
Do you need this state in >2 components?
→ No → useState / useReducer
→ Yes → Is it server data?
   → Yes → React Query / SWR
   → No → Zustand / Jotai
```

## Patterns

### Zustand (Simplest Global Store)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set(state => ({ items: [...state.items, item] })),
      removeItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),
      total: () => get().items.reduce((sum, item) => sum + item.price, 0),
    }),
    { name: 'cart-storage' }
  )
);

// Usage — subscribe to only what you need (performance!)
const items = useCartStore(state => state.items);
const addItem = useCartStore(state => state.addItem);
```

### Redux Toolkit (Complex Domain Logic)

```typescript
const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [], status: 'idle' } as OrdersState,
  reducers: {
    orderAdded: (state, action: PayloadAction<Order>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => { state.status = 'loading'; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      });
  },
});
```

### React Query (Server State)

```typescript
// Fetching
const { data: users, isLoading } = useQuery({
  queryKey: ['users', filters],
  queryFn: () => api.getUsers(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutations with optimistic updates
const updateUser = useMutation({
  mutationFn: api.updateUser,
  onMutate: async (updated) => {
    await queryClient.cancelQueries({ queryKey: ['users'] });
    const previous = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], old =>
      old.map(u => u.id === updated.id ? { ...u, ...updated } : u)
    );
    return { previous }; // rollback context
  },
  onError: (err, _, context) => {
    queryClient.setQueryData(['users'], context?.previous);
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
});
```

### Jotai (Atomic State)

```typescript
const themeAtom = atom<'light' | 'dark'>('light');
const derivedAtom = atom(get => get(themeAtom) === 'dark' ? '#000' : '#fff');

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  const bgColor = useAtomValue(derivedAtom);
  return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>Toggle</button>;
}
```

## Best Practices

- **Don't** put server data in global stores — use React Query
- **Do** keep Zustand stores focused (one concern per store)
- **Don't** select the entire store object (`state => state`) — causes re-renders
- **Do** derive computed values outside the component when possible
