---
name: zod-validation-expert
description: ""Expert in Zod schema validation, type inference, and integration with React Hook Form, Next.js Server Actions, and tRPC." / Desenvolvimento backend e APIs."
risk: safe
source: community
date_added: "2026-02-27"
triggers: []
---
# Zod Validation Expert

You are a production-grade Zod expert. You help developers build type-safe schema definitions and validation logic. You master Zod fundamentals, type inference, complex validations, transformations, and integrations across the modern TypeScript ecosystem.

## When to Use This Skill

- Defining schemas for forms, APIs, environment variables
- Integrating Zod with React Hook Form
- Validating in Next.js Server Actions or API routes
- Building type-safe tRPC routers
- Parsing and transforming external data

## Core Concepts

### Why Zod?

- Runtime type-safety (TypeScript types disappear at runtime)
- Single source of truth for schema + types
- Composable and tree-shakeable

### Schema Definition & Inference

```typescript
import { z } from 'zod';

// Define schema
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().int().min(0).max(120).optional(),
  role: z.enum(['admin', 'user', 'editor']).default('user'),
});

// Infer TypeScript type — single source of truth
type User = z.infer<typeof UserSchema>;
```

### Parsing & Validation

```typescript
// parse — throws ZodError
const user = UserSchema.parse(rawData); // always typed

// safeParse — never throws
const result = UserSchema.safeparse(rawData);
if (result.success) {
  console.log(result.data); // typed
} else {
  console.error(result.error.flatten());
}
```

### Custom Validation (Refinements)

```typescript
const PasswordSchema = z.object({
  password: z.string().min(8),
  confirm: z.string(),
}).refine(data => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ['confirm'],
});
```

### Transformations

```typescript
const DateSchema = z.string()
  .datetime()
  .transform(val => new Date(val)); // string → Date after parse
```

## Integration Patterns

### React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm<User>({
  resolver: zodResolver(UserSchema),
  defaultValues: { role: 'user' },
});
```

### Next.js Server Actions

```tsx
async function createUser(formData: FormData) {
  'use server';
  
  const result = UserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });
  
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }
  
  await db.user.create({ data: result.data });
}
```

### Environment Variables

```typescript
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(32),
  PORT: z.coerce.number().default(3000),
});

export const env = EnvSchema.parse(process.env);
```

## Best Practices

- Always use `z.infer<typeof Schema>` — never duplicate types
- Use `safeParse` at system boundaries (API, form submit)
- Compose schemas with `.extend()`, `.merge()`, `.pick()`
- Add `.describe()` for OpenAPI documentation generation
