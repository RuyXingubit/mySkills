---
name: ddd-tactical-patterns
description: ""Apply DDD tactical patterns in code using entities, value objects, aggregates, repositories, and domain events with explicit invariants." / Boas práticas e padrões."
risk: safe
source: self
tags: "[ddd, tactical, aggregates, value-objects, domain-events]"
date_added: "2026-02-27"
triggers: []
---
# DDD Tactical Patterns

## Use this skill when

- Translating domain rules into code structures.
- Designing aggregate boundaries and invariants.
- Refactoring an anemic model into behavior-rich domain objects.
- Defining repository contracts and domain event boundaries.

## Do not use this skill when

- You are still defining strategic boundaries.
- The task is only API documentation or UI layout.
- Full DDD complexity is not justified.

## Instructions

1. Identify invariants first and design aggregates around them.
2. Model immutable value objects for validated concepts.
3. Keep domain behavior in domain objects, not controllers.
4. Emit domain events for meaningful state transitions.
5. Keep repositories at aggregate root boundaries.

## Core Building Blocks

| Building Block | Description | Key Rule |
|----------------|-------------|----------|
| **Entity** | Has identity, mutable | ID never changes |
| **Value Object** | No identity, immutable | Equality by value |
| **Aggregate** | Transaction boundary | Only root is public |
| **Repository** | Collection abstraction | One per aggregate root |
| **Domain Event** | Fact that happened | Immutable, past tense name |
| **Domain Service** | Stateless behavior | For cross-aggregate logic |

## Example

```typescript
class Order {
  private status: "draft" | "submitted" = "draft";

  submit(itemsCount: number): void {
    if (itemsCount === 0) throw new Error("Order cannot be submitted empty");
    if (this.status !== "draft") throw new Error("Order already submitted");
    this.status = "submitted";
    this.addEvent(new OrderSubmitted(this.id));
  }
}
```

## Aggregate Design Rules

- Keep aggregates small — focus on invariants
- Reference other aggregates by ID only
- Design for eventual consistency between aggregates
- One transaction = one aggregate

## Limitations

- This skill does not define deployment architecture.
- It does not choose databases or transport protocols.
- It should be paired with testing patterns for invariant coverage.
