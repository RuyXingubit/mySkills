---
name: Test-Driven Development (TDD)
description: "Workflow for implementing features or bug fixes by writing tests before implementation code. / Testes e qualidade."
triggers: [qualidade, red green refactor, tdd, testes unitários]
risk: safe
source: v4-migration
date_added: "2026-04-22"
---
# Test-Driven Development Skill

This skill implements the Red-Green-Refactor cycle to ensure code is testable, robust, and fulfills requirements from the start. It focuses on writing failing tests first to drive the design of the solution.

## The TDD Cycle

### 1. Red (Write a Failing Test)
- Understand the requirements and define the expected behavior.
- Use the `SKILL.md` guidance to write a unit or integration test that fails.
- Ensure the failure is meaningful (testing the right thing).

### 2. Green (Make it Pass)
- Write the *minimum* amount of implementation code needed to make the test pass.
- Don't worry about perfection or performance at this stage.
- Focus on fulfilling the test's requirements.

### 3. Refactor (Clean it Up)
- Clean up the code while keeping the tests passing.
- Apply design patterns and best practices.
- Eliminate duplication and improve readability.

## Testing Best Practices
- **Anti-patterns**: Avoid common testing mistakes documented in [Testing Anti-patterns](file:///Users/ruy/Code/mySkills/.agent/skills/test-driven-development/testing-anti-patterns.md).
- **Isolation**: Each test should be independent and not rely on the state of other tests.
- **Meaningful Assertions**: Test behaviors, not just data.

---
*Qualidade não é um acidente, é o resultado de testes que dirigem o design.*
