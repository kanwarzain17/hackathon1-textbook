# Data Model: Module 4 — Vision-Language-Action (VLA)

**Feature**: `001-vla-module-docs`
**Date**: 2026-01-12

## Purpose

Define the conceptual entities and relationships used throughout the VLA module so the documentation can:
- stay consistent across the three chapters,
- make interfaces between subsystems explicit,
- support unambiguous examples and troubleshooting.

> This is a *conceptual* data model for documentation planning, not an implementation schema.

## Entities

### 1) VoiceCommand

**Represents**: A user’s spoken instruction.

**Key fields**:
- `audio_stream`: raw audio captured from microphone (concept)
- `timestamp`
- `speaker_context` (optional): who spoke / role / permissions

**Validation rules**:
- must be associated with a `Transcript`

---

### 2) Transcript

**Represents**: Text produced by speech recognition.

**Key fields**:
- `text`
- `confidence` (optional)
- `language` (optional)
- `alternatives` (optional): n-best list

**Validation rules**:
- if `confidence` below a threshold → pipeline requires confirmation / clarification before physical action

---

### 3) Intent

**Represents**: Structured interpretation of the transcript.

**Key fields**:
- `task_type` (e.g., navigate, fetch, place, inspect)
- `entities`: objects/locations referenced
- `constraints`: safety, ordering, urgency, exclusions
- `clarification_needed` (boolean)

**Validation rules**:
- must be “actionable”: required entities present OR `clarification_needed=true`

---

### 4) ActionPlan

**Represents**: An ordered, bounded sequence of actions that achieve the intent.

**Key fields**:
- `steps[]: ActionStep`
- `assumptions`: environment assumptions (object exists, reachable)
- `safety_checks[]`

**Validation rules**:
- every `ActionStep` must have preconditions and success criteria
- plan must include at least one “verification” step for perception/manipulation phases

---

### 5) ActionStep

**Represents**: A single atomic step in the plan.

**Key fields**:
- `name` (navigate_to, detect_object, grasp_object, hand_over)
- `inputs`
- `preconditions`
- `postconditions`
- `failure_modes[]`
- `recovery_strategy`

**State transitions**:
- `pending → running → succeeded | failed | aborted`

---

### 6) Observation

**Represents**: New state information from sensors/perception/localization.

**Key fields**:
- `robot_pose` (optional)
- `detected_objects[]` (optional)
- `scene_confidence` (optional)
- `timestamp`

**Validation rules**:
- may trigger re-planning if contradicts plan assumptions

---

### 7) ActionResult

**Represents**: Outcome of executing an ActionStep.

**Key fields**:
- `step_id`
- `status`: success/failure/aborted
- `reason` (optional)
- `observations` (optional)

---

## Relationships

- `VoiceCommand` → produces → `Transcript`
- `Transcript` → interpreted as → `Intent`
- `Intent` → planned into → `ActionPlan`
- `ActionPlan` → contains → `ActionStep[*]`
- `ActionStep` → produces → `ActionResult`
- `Observation` → informs → `ActionPlan` (re-plan) and/or `ActionStep` execution

## Cross-chapter invariants (consistency rules)

- The same example command should be used end-to-end across all chapters.
- The same entity names (`Transcript`, `Intent`, `ActionPlan`, `Observation`, `ActionResult`) should be used consistently.
- Any “confidence” concept (speech or perception) should map to an explicit decision: confirm, clarify, re-plan, or stop.
