---
name: cqrs-implementation
description: "Implement Command Query Responsibility Segregation for scalable architectures. Use when separating read and write models, optimizing query performance, or building event-sourced systems."
risk: unknown
source: community
date_added: "2026-02-27"
---

# CQRS Implementation

Comprehensive guide to implementing CQRS (Command Query Responsibility Segregation) patterns.

## Use this skill when

- Separating read and write concerns
- Scaling reads independently from writes
- Building event-sourced systems
- Optimizing complex query scenarios
- Different read/write data models are needed
- High-performance reporting is required

## Do not use this skill when

- The domain is simple and CRUD is sufficient
- You cannot operate separate read/write models
- Strong immediate consistency is required everywhere

## Instructions

- Identify read/write workloads and consistency needs.
- Define command and query models with clear boundaries.
- Implement read model projections and synchronization.
- Validate performance, recovery, and failure modes.

## Core Concepts

### Commands (Write Side)

```typescript
// Command — intent to change state
interface SubmitOrderCommand {
  orderId: string;
  items: OrderItem[];
  customerId: string;
}

// Command Handler
class SubmitOrderHandler {
  async handle(cmd: SubmitOrderCommand): Promise<void> {
    const order = await this.orderRepo.findById(cmd.orderId);
    order.submit(cmd.items);
    await this.orderRepo.save(order);
    await this.eventBus.publish(order.domainEvents);
  }
}
```

### Queries (Read Side)

```typescript
// Read model — optimized for queries
interface OrderSummaryView {
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
}

// Query Handler
class GetOrderSummaryHandler {
  async handle(orderId: string): Promise<OrderSummaryView> {
    return this.readDb.query(
      'SELECT * FROM order_summaries WHERE order_id = $1',
      [orderId]
    );
  }
}
```

### Projection Building

```typescript
// Project events to read model
class OrderProjection {
  async on(event: OrderSubmitted): Promise<void> {
    await this.readDb.upsert('order_summaries', {
      order_id: event.orderId,
      status: 'submitted',
      submitted_at: event.occurredAt,
    });
  }
}
```

## Synchronization Strategies

| Strategy | Consistency | Complexity |
|----------|-------------|------------|
| Synchronous | Strong | High |
| Async via events | Eventual | Medium |
| Change Data Capture | Near-real-time | Medium |
| Scheduled rebuild | Eventual | Low |

## Related Skills

Works well with: `event-sourcing-architect`, `ddd-tactical-patterns`
