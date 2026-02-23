---
description: Clean and organize project memory files with implementation synchronization and pattern updates
---

# 🧹 Memory Spring Cleaning

> A systematic workflow to clean, synchronize, and organize project documentation, specific agent memories (like `CLAUDE.md` or `.cursorrules`), and current implementation patterns.

## 🎯 Objective
Run a comprehensive analysis to identify drift between what is documented (rules, instructions) and what is actually implemented in the codebase.

## 📋 Execution Framework

Follow these steps sequentially:

1. **Memory File Discovery**
   - Locate all `CLAUDE.md`, `rules` or memory-related documentation files.
   - Assess hierarchy and organization; identify redundant content.

2. **Implementation Analysis**
   - Compare documented patterns with actual code.
   - Identify implementation drift (e.g. docs say "Redux" but code uses "Zustand").
   - Assess accuracy gaps.

3. **Pattern Validation**
   - Verify documented conventions.
   - Validate code examples and dependency accuracy.
   - Assess technology stack alignment.

4. **Content Optimization**
   - Remove outdated information.
   - Consolidate duplicate content.
   - Improve organization structure and enhance clarity.

5. **Synchronization Updates**
   - Update development commands (e.g., in `README.md` or `package.json`).
   - Sync architectural patterns.
   - Validate workflows.

6. **Quality Assurance & Verification**
   - Ensure consistency across files.
   - Validate markdown formatting and link integrity.
   - Provide a final health score for the project's documentation.

---

> **Note to AI Agent executing this workflow:**
> Perform the checks using tools like `Glob`, `Grep`, `Read` and `Bash`.
> Output a summary list of the cleaned/synchronized files along with specific maintenance recommendations for the user.
