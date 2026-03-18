---
name: modern-javascript-patterns
description: "Master ES6+ features including async/await, destructuring, spread operators, arrow functions, promises, modules, iterators, generators, and functional programming patterns for writing clean, efficient code."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Modern JavaScript Patterns

Comprehensive guide for mastering modern JavaScript (ES6+) features, functional programming patterns, and best practices for writing clean, maintainable, and performant code.

## Use this skill when

- Refactoring legacy JavaScript to modern syntax
- Implementing functional programming patterns
- Optimizing JavaScript performance
- Writing maintainable and readable code
- Working with asynchronous operations
- Building modern web applications
- Migrating from callbacks to Promises/async-await
- Implementing data transformation pipelines

## Do not use this skill when

- The task is unrelated to modern javascript patterns
- You need a different domain or tool outside this scope

## Instructions

- Clarify goals, constraints, and required inputs.
- Apply relevant best practices and validate outcomes.
- Provide actionable steps and verification.

## Core Patterns

### 1. Async/Await

```javascript
// ✅ Modern async patterns
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

// Parallel execution
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);

// Error handling
const result = await fetchData(url).catch(err => ({ error: err.message }));
```

### 2. Destructuring & Spread

```javascript
// Object destructuring with defaults
const { name = 'Anonymous', role = 'user', ...rest } = user;

// Array destructuring
const [first, second, ...remaining] = items;

// Function parameters
const greet = ({ name, greeting = 'Hello' }) => `${greeting}, ${name}!`;
```

### 3. Functional Patterns

```javascript
// Immutable transformations
const updated = items.map(item => item.id === id ? { ...item, done: true } : item);
const active = items.filter(item => !item.done);
const total = items.reduce((sum, item) => sum + item.price, 0);

// Composition
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const process = pipe(validate, normalize, format);
```

### 4. Modules (ESM)

```javascript
// Named exports
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Dynamic import (lazy loading)
const module = await import('./heavy-module.js');
```

### 5. Generators & Iterators

```javascript
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}

// Paginated data fetching
async function* paginate(fetchPage) {
  let page = 1;
  while (true) {
    const data = await fetchPage(page++);
    if (!data.length) break;
    yield* data;
  }
}
```

### 6. Proxy & Reflect

```javascript
const handler = {
  get(target, key) {
    return key in target ? target[key] : `Property ${key} not found`;
  },
  set(target, key, value) {
    if (typeof value !== 'string') throw new TypeError('Value must be string');
    return Reflect.set(target, key, value);
  }
};
```

## Anti-Patterns

| ❌ Avoid | ✅ Use Instead |
|---------|--------------|
| `var` | `const` / `let` |
| Callback hell | async/await |
| `arguments` object | Rest parameters |
| Mutating arrays | map/filter/spread |
| `eval()` | Template literals |
