---
description: Spec-Driven Development format. Create a clear spec contract for a task.
---

# /sdd-spec Workflow

Use this workflow to guide the AI in generating a Spec-Driven Development (`.spec.md`) specification.

1. **Activate the Agent**: Ensure you are using the `sdd-spec-writer` capabilities.
2. **Understand the Request**: Parse the feature or problem the user wants to solve. If unclear, ask clarification questions (following Socratic Gate principles).
3. **Generate the Spec**: Using the template from `.agent/skills/sdd-spec-writer/SKILL.md`, generate a new `.spec.md` file (e.g., `feature-name.spec.md`).
4. **Present the Spec**: Display the content of the `.spec.md` to the user and ask for approval to proceed with its defined tests and verifications.
