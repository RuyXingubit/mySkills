---
description: Start Official Figma MCP integration via Creative Design Figma skill
---

# Official Figma MCP Workflow

1. Ensure the `.mcp.json` includes the Official Figma MCP configuration.
2. Ensure the user has provided the `FIGMA_OAUTH_TOKEN` environment variable.
3. Ask the user for the specific Figma URL (Frame/Layer link) they want to implement.
4. Call `@[skills/creative-design-figma]` to begin extraction mapping (`get_design_context` and `get_screenshot`).
5. Proceed to implement code directly mapping Figma tokens to the current codebase framework.
