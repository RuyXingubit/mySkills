---
name: figma-dev-mode
description: Setup and utilization of the Figma Dev Mode MCP to inspect components, layouts, and styles directly from Figma design files.
allowed-tools: Read, Write, Edit, Glob, run_command
---

# Figma Dev Mode MCP

> Integrate UI design precisely measuring and extracting information directly from Figma directly through the Dev Mode MCP.

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the request!** If you just need to query nodes, you don't need to read setup.

---

## 📑 Content Map

| Context | Action |
|---------|--------|
| Project has no `.mcp.json` | Create `.mcp.json` with Figma MCP config |
| Analyzing UI/UX | Use MCP to inspect Figma Node IDs |
| Translating to Code | Extract CSS/Tailwind properties from Figma |

---

## 🔌 Setup Config

To enable the Figma MCP into the project, the following `.mcp.json` block must be present in the user's project root:

```json
{
  "mcpServers": {
    "Figma Dev Mode MCP": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

> **Requirements:** The user MUST have the Figma Desktop App running locally with Dev Mode enabled for the MCP to work.

---

## 🔗 Related Skills

| Need | Skill |
|------|-------|
| Frontend implementation | `@[skills/senior-frontend]` |
| Design Systems | `@[skills/ui-design-system]` |
| UI/UX Best practices | `@[skills/ui-ux-pro-max]` |

---

## ✅ Integration Checklist

Before implementing a design from Figma:

- [ ] **Figma Desktop is running?** (Remind the user if MCP connection fails)
- [ ] **Figma Node URL/ID provided?** (Ask the user for the specific Figma frame link)
- [ ] **Selected the correct framework?** (Tailwind, Vanilla CSS, React Native)
- [ ] **Extracted exact tokens?** (Colors, border-radii, spacing)

---

## ❌ Anti-Patterns

**DON'T:**
- Guess dimensions and colors when the Figma link is provided.
- Fail silently if the MCP connection drops (tell the user to open Figma).
- Extract hardcoded colors without checking if they belong to a Design System's token.

**DO:**
- Use the MCP to precisely query the layout properties.
- Map Figma styles to tailwind config variables when possible.
- Remind the user to open the specific project in Figma Desktop.
