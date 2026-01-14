# Research: Module 4 — Vision-Language-Action (VLA)

**Feature**: `001-vla-module-docs`
**Date**: 2026-01-12

## Purpose

Resolve technical-context unknowns needed to plan the documentation deliverables for Module 4 (Voice → Planning → Capstone), and ensure the plan aligns with repository constraints (Docusaurus book) and the constitution.

> Note: This repository’s constitution emphasizes reproducibility and accurate technical writing. This research therefore focuses on *what we must verify in-repo* (existing docs patterns, naming conventions) and *what should be treated as configurable/abstracted* in the module text.

## Findings

### 1) Documentation placement and navigation in this repo

**Decision**: Place Module 4 docs under `frontend_book/docs/modules/module-4-vision-language-action/` with a `_category_.json` and three chapter files.

**Rationale**:
- Existing modules follow `frontend_book/docs/modules/<module-folder>/`.
- Each module has `_category_.json` with `label` and `position`.
- Chapter docs include Docusaurus frontmatter with `id`, `title`, `sidebar_label`, `sidebar_position`, and `slug`.

**Alternatives considered**:
- Put content under `frontend_book/docs/module-4/` (rejected: does not match current module layout).
- Put only spec artifacts under `specs/` (rejected: spec artifacts are for planning; published docs live under `frontend_book/docs`).

**In-repo evidence**:
- Module folder examples: `frontend_book/docs/modules/module-3-ai-robot-brain/*`.
- Category metadata examples: `frontend_book/docs/modules/module-2-digital-twin/_category_.json`.
- Chapter frontmatter example: `frontend_book/docs/modules/module-2-digital-twin/gazebo-physics.md`.

### 2) Required chapter file naming vs repo conventions

**Decision**: Use the user-requested filenames:
- `chapter1-voice-to-action.md`
- `chapter2-cognitive-planning-llms.md`
- `chapter3-autonomous-humanoid-capstone.md`

…and follow existing modules’ frontmatter conventions for sidebar ordering and slugs.

**Rationale**:
- User explicitly specified these filenames.
- Docusaurus does not require filename = id; we can set frontmatter `id` and `slug` explicitly while keeping filenames stable.

**Alternatives considered**:
- Use shorter filenames like `voice-to-action.md` (rejected: conflicts with explicit user requirement).

### 3) Voice-to-Action pipeline level of specificity

**Decision**: In the module text, describe a pipeline in *conceptual blocks* (audio capture → transcription → intent extraction → validation/confirmation → action dispatch) and keep provider-specific steps as examples, not requirements.

**Rationale**:
- The spec’s non-goals explicitly avoid “full runnable project” and hardware lock-in.
- The constitution requires reproducibility, but the docs here are educational. We should avoid implying that readers must have a paid API key or a specific vendor to understand the pipeline.

**Alternatives considered**:
- Provide a fully provider-specific walkthrough (rejected: reduces portability and may violate “standalone learning” assumption).

### 4) LLM-based planning representation (for teaching + later implementation)

**Decision**: Represent plans as a bounded, typed “action sequence” with:
- action name
- required inputs / preconditions
- expected outputs / postconditions
- failure modes / recovery

**Rationale**:
- Keeps planning teachable and testable.
- Aligns with the capstone need to show re-planning after observations.

**Alternatives considered**:
- Free-form natural language plans (rejected: hard to validate and ambiguous).

### 5) Capstone workflow structure

**Decision**: Standardize the capstone as an end-to-end loop:
1. Hear command
2. Transcribe
3. Extract intent + entities
4. Generate plan (with checks)
5. Navigate to goal
6. Perceive target object
7. Manipulate (grasp/hand-over)
8. Verify success + return
9. Recover / re-plan on failure

**Rationale**:
- Matches the feature spec success criteria and acceptance scenarios.
- Provides a single narrative thread for the three chapters.

**Alternatives considered**:
- Multiple mini-capstones (rejected: scope creep; harder to keep within chapter word counts).

## Open Items

None required for planning. Any provider-specific details (speech models, LLM providers) should be framed as examples and clearly labeled as configurable.
