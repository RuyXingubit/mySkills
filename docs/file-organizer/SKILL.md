---
name: File Organizer
description: Intelligently organizes files and folders, finds duplicates, and suggests logical structures.
---

# File Organizer Skill

This skill provides a systematic approach for cleaning up messy directories, organizing downloads, and restructuring projects. It focuses on maintaining context and reducing clutter through smart analysis and automated actions.

## Core Capabilities

### 1. Analysis & Grouping
- **Current State Overview**: Review folders to understand content, sizes, and file type distributions.
- **Pattern Matching**: Group files by type (documents, images, videos), purpose (work, personal, project), or date.
- **Tools**: Use standard shell commands (`ls`, `find`, `du`) to analyze directories.

### 2. Duplicate Management
- **Identification**: Find exact duplicates by hash or similar names/sizes.
- **Resolution**: Recommend which version to keep (usually newest) and ask for confirmation before deletion.

### 3. Structural Organization
- **Planning**: Propose a new folder tree before making changes.
- **Execution**: Automate moving and renaming files following approved patterns (e.g., `YYYY-MM-DD - Description.ext`).
- **Best Practices**: Use descriptive names, avoid spaces, and implement archiving for old projects.

## Workflows

### The Cleanup Cycle
1. **Analyze**: Run diagnostic commands to see what's in the target folder.
2. **Propose**: Generate a Markdown plan with the new proposed structure and a list of changes.
3. **Approve**: Wait for user confirmation.
4. **Execute**: Create new directories and move files systematically.
5. **Summarize**: Provide a summary of reclaimed space and new structure.

## Command Reference
- **List Size**: `du -sh * | sort -rh`
- **Count Types**: `find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn`
- **Find Hash Dups**: `find . -type f -exec md5 {} \; | sort | uniq -d`

---
*Organizando o caos digital para focar no que realmente importa.*
