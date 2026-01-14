# Contracts: Vision-Language-Action (VLA) Interfaces

**Feature**: `001-vla-module-docs`
**Date**: 2026-01-12

## Purpose

Define the *conceptual* contracts between subsystems used in the Module 4 documentation.

> These are documentation-level interfaces, not a commitment to any specific middleware, protocol, or schema.

## Contract 1 — Speech → Transcript

**Name**: `TranscribeAudio`

**Input**:
- audio stream / audio file
- optional metadata: language, sampling rate

**Output**:
- `Transcript.text`
- optional: `Transcript.confidence`, `Transcript.alternatives`

**Errors / edge cases**:
- low-confidence transcript
- silence / no speech detected
- unsupported language

**Required behavior**:
- if confidence is low, downstream logic must avoid initiating physical actions without confirmation.

---

## Contract 2 — Transcript → Intent

**Name**: `ExtractIntent`

**Input**:
- `Transcript`
- optional context: known objects/locations, robot capabilities, user role

**Output**:
- `Intent.task_type`
- `Intent.entities`
- `Intent.constraints`
- `Intent.clarification_needed`

**Errors / edge cases**:
- ambiguous reference (“that”, “over there”)
- missing required entity (no object specified)
- unsupported task request

**Required behavior**:
- if intent is unclear or unsafe, system must request clarification or refuse.

---

## Contract 3 — Intent → Action Plan

**Name**: `PlanActions`

**Input**:
- `Intent`
- robot capabilities (available actions)
- environment assumptions (map known/unknown)

**Output**:
- `ActionPlan.steps[]` ordered
- embedded preconditions/verification steps

**Errors / edge cases**:
- infeasible plan (no navigation route, unreachable object)
- unsafe plan (collision risk, forbidden area)

**Required behavior**:
- plan must be bounded to known action primitives.
- include safety/verification checkpoints.

---

## Contract 4 — Plan Step → Execution Result

**Name**: `ExecuteActionStep`

**Input**:
- `ActionStep`

**Output**:
- `ActionResult.status`
- `ActionResult.reason` (if failed)
- optional `Observation`

**Errors / edge cases**:
- navigation blocked
- grasp failed
- perception mismatch

**Required behavior**:
- on failure, system must either retry with a defined limit, re-plan, ask for help, or stop safely.

---

## Contract 5 — Observation → Re-plan Decision

**Name**: `AssessAndReplan`

**Input**:
- current `ActionPlan`
- new `Observation`
- latest `ActionResult`

**Output**:
- decision: continue / retry / re-plan / clarify / stop
- updated plan (if re-plan)

**Required behavior**:
- any contradiction to plan assumptions triggers re-evaluation before continuing.
