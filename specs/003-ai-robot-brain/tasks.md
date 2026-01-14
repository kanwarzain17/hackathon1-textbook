# Tasks: Module 3: The AI-Robot Brain (NVIDIA Isaac™)

**Input**: Design documents from `/specs/003-ai-robot-brain/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the documentation site has a clear place for Module 3 and learners can navigate to it.

- [ ] T001 Create Module 3 docs directory `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/`
- [ ] T002 [P] Add Module 3 link in `frontend_book/docusaurus.config.ts` footer to point to `/modules/ai-brain/module-3/isaac-sim-overview`
- [ ] T003 [P] Add Module 3 overview reference in `README.md` (repo root) with the three chapter URLs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish consistent frontmatter/URL conventions so Docusaurus sidebar + routing is stable.

**⚠️ CRITICAL**: No chapter authoring should start until these paths and slugs are decided.

- [ ] T004 Define Module 3 chapter frontmatter (id/title/sidebar_label/sidebar_position/slug) in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-sim-overview.md` (skeleton file)
- [ ] T005 [P] Define Module 3 chapter frontmatter in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-ros-vslam.md` (skeleton file)
- [ ] T006 [P] Define Module 3 chapter frontmatter in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/nav2-bipedal-path-planning.md` (skeleton file)

**Checkpoint**: Foundation ready — chapters can now be authored independently.

---

## Phase 3: User Story 1 - Photorealistic Simulation & Synthetic Data (Priority: P1) 🎯 MVP

**Goal**: Teach learners to set up Isaac Sim and generate photorealistic synthetic datasets for humanoids.

**Independent Test**: Verify `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-sim-overview.md` renders correctly and explains Isaac Sim 4.0+ setup + Omni.Replicator synthetic data generation for a humanoid (FR-001, FR-002), including Acceptance Scenarios 1–2.

### Implementation for User Story 1

- [ ] T007 [US1] Author Chapter 1 content in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-sim-overview.md` (800–1200 words) covering Isaac Sim purpose, installing/launching, and humanoid USD/URDF import (FR-001, FR-007)
- [ ] T008 [US1] Add a step-by-step synthetic data pipeline section in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-sim-overview.md` using Omni.Replicator outputs (RGB-D + bounding boxes + ground truth) (FR-002)
- [ ] T009 [US1] Add troubleshooting + edge-case notes in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-sim-overview.md` (e.g., performance, dataset bias, rendering quality knobs) and explicitly cover “Handling Perception Noise” from spec Edge Cases

**Checkpoint**: User Story 1 chapter is complete, readable, and independently usable as an MVP.

---

## Phase 4: User Story 2 - Real-time VSLAM & Navigation (Priority: P2)

**Goal**: Explain how to run Isaac ROS VSLAM for odometry/mapping and connect it to navigation workflows using simulated sensors.

**Independent Test**: Verify `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-ros-vslam.md` explains integrating Isaac ROS VSLAM nodes with a simulated stereo/depth sensor stream and describes expected outputs (pose estimate + point cloud) (FR-003), including Acceptance Scenarios 1–2.

### Implementation for User Story 2

- [ ] T010 [US2] Author Chapter 2 content in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-ros-vslam.md` (800–1200 words) introducing Isaac ROS, GPU acceleration, and where VSLAM fits in the “robot brain” (FR-003, FR-007)
- [ ] T011 [US2] Describe the end-to-end simulated sensor → ROS 2 topics → VSLAM pipeline in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-ros-vslam.md` (include a concrete topic/interface example: stereo images + camera_info + TF frames)
- [ ] T012 [US2] Add a “real-time constraints” section in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-ros-vslam.md` referencing SC-002 (<20ms latency target) and practical optimization knobs (resolution, framerate, GPU selection)

**Checkpoint**: User Story 2 chapter can be read independently and used to reason about a working VSLAM + navigation data flow.

---

## Phase 5: User Story 3 - Bipedal Movement Path Planning (Priority: P3)

**Goal**: Teach how to configure Nav2 for bipedal humanoid navigation constraints (footprint, gait dynamics) and recovery behaviors.

**Independent Test**: Verify `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/nav2-bipedal-path-planning.md` explains Nav2 configuration tuned for bipedal locomotion, including biped-specific footprint/costmap parameters and recovery strategy (FR-004), including Acceptance Scenario 1.

### Implementation for User Story 3

- [ ] T013 [US3] Author Chapter 3 content in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/nav2-bipedal-path-planning.md` (800–1200 words) explaining Nav2 stack components (planner/controller/recovery) in a humanoid context (FR-004, FR-007)
- [ ] T014 [US3] Add a biped-specific configuration section in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/nav2-bipedal-path-planning.md` covering footprint modeling, costmap tuning, and dynamic constraints that differ from wheeled robots (FR-004)
- [ ] T015 [US3] Document recovery behaviors and dynamic obstacle handling in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/nav2-bipedal-path-planning.md`, explicitly covering “Nav2 Recovery” from spec Edge Cases

### Story-specific scenarios (required by spec)

- [ ] T016 [US3] Add an “Office Navigation” scenario section to `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/nav2-bipedal-path-planning.md` (FR-005)
- [ ] T017 [US3] Add a “Warehouse Inspection” scenario section to `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/nav2-bipedal-path-planning.md` (FR-006)

**Checkpoint**: All Module 3 content is authored and supports the required scenarios.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the documentation build and ensure consistency across modules.

- [ ] T018 [P] Validate word count (800–1200 words) for each chapter file in `frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/` (FR-007, SC-004)
- [ ] T019 [P] Run `npm run build` in `frontend_book/` to validate rendering and check for broken links
- [ ] T020 [P] Verify Module 3 footer link in `frontend_book/docusaurus.config.ts` resolves and add Module 2 link if missing for consistency

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phases 3–5)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on Phases 3–5 completion

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependencies on other stories
- **US2 (P2)**: Can start after Foundational — independent of US1 in doc structure
- **US3 (P3)**: Can start after Foundational — independent of US1/US2 in doc structure

### Parallel Opportunities

- Within Phase 2: T005 and T006 can run in parallel (separate files)
- After Phase 2: US1/US2/US3 phases can be authored in parallel by different authors
- Phase 6 tasks are mostly parallelizable

---

## Parallel Example: User Story 1

```text
Task: "Author Chapter 1 content in frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-sim-overview.md"
Task: "Define Module 3 chapter frontmatter in frontend_book/docs/modules/ai-brain/module-3-ai-robot-brain/isaac-ros-vslam.md" (if not already done)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Ensure Chapter 1 renders and meets the acceptance scenarios + word count

### Incremental Delivery

1. Add US1 (Chapter 1) → validate → merge
2. Add US2 (Chapter 2) → validate → merge
3. Add US3 (Chapter 3) + required scenarios → validate → merge
4. Polish (word count, build, navigation consistency)
