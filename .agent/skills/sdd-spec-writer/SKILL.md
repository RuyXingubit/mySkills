---
name: "SDD Spec Writer"
description: "Specification writing methodology for Spec-Driven Development (SDD)"
---

# SDD Spec Writer Skill

This skill provides the structure and methodology for Spec-Driven Development (SDD) — creating executable specifications that serve as unambiguous contracts for both human developers and AI agents.

## Core Principle

"If the agent fails, the Spec wasn't good enough" — every spec must be so precise that no additional questions are needed to implement it.

## Instructions

### File Naming Convention

Specs MUST use the `.spec.md` extension (e.g., `create-order.spec.md`). This is required because quality gate hooks (`plan-gate`, `scope-guard`) detect active specs by this filename pattern.

You create specifications that follow this exact structure:

```markdown
# Spec: [Task Title]

## Metadata
- developer_type: agent | human
- estimated_complexity: low | medium | high
- languages: [list]

## Objective
One-paragraph description of what this task achieves.

## Context
Relevant existing code, interfaces, and patterns to follow.

## Implementation Contract
### Inputs (exact types and validation rules)
### Outputs / Return values (exact types)
### Side effects (DB writes, events, logs)

## Files to Create / Modify (exact paths)

## Required Tests (specific test cases with data)
- Test case 1: given X, when Y, then Z
- Test case 2: edge case description
- Test case 3: error handling scenario

## Acceptance Criteria (automatically verifiable)

## Verification Commands
```

### Decision: Agent vs Human

**Agent-appropriate tasks:**
- Application layer (handlers, services, repositories)
- Infrastructure layer (adapters, configurations)
- Repeatable patterns (CRUD, validation, mapping)
- Complexity ≤ 8 hours

**Human-required tasks:**
- Code Review (always human, no exceptions)
- UI/UX with subjective aesthetic criteria
- Undocumented legacy system knowledge
- Architecture decisions not yet documented

### Quality Checklist

Before saving a spec, verify:
- Can a developer start without reading any unreferenced file?
- Are all file paths complete and correct?
- Are acceptance criteria verifiable with automated tests?
- Does the contract define exact types (not "an object" but `OrderDto`)?
- Are there at least 3 test cases with concrete data?
- Can the verification command run without manual arguments?

## Examples

**Good spec excerpt:**
```markdown
### Inputs
- `CreateOrderCommand` with fields: `customerId: string (UUID)`, `items: OrderItemDto[]` (min 1, max 50)
### Files to Create
- src/Application/Orders/CreateOrderHandler.cs
- tests/Application.Tests/Orders/CreateOrderHandlerTests.cs
```

**Bad spec excerpt:**
```markdown
### Inputs
- An order object with customer info and items
### Files to Create
- Somewhere in the orders module
```

*Source: [pm-workspace](https://github.com/gonzalezpazmonica/pm-workspace) — Spec-Driven Development methodology*
