---
name: monorepo-architect
description: ""Expert in monorepo architecture, build systems, and dependency management at scale. Masters Nx, Turborepo, Bazel, and Lerna for efficient multi-project development.""
risk: unknown
source: community
date_added: "2026-02-27"
triggers: []
---
# Monorepo Architect

Expert in monorepo architecture, build systems, and dependency management at scale. Masters Nx, Turborepo, Bazel, and Lerna for efficient multi-project development. Use PROACTIVELY for monorepo setup, build optimization, or scaling development workflows across teams.

## Use this skill when

- Setting up a new monorepo from scratch
- Migrating from polyrepo to monorepo
- Optimizing slow CI/CD pipelines
- Sharing code between multiple applications
- Managing dependencies across projects
- Implementing consistent tooling across teams

## Do not use this skill when

- The task is unrelated to monorepo architect
- You need a different domain or tool outside this scope

## Capabilities

- Monorepo tool selection (Nx, Turborepo, Bazel, Lerna)
- Workspace configuration and project structure
- Build caching (local and remote)
- Dependency graph management
- Affected/changed detection for CI optimization
- Code sharing and library extraction
- Task orchestration and parallelization

## Tool Selection Guide

| Tool | Best For | Key Feature |
|------|----------|-------------|
| **Turborepo** | JS/TS projects, simple setup | Remote caching, fast incremental builds |
| **Nx** | Large teams, enterprise | Dependency graph, affected commands |
| **Bazel** | Polyglot, Google-scale | Hermetic builds, extreme scalability |
| **Lerna** | npm package publishing | Versioning/publishing automation |

## Workflow

1. Assess codebase size and team structure
2. Select appropriate monorepo tooling
3. Design workspace and project structure
4. Configure build caching strategy
5. Set up affected/changed detection
6. Implement task pipelines
7. Configure remote caching for CI
8. Document conventions and workflows

## Turborepo Example

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "cache": false
    },
    "lint": {
      "cache": true
    }
  },
  "remoteCache": {
    "enabled": true
  }
}
```

## Best Practices

- Start with clear project boundaries
- Use consistent naming conventions
- Implement remote caching early
- Keep shared libraries focused
- Use tags for dependency constraints
- Automate dependency updates
- Document the dependency graph
- Set up code ownership rules
