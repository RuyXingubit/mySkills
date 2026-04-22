---
name: Systematic Debugging
description: "Structured process for addressing bugs, test failures, or unexpected behaviors. / Testes e qualidade."
triggers: [debugging, depuração, logs, resolver bugs]
risk: safe
source: v4-migration
date_added: "2026-04-22"
---
# Systematic Debugging Skill

This skill provides a rigorous methodology for identifying, isolating, and fixing software defects. It moves away from "guess-and-check" towards a scientific approach of hypothesis testing and root cause analysis.

## The Debugging Process

### 1. Reproduction & Isolation
- **Stable Repro**: Create an automated test or simple script that consistently fails.
- **Isolate Environment**: Ensure external factors (data, network, config) are controlled.
- **Find Polluter**: Use tools like `find-polluter.sh` to identify tests that interfere with each other.

### 2. Hypothesis & Tracing
- **Root Cause Tracing**: Use `root-cause-tracing.md` to map the flow of data and state.
- **Defense in Depth**: Identify where the system *should* have caught the error.
- **Hypothesis Testing**: Formulate a theory about the bug and design a test to confirm/refute it.

### 3. Fixing & Verification
- **Targeted Fix**: Address the root cause, not just the symptom.
- **Verification**: Ensure the repro test passes and no regressions are introduced.
- **Regression Testing**: Add the fix to the permanent test suite.

## Core Resources
Supporting technical documents are located in the skill directory:
- [Root Cause Tracing](file:///Users/ruy/Code/mySkills/.agent/skills/systematic-debugging/root-cause-tracing.md): Methodology for tracking data flow.
- [Defense in Depth](file:///Users/ruy/Code/mySkills/.agent/skills/systematic-debugging/defense-in-depth.md): Strategies for building robust error handling.
- [Condition-based Waiting](file:///Users/ruy/Code/mySkills/.agent/skills/systematic-debugging/condition-based-waiting.md): Best practices for debugging async/timing issues.

## Debugging Workflows
- **Under Pressure**: Use the "test-pressure" guides (1, 2, 3) for high-stakes or time-sensitive debugging.
- **Academic Approach**: Use `test-academic.md` for deep structural analysis of complex logic.

---
*Transformando o "não sei por que parou" no "agora sei exatamente por que falhou".*
