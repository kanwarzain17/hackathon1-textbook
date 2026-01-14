---
id: chapter3-autonomous-humanoid-capstone
title: Autonomous Humanoid Capstone
sidebar_label: 3. Autonomous Humanoid Capstone
sidebar_position: 3
slug: /modules/module-4/chapter3-autonomous-humanoid-capstone
---

# Autonomous Humanoid Capstone

This capstone chapter connects everything:

- **Voice** (Chapter 1): audio → Transcript → Intent (with validation)
- **Planning** (Chapter 2): Intent → Action Plan (bounded primitives + safety checks)
- **Action** (this chapter): execute, observe, recover, and complete the task

The goal is not to present a perfect robot. The goal is to show a workflow that is **observable, debuggable, and safe**.

We will keep using the same command:

> **“Go to the table, find the red bottle, and bring it to me.”**

## Chapter outline (T022)

We will walk through the capstone as a sequence of phases:

1. Hear + transcribe the command
2. Extract intent (entities + constraints)
3. Generate a bounded plan (with verification steps)
4. Navigate to the table
5. Perceive and disambiguate the target object
6. Manipulate (grasp) the bottle
7. Navigate back and hand over
8. Verify success
9. Recover gracefully from failures

## Capstone walkthrough: from speech to successful handover (T023)

### Phase 1 — Hear and transcribe

The robot captures audio and produces a **Transcript**.

What we want to observe:

- the transcript text
- a confidence score or an “uncertain” flag

If confidence is low, the safest behavior is to confirm:

- “I heard: ‘Go to the table, find the red bottle, and bring it to you.’ Is that correct?”

Only after confirmation should the system proceed.

### Phase 2 — Extract intent

The intent should be structured and explicit. For this command:

- **task type**: fetch / bring
- **location**: table
- **object**: bottle
- **attribute**: red
- **recipient**: user

If any part is ambiguous, ask a question before motion:

- “Which table do you mean—the kitchen table or the workbench?”

### Phase 3 — Generate a bounded plan

The planner converts the intent into an **Action Plan** made of known primitives.

A reasonable plan structure:

1. `navigate_to(location="table")`
2. `detect_object(query="red bottle")`
3. `verify_target(target="detected object")` (if multiple candidates)
4. `grasp_object(target="verified bottle")`
5. `navigate_to(location="user")`
6. `hand_over_object(target="grasped bottle")`

Two important properties:

- **Verification** is explicit (don’t grasp based on guesswork).
- Every step has a clear success signal (so failures are detectable).

### Phase 4 — Navigate to the table

Navigation turns “table” into a reachable goal. The system should monitor:

- localization status
- progress toward goal
- obstacle detection

If navigation fails (blocked path, localization lost), do not keep trying indefinitely. Use a retry limit and then either re-plan (different route) or ask for help.

### Phase 5 — Perceive and select the bottle

At the table, perception must answer:

- Do we see any bottles?
- Which one is red?
- Are there multiple red bottles?

If multiple candidates exist, the system should disambiguate rather than guess:

- ask: “I see two red bottles. Should I take the one on the left or right?”
- or perform an active search: change viewpoint to read labels or get a better angle

### Phase 6 — Grasp and secure the object

Manipulation is where many capstones fail. A safe grasp phase includes:

- pre-grasp alignment and reachability checks
- a contact/force or grasp-quality signal
- a post-grasp verification: “object is in gripper”

If the grasp fails, recovery options include:

- retry with a slightly different approach
- change viewpoint and re-localize the object
- re-plan (different grasp pose)

### Phase 7 — Return and hand over

Returning is another navigation segment, but now the robot is carrying an object.

Hand-over should be treated as a safety-critical step:

- slow approach
- clear verbal cues ("Here is the bottle")
- release only when handover conditions are met (user present, stable pose)

### Phase 8 — Verify success

Success is not “we tried.” Success is an observable completion condition, such as:

- user received object (or object placed in specified location)
- robot reports completion and returns to idle safely

## Troubleshooting the capstone (T024)

Use this checklist to debug failures by where they appear in the VLA loop.

### Speech / transcription issues

Symptoms:

- wrong transcript (“red bottle” becomes “bread bottle”)
- low confidence repeatedly

Responses:

- move closer to speaker / reduce noise
- ask the user to repeat
- confirm the transcript before planning

### Intent ambiguity

Symptoms:

- intent missing a key entity (“bring it” with no object)
- multiple matching targets

Responses:

- ask a clarification question
- present choices based on what the robot can see

### Planning failures

Symptoms:

- plan contains unsupported steps
- plan has no verification before grasp

Responses:

- constrain the planner to known action primitives
- require validation gates (safety + feasibility)

### Navigation failures

Symptoms:

- cannot reach table
- path repeatedly blocked

Responses:

- re-plan route
- wait and retry (with limit)
- ask for human assistance if blocked persistently

### Perception failures

Symptoms:

- object not detected
- detections unstable

Responses:

- change viewpoint (active perception)
- broaden search region
- fall back to user clarification (“Can you point to the bottle?”)

### Manipulation failures

Symptoms:

- missed grasps
- object slips

Responses:

- adjust grasp pose and retry
- slow down, add verification checks
- if repeated failures, stop and request help

## What you should be able to explain after this chapter

After Chapter 3, you should be able to explain the full VLA loop as a real workflow:

- how the system moves from speech to intent to plan
- how navigation, perception, and manipulation fit into the loop
- how observation-driven re-planning keeps the system robust
- how troubleshooting maps back to a specific stage of the pipeline
