---
id: chapter1-voice-to-action
title: Voice-to-Action (VLA Entry Point)
sidebar_label: 1. Voice-to-Action
sidebar_position: 1
slug: /modules/module-4/chapter1-voice-to-action
---

# Voice-to-Action (VLA Entry Point)

A Vision-Language-Action (VLA) system starts with a simple promise: **a human can speak naturally, and a robot can turn that request into safe, observable behavior**. In practice, that promise only holds when we treat voice not as a “magic control channel,” but as a pipeline with checks at every stage.

This chapter covers the first part of the loop—**voice to actionable intent**—and introduces the shared concepts we will use across all of Module 4.

## The end-to-end example (used in every chapter)

We will use one command throughout the module so you can track it end-to-end:

> **Example command**: “Go to the table, find the red bottle, and bring it to me.”

This single sentence forces the system to do everything a humanoid needs to do:

- listen and transcribe the speech
- interpret what “table” and “red bottle” refer to
- plan an action sequence with safety checks
- navigate, perceive, grasp, and return
- recover if something goes wrong

## VLA glossary (shared terms)

We’ll use these terms consistently:

- **Transcript**: the text produced from speech recognition, optionally with a confidence score.
- **Intent**: a structured interpretation of the transcript (task type + objects + locations + constraints).
- **Action Plan**: an ordered set of steps that can be executed by the robot.
- **Observation**: new information from perception/localization that can confirm or contradict the plan.
- **Action Result**: the outcome of executing a step (success/failure + context), used to continue or re-plan.

These are conceptual “interfaces” between subsystems. They help you reason about the system even if the underlying implementation changes.

## Safety & guardrails (module-wide outline)

A humanoid must not act on speech the way a chatbot answers text. Before physical motion, a VLA system should have clear guardrails:

1. **Confidence gates**: if transcription or intent is low-confidence, confirm before acting.
2. **Capability limits**: only execute actions the robot is designed and permitted to do.
3. **Environmental constraints**: avoid forbidden zones, maintain safe distances, stop on collision risk.
4. **Human-in-the-loop exits**: provide a clear path to ask a question (“Which bottle?”) or request help.
5. **Stop conditions**: if the system cannot proceed safely, it should stop and report why.

We will expand these guardrails in each chapter, especially in the planning and capstone sections.

## The VLA loop overview (US1)

Even though this chapter focuses on voice, it is important to see the full loop early:

1. **Listen**: capture audio from the user.
2. **Transcribe**: convert audio into a **Transcript**.
3. **Interpret**: convert the transcript into an **Intent**.
4. **Plan**: generate an **Action Plan** from the intent (with safety checks).
5. **Act**: execute plan steps (navigate, perceive, manipulate).
6. **Perceive**: gather **Observations** after each step.
7. **Re-plan**: update the plan when observations contradict assumptions.

A key idea: the system is not “voice → motion.” It is **voice → intent → verified plan → motion**, with a loop that can pause or ask for clarification.

## Signals between stages (US1)

The loop becomes easier to design and debug when you make the “handoff” between stages explicit.

| Stage transition | Output artifact | What it must contain | Common failures |
|-----------------|-----------------|----------------------|-----------------|
| Speech → Transcript | Transcript | text (+ optional confidence / alternatives) | low confidence, missing words, wrong entity ("bottle" → "battle") |
| Transcript → Intent | Intent | task type, entities (object/location), constraints, ambiguity flag | ambiguity ("that"), missing entity, unsupported request |
| Intent → Action Plan | Action Plan | ordered steps, preconditions, verification checks | infeasible plan, unsafe plan, missing verification |
| Action Step → Result | Action Result | status + reason + context | navigation blocked, grasp failure |
| Result/Observation → Continue/Re-plan | Decision + updated plan | continue/retry/re-plan/clarify/stop | repeated failure loops, unsafe continuation |

This table matches the conceptual interfaces defined for the module: each transition should produce something you can inspect, log, and validate.

## Voice-to-Action pipeline: from audio to intent (US2)

A minimal Voice-to-Action pipeline has five blocks:

1. **Audio capture**: microphone input is sampled and chunked.
2. **Transcription**: audio becomes a transcript (often with timestamps and confidence).
3. **Intent extraction**: transcript becomes a structured intent.
4. **Validation + confirmation**: check ambiguity, safety, and feasibility.
5. **Dispatch**: hand off intent to planning/execution.

### Transcription (with Whisper as an example)

One common approach is to use an automatic speech recognition model such as **Whisper**. Regardless of the specific tool, transcription should produce:

- the best-guess text
- some notion of confidence or alternatives

Why confidence matters: if the robot mishears “red bottle” as “bread bottle,” the error is not just a wrong answer—it can cause the robot to search incorrectly or manipulate the wrong object.

A good default behavior is:

- **High confidence**: proceed to intent extraction.
- **Low confidence**: ask the user to repeat or confirm.

### Transcript → Intent extraction (US2)

Intent extraction turns raw text into something the robot can plan against. For our example command, the intent might capture:

- **task type**: fetch / bring
- **target object**: bottle
- **attributes**: red
- **target location**: table
- **delivery target**: user

If any of these fields are missing, the system should not guess silently. It should set a “clarification needed” flag and ask a question.

### Intent validation & confirmation (US2)

Before physical action, validate intent along three axes:

1. **Ambiguity**: Are there multiple reasonable interpretations?
   - Example: “the red bottle” when there are two red bottles.
2. **Safety**: Is the requested behavior allowed and safe?
   - Example: “Pick up the knife and hand it to me” may require refusal or extra confirmation.
3. **Feasibility**: Can the robot plausibly do this now?
   - Example: no map available, table location unknown, gripper not functional.

If validation fails, the system should choose one of these safe responses:

- **Clarify**: ask a targeted question.
- **Confirm**: repeat what it heard and ask for a yes/no.
- **Refuse**: explain why a request is not allowed.
- **Stop**: if the system is uncertain and cannot act safely.

## Failure modes & recovery (US1)

Failures are normal in robotics. The goal is not “never fail,” but **fail safely and recover predictably**.

Common Voice-to-Action failures and recommended responses:

- **Misheard speech** (low transcript confidence): ask for repetition or confirmation.
- **Ambiguous reference** (“bring me that”): ask a clarification question.
- **Unsupported request** (“fly to the shelf”): refuse or translate to a supported alternative.
- **Unsafe request** (hazardous object or forbidden area): refuse or require explicit confirmation and constraints.

In later chapters, you’ll see how planning and perception failures feed back into the loop through observations and re-planning.

## Key takeaways

- Voice is an *input modality*, not a control system: voice must become **Transcript → Intent** before action.
- Safe operation requires **confidence gates**, **intent validation**, and **stop/clarify** behaviors.
- The full VLA loop includes re-planning; voice is just the entry point.

## What you should be able to explain after this chapter

By the end of Chapter 1, you should be able to:

- describe the full VLA loop at a high level
- explain why transcription confidence and intent validation matter
- define Transcript, Intent, Action Plan, Observation, and Action Result
- describe at least three safe recovery behaviors for voice-related failures
