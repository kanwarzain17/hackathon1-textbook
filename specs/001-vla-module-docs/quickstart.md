# Quickstart: Module 4 — Vision-Language-Action (VLA)

**Feature**: `001-vla-module-docs`
**Date**: 2026-01-12

## Goal

Publish Module 4 documentation to the existing Docusaurus book with three chapters:
1. Voice-to-Action
2. Cognitive Planning with LLMs
3. Autonomous Humanoid Capstone

## Where the content lives

- Planning artifacts (this feature):
  - `specs/001-vla-module-docs/`
- Published book docs:
  - `frontend_book/docs/modules/`

## Target documentation structure

Create a new module folder:

```text
frontend_book/docs/modules/module-4-vision-language-action/
├── _category_.json
├── chapter1-voice-to-action.md
├── chapter2-cognitive-planning-llms.md
└── chapter3-autonomous-humanoid-capstone.md
```

## Frontmatter conventions (match existing modules)

Each chapter should include Docusaurus frontmatter similar to:

- `id`: stable identifier
- `title`: human readable
- `sidebar_label`: numbered label
- `sidebar_position`: ordering
- `slug`: URL under `/modules/module-4/...`

## Minimal validation

- The module appears in the sidebar under “modules” with a position after module 3.
- Chapters render and have correct next/previous navigation.
- Each chapter meets the 800–1200 word constraint (excluding code blocks).

## Handoff to task generation

Once `plan.md` is complete, run `/sp.tasks` to produce a dependency-ordered writing checklist for the three chapters.
