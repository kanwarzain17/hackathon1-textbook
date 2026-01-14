# Tasks: UI Upgrade for Book Frontend

**Input**: Design documents from `specs/001-book-frontend-ui/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated test work is required by the spec. Use `frontend_book` typecheck + build plus manual/visual validation per `specs/001-book-frontend-ui/quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] T### [P?] [US?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[US#]**: Which user story this task belongs to (US1, US2, US3)
- Each task includes an exact file path (or a command anchored to a file, e.g., `frontend_book/package.json`)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm local workflow and establish a repeatable baseline for UI review.

- [x] T001 Confirm Node.js meets engine requirement noted in frontend_book/package.json
- [x] T002 Install frontend dependencies using frontend_book/package.json (npm install in frontend_book/)
- [x] T003 Run TypeScript typecheck using frontend_book/package.json (npm run typecheck in frontend_book/)
- [x] T004 Run dev server and confirm site loads using frontend_book/package.json (npm run start in frontend_book/)
- [x] T005 Create a representative page set file at specs/001-book-frontend-ui/qa/representative-pages.md
- [x] T006 Create a UI review checklist file at specs/001-book-frontend-ui/qa/ui-review-checklist.md aligned to SC-001..SC-004

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core theming foundations required before any user story UI work can be implemented consistently.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T007 Define global design tokens (color, typography, spacing, radii, shadows) in frontend_book/src/css/custom.css
- [x] T008 [P] Add base typography rules (font stack, base font size, line height) in frontend_book/src/css/custom.css
- [x] T009 [P] Add consistent focus/interactive styling (focus ring, hover states) in frontend_book/src/css/custom.css
- [x] T010 Add global layout constraints for readable content width and spacing in frontend_book/src/css/custom.css
- [x] T011 Add baseline responsive breakpoints and mobile-safe spacing rules in frontend_book/src/css/custom.css

**Checkpoint**: Theme foundation ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Read content comfortably (Priority: P1) MVP

**Goal**: Improve readability and visual hierarchy on content pages across desktop and mobile.

**Independent Test**: Using specs/001-book-frontend-ui/qa/representative-pages.md, verify headings/spacing/typography are clearly hierarchical and readable on desktop and mobile viewports without horizontal scrolling.

### Implementation for User Story 1

- [x] T012 [US1] Improve heading hierarchy (h1–h4 sizing, spacing, weight) in frontend_book/src/css/custom.css
- [x] T013 [US1] Improve paragraph/list readability (line length, spacing, list indentation) in frontend_book/src/css/custom.css
- [x] T014 [US1] Improve code block readability (font sizing, padding, contrast, overflow behavior) in frontend_book/src/css/custom.css
- [x] T015 [US1] Improve table readability and overflow handling in frontend_book/src/css/custom.css
- [x] T016 [US1] Improve blockquote/admonition/callout readability in frontend_book/src/css/custom.css
- [x] T017 [US1] Validate US1 against SC-001 + SC-003 using specs/001-book-frontend-ui/qa/ui-review-checklist.md

**Checkpoint**: Content pages are readable with clear hierarchy on desktop + mobile.

---

## Phase 4: User Story 2 - Navigate the book efficiently (Priority: P2)

**Goal**: Improve navbar + sidebar UX so users can find content and understand their location.

**Independent Test**: On desktop and mobile, complete a “find a module page then return to previous page” navigation task using navbar and sidebar, without losing location context.

### Implementation for User Story 2

- [ ] T018 [P] [US2] Improve navbar configuration for clarity (labels/structure only; no new destinations) in frontend_book/docusaurus.config.ts
- [ ] T019 [US2] Improve navbar styling (spacing, alignment, visual separation) in frontend_book/src/css/custom.css
- [ ] T020 [US2] Improve sidebar active state visibility and spacing in frontend_book/src/css/custom.css
- [ ] T021 [US2] Improve mobile navigation usability (toggle spacing, scroll behavior, no content overlap) in frontend_book/src/css/custom.css
- [ ] T022 [US2] Validate US2 against SC-001 + SC-002 using specs/001-book-frontend-ui/qa/ui-review-checklist.md

**Checkpoint**: Navigation is clearer and usable on touch devices; current location is obvious.

---

## Phase 5: User Story 3 - Trust the site's visual consistency (Priority: P3)

**Goal**: Ensure visual consistency across pages and shared UI chrome (navbar/sidebar/footer) with a modern look.

**Independent Test**: Navigate across multiple modules/pages and confirm consistent color/typography/spacing and consistent component styling.

### Implementation for User Story 3

- [ ] T023 [P] [US3] Audit themeConfig chrome elements and align wording/structure where needed in frontend_book/docusaurus.config.ts
- [ ] T024 [US3] Refresh footer UX and layout (spacing, link presentation) in frontend_book/docusaurus.config.ts
- [ ] T025 [US3] Align footer styling to theme tokens (colors/spacing/typography) in frontend_book/src/css/custom.css
- [ ] T026 [US3] Ensure dark mode styling uses the same token system and remains consistent in frontend_book/src/css/custom.css
- [ ] T027 [US3] Validate US3 against SC-001 + SC-004 using specs/001-book-frontend-ui/qa/ui-review-checklist.md

**Checkpoint**: Site chrome is visually consistent and cohesive across pages.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final QA, ensure responsiveness, and ensure the repo build pipeline remains healthy.

- [ ] T028 [P] Run production build using frontend_book/package.json (npm run build in frontend_book/)
- [ ] T029 [P] Re-run typecheck using frontend_book/package.json (npm run typecheck in frontend_book/)
- [ ] T030 Perform responsive QA on common viewport widths and record results in specs/001-book-frontend-ui/qa/ui-review-checklist.md
- [ ] T031 Fix any regressions found during build/typecheck/QA in frontend_book/src/css/custom.css
- [ ] T032 Update specs/001-book-frontend-ui/quickstart.md if validation steps or representative pages changed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1; BLOCKS all user stories
- **User Stories (Phase 3–5)**: Depend on Phase 2
  - Recommended order: US1 (P1) → US2 (P2) → US3 (P3)
- **Polish (Phase 6)**: Depends on completing the desired user stories

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 only
- **US2 (P2)**: Depends on Phase 2; should not require US1 completion
- **US3 (P3)**: Depends on Phase 2; can be done after US1/US2 for best consistency

### Parallel Opportunities

- Phase 2 tasks T008 and T009 can run in parallel (both in custom.css but scoped to different rule areas; coordinate to avoid conflicts).
- US2 tasks T018 and T020 can run in parallel (config vs CSS).
- Phase 6 tasks T028 and T029 can run in parallel (build vs typecheck).

---

## Parallel Example: User Story 2

```text
Task: "T018 [P] [US2] Improve navbar configuration for clarity (labels/structure only) in frontend_book/docusaurus.config.ts"
Task: "T020 [US2] Improve sidebar active state visibility and spacing in frontend_book/src/css/custom.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1)
4. Validate SC-001 + SC-003 using the QA checklist and representative pages

### Incremental Delivery

- Deliver US1 improvements first (readability/hierarchy)
- Add US2 improvements (navigation UX)
- Add US3 improvements (visual consistency)
- Finish with cross-cutting QA + build/typecheck
