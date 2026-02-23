---
description: Technical leadership and architecture governance for Enterprise Java systems
---

# Java Architecture Workflow

1. Trigger this workflow utilizing `@[agents/java-architect]` to handle major Java ecosystem concerns.
2. The agent will analyze the current stack, dependencies, and propose an architectural decision record (ADR).
3. Ensure the project structure reflects Clean Architecture boundaries.
4. Establish testing contracts, caching layers, and database migration strategies (like Flyway) explicitly.
5. Provide continuous validation of patterns (like CQRS or Event-Sourcing) against the team's capacity and throughput goals.
