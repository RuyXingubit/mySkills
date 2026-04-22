---
name: creative-design-figma
description: "Use the Official Figma MCP server to fetch design context, screenshots, variables, and assets from Figma via OAuth token, and to translate Figma nodes into production code. / Desenvolvimento backend e APIs."
allowed-tools: Read, Write, Edit, Glob, run_command
triggers: [design, experiência do usuário, ui, ux]
risk: safe
source: v4-migration
date_added: "2026-04-22"
---
# 🎨 Creative Design Figma

> Integrate the Official Figma MCP Server to extract pixel-perfect details, colors, and design context directly via the cloud.
> Note: This relies on the Remote Figma MCP (`https://mcp.figma.com/mcp`), NOT the local Dev Mode server.

## 🎯 Selective Reading Rule

**Read ONLY files relevant to the request!** If you just need prompt patterns, you don't need to read the setup.

---

## 📑 Content Map

| Context | Action |
|---------|--------|
| Project has no `.mcp.json` | Create `.mcp.json` with the Figma Cloud MCP |
| Generating Code | Follow the Required Flow for extracting `get_design_context` |
| Extracting Tokens | Execute `get_variable_defs` for colors and spacing |

---

## 🔌 Setup Config

To enable the Official Figma MCP, the following `.mcp.json` block must be present in the user's project root (or inside their global Claude config).

**⚠️ REQUIREMENT:** The user MUST provide `FIGMA_OAUTH_TOKEN`.

```json
{
  "mcpServers": {
    "Figma Official MCP": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server"],
      "env": {
        "FIGMA_OAUTH_TOKEN": "<USER_MUST_PROVIDE_THIS>"
      }
    }
  }
}
```

> **Reminder:** Tell the user to add their Personal Access Token if connection fails. This is a Cloud API.

---

## 🔗 Related Skills

| Need | Skill |
|------|-------|
| Frontend implementation | `@[skills/senior-frontend]` |
| Visual Design tokens | `@[skills/theme-factory]` |

---

## ✅ Integration Workflow (Required)

When transforming a Figma design into code via this skill, perform these steps in order:

1. **`get_design_context`**: Run this first using the Figma Frame/Layer link to get structured design data.
2. **`get_metadata` (Optional)**: If the node is too large and the context truncates, fetch the metadata outline first, then target specific child nodes.
3. **`get_screenshot`**: Request a screenshot of the node to have a visual reference of the variant.
4. **Implement**: Start the design-to-code translation. Ensure you map Figma tokens to the project's Tailwind config or CSS custom properties.

---

## ❌ Anti-Patterns

**DON'T:**
- Use placeholders for images when the MCP returns an asset download link. Use the provided asset source.
- Pull new external icon libraries (like Lucide or FontAwesome) if the designer specifically provided custom SVGs in the Figma payload.

**DO:**
- Prompt the user for the Figma URL (copy link to frame).
- Request the `FIGMA_OAUTH_TOKEN` if you see authentication errors.
- Extract styling strictly reproducing the visual screenshot.
