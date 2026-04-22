---
name: UI Design System
description: ""Toolkit for creating and maintaining scalable design systems, design tokens, and visual consistency.""
triggers: [design, design de interface, espaçamento, experiência do usuário, interface de usuário, sistema de design, tipografia, ui, ux]
risk: safe
source: v4-migration
date_added: "2026-04-22"
---
# UI Design System Skill

This skill provides a professional toolkit for Senior UI Designers and Developers focused on creating and maintaining scalable design systems. It facilitates visual consistency and streamlined design-to-development handoffs.

## Core Capabilities

### 1. Design Token Generation
- **Automated Tokens**: Generate complete sets of design tokens (colors, typography, spacing).
- **Brand Alignment**: Create color palettes and scales based on brand colors.
- **Formats**: Support for JSON, CSS, and SCSS exports.

### 2. Design System Architecture
- **Component Consistency**: Guidance on building modular and reusable component libraries.
- **Grids & Spacing**: Implements standard 8pt spacing grid systems.
- **Typography Scales**: Generates modular typography scales for responsive design.

### 3. Handoff & Accessibility
- **Documentation**: Simplified developer handoff documentation.
- **Compliance**: Accessibility compliance checks and guidelines.
- **Responsive Systems**: Token-based responsive breakpoints and layout calculations.

## Tools & Scripts

### Design Token Generator
- **Location**: `.agent/skills/ui-design-system/scripts/design_token_generator.py`
- **Usage**: `python scripts/design_token_generator.py [brand_color] [style] [format]`
- **Styles**: `modern`, `classic`, `playful`.
- **Formats**: `json`, `css`, `scss`.

## Usage Guidelines

### When to Invoke
- Starting a new project that requires a consistent visual identity.
- Refactoring an existing UI to use design tokens.
- Defining typography, color scales, or grid systems.

### Best Practices
- **Consistency**: Use tokens for everything—never use hardcoded hex values or spacing.
- **Responsiveness**: Define breakpoints as tokens early in the design process.
- **Accessibility**: Test color combinations for contrast ratios during palette generation.

---
*Criando sistemas visuais consistentes e escaláveis que unem design e desenvolvimento.*
