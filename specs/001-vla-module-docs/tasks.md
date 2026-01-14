# Tasks: Module 4 — Vision-Language-Action (VLA)

**Input**: Design documents from `specs/001-vla-module-docs/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), plus `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Not requested in the feature specification. Use manual validation steps (word count + Docusaurus render).

**Organization**: Tasks are grouped by user story to enable independent delivery and validation.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the documentation skeleton for Module 4 in the existing Docusaurus site.

- [x] T001 Create module folder `frontend_book/docs/modules/module-4-vision-language-action/`
- [x] T002 Create category metadata `frontend_book/docs/modules/module-4-vision-language-action/_category_.json` (label + sidebar position after module 3)
- [x] T003 [P] Create placeholder `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` with frontmatter (id/title/sidebar/slug)
- [x] T004 [P] Create placeholder `frontend_book/docs/modules/module-4-vision-language-action/chapter2-cognitive-planning-llms.md` with frontmatter (id/title/sidebar/slug)
- [x] T005 [P] Create placeholder `frontend_book/docs/modules/module-4-vision-language-action/chapter3-autonomous-humanoid-capstone.md` with frontmatter (id/title/sidebar/slug)

**Checkpoint**: Module 4 appears in the docs tree with three empty chapters.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared module-wide conventions so chapters stay consistent.

- [x] T006 Define a single end-to-end example command + consistent terminology in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` (command will be referenced by all chapters)
- [x] T007 Add a short “VLA glossary” section (Transcript / Intent / Plan / Observation / Action Result) in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` aligned to `specs/001-vla-module-docs/data-model.md`
- [x] T008 Add a module-level “Safety & guardrails” subsection outline in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` (to be expanded in each chapter)

**Checkpoint**: Shared narrative + terminology exists and is reusable across the module.

---

## Phase 3: User Story 1 — Learn the VLA loop end-to-end (Priority: P1) 🎯 MVP

**Goal**: Reader can explain the complete VLA loop and recovery behavior.

**Independent Test**: A reader can (1) list each stage of the loop with inputs/outputs and (2) explain what happens in at least three failure cases (misheard speech, perception ambiguity, blocked navigation).

- [x] T009 [US1] Write the “VLA loop overview” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` (listen → interpret → plan → act → perceive → re-plan)
- [x] T010 [US1] Add a “Signals between stages” table in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` mapping to contracts in `specs/001-vla-module-docs/contracts/vla-interfaces.md`
- [x] T011 [US1] Write “Failure modes & recovery” overview in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` (clarify / confirm / retry / re-plan / stop)
- [x] T012 [US1] Ensure chapter 1 word count is 800–1200 (excluding code blocks) in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md`

**Checkpoint**: US1 can be delivered as a standalone educational chapter that explains the VLA loop.

---

## Phase 4: User Story 2 — Implement a Voice-to-Action pipeline (Priority: P2)

**Goal**: Reader understands the voice-to-action pipeline from audio → transcript → intent → bounded action dispatch.

**Independent Test**: Reader can sketch the pipeline blocks and state what must be checked before physical motion (confidence/confirmation, intent safety constraints, supported action set).

- [x] T013 [US2] Write “Audio capture → transcription → transcript confidence” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` (conceptual, with Whisper as an example)
- [x] T014 [US2] Write “Transcript → intent extraction” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` aligned to `specs/001-vla-module-docs/contracts/vla-interfaces.md`
- [x] T015 [US2] Add “Intent validation & confirmation” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md` (low-confidence, ambiguity, unsafe requests)
- [x] T016 [US2] Ensure chapter 1 still meets the 800–1200 word constraint after additions in `frontend_book/docs/modules/module-4-vision-language-action/chapter1-voice-to-action.md`

**Checkpoint**: Chapter 1 now fully satisfies Voice-to-Action learning outcomes.

---

## Phase 5: User Story 3 — Build an autonomous humanoid capstone workflow (Priority: P3)

**Goal**: Reader understands an integrated workflow where the robot hears a command, plans, navigates, perceives, and manipulates objects, including re-planning.

**Independent Test**: Reader can restate the capstone flow as phases and provide at least two recovery strategies (e.g., object not detected, grasp fails).

- [x] T017 [US3] Draft chapter 2 outline in `frontend_book/docs/modules/module-4-vision-language-action/chapter2-cognitive-planning-llms.md` (plan representation, bounded action set, re-planning loop)
- [x] T018 [US3] Write chapter 2 “Structured plan (ActionPlan/ActionStep)” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter2-cognitive-planning-llms.md` aligned to `specs/001-vla-module-docs/data-model.md`
- [x] T019 [US3] Write chapter 2 “Plan validation + safety checks” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter2-cognitive-planning-llms.md` aligned to `specs/001-vla-module-docs/contracts/vla-interfaces.md`
- [x] T020 [US3] Write chapter 2 “Re-planning triggers from observations” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter2-cognitive-planning-llms.md`
- [x] T021 [US3] Ensure chapter 2 word count is 800–1200 (excluding code blocks) in `frontend_book/docs/modules/module-4-vision-language-action/chapter2-cognitive-planning-llms.md`
- [x] T022 [US3] Draft chapter 3 outline in `frontend_book/docs/modules/module-4-vision-language-action/chapter3-autonomous-humanoid-capstone.md` (end-to-end scenario, navigation, perception, manipulation)
- [x] T023 [US3] Write chapter 3 end-to-end walkthrough using the shared example command in `frontend_book/docs/modules/module-4-vision-language-action/chapter3-autonomous-humanoid-capstone.md`
- [x] T024 [US3] Add a “Troubleshooting the capstone” section in `frontend_book/docs/modules/module-4-vision-language-action/chapter3-autonomous-humanoid-capstone.md` covering: speech error, perception ambiguity, planning failure, navigation blocked, manipulation failure
- [x] T025 [US3] Ensure chapter 3 word count is 800–1200 (excluding code blocks) in `frontend_book/docs/modules/module-4-vision-language-action/chapter3-autonomous-humanoid-capstone.md`

**Checkpoint**: Chapters 2 and 3 together demonstrate planning + integrated autonomy with recovery.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final pass for coherence, navigation, and formatting across all three chapters.

- [ ] T026 [P] Add consistent “Key takeaways” section to each chapter file under `frontend_book/docs/modules/module-4-vision-language-action/`
- [ ] T027 [P] Verify all three chapters use consistent naming for entities (Transcript/Intent/ActionPlan/Observation/ActionResult) in `frontend_book/docs/modules/module-4-vision-language-action/*.md`
- [ ] T028 Verify Docusaurus slugs and sidebar ordering for module 4 in `frontend_book/docs/modules/module-4-vision-language-action/*.md`
- [ ] T029 Validate word counts for all three chapter files (800–1200 each, excluding code blocks) in `frontend_book/docs/modules/module-4-vision-language-action/*.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies
- **Phase 2 (Foundational)**: depends on Phase 1
- **Phase 3+ (User stories)**: depends on Phase 2
- **Phase 6 (Polish)**: depends on completing the desired user story phases

### User Story Dependencies

- **US1** is the MVP and should be completed first.
- **US2** extends Chapter 1; it depends on the basic Chapter 1 scaffold from Setup.
- **US3** uses the shared example command and glossary from Phase 2.

### Parallel Opportunities

- After T001–T002, tasks T003–T005 can run in parallel.
- In Polish, T026–T027 can run in parallel.

---

## Parallel Example: Setup

```text
Task: "Create placeholder chapter1-voice-to-action.md with frontmatter"
Task: "Create placeholder chapter2-cognitive-planning-llms.md with frontmatter"
Task: "Create placeholder chapter3-autonomous-humanoid-capstone.md with frontmatter"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1) and validate chapter 1 word count + structure
4. Stop and review before expanding into US2/US3

### Incremental Delivery

- Chapter 1 (US1+US2) first, then Chapter 2, then Chapter 3.
