---
name: Artifacts Builder
description: Advanced suite for building complex, single-file React/Tailwind/shadcn artifacts.
---

# Artifacts Builder Skill

This skill is designed for creating high-end, multi-component HTML artifacts that run within a single file. It leverages modern web technologies to build enterprise-grade interactive demos and dashboards.

## Tech Stack
- **Framework**: React 18 + TypeScript.
- **Styling**: Tailwind CSS + shadcn/ui (40+ components included).
- **Bundling**: Parcel + html-inline to create a self-contained `.html` file.

## Workflows

### 1. Project Initialization
Initialize a new project environment with all dependencies and shadcn components pre-configured.
```bash
bash .agent/skills/artifacts-builder/scripts/init-artifact.sh <project-name>
```

### 2. Development
Develop the application using React and shadcn components. Follow best practices to avoid "AI slop" (avoiding excessive centered layouts and default purple gradients).

### 3. Bundling
Compile the entire project into a single, portable HTML file.
```bash
bash .agent/skills/artifacts-builder/scripts/bundle-artifact.sh
```

## Guidelines
- **Visual Excellence**: Focus on premium UI/UX. Use custom color palettes and sophisticated typography.
- **Self-Contained**: The final output must be a single `bundle.html` that the user can open directly.
- **Component Access**: Refer to `ui.shadcn.com` for component documentation.

---
*Construindo experiências interativas complexas em arquivos únicos e portáteis.*
