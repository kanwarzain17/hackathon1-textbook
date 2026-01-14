---
id: chapter2-cognitive-planning-llms
title: Cognitive Planning with LLMs
sidebar_label: 2. Cognitive Planning (LLMs)
sidebar_position: 2
slug: /modules/module-4/chapter2-cognitive-planning-llms
---

# Cognitive Planning with LLMs

In Chapter 1, we turned speech into a **Transcript** and then into a structured **Intent**. The next question is what makes the robot *autonomous* instead of a set of hard-coded responses.

Autonomy requires a system that can:

- translate intent into an ordered set of actions the robot can execute,
- check safety and feasibility before motion,
- adapt when the world does not match the plan.

In this chapter, we focus on **cognitive planning**: how a large language model (LLM) can help convert natural language into a **bounded, executable action sequence**.

> We treat LLMs as planners, not as controllers. They propose structured plans, but the robot only executes plans that pass validation.

## Reuse the same example command

We continue using:

> “Go to the table, find the red bottle, and bring it to me.”

This command forces the planner to combine multiple skills: navigation, perception, and manipulation. A good planner must also make decisions about ordering (navigate before grasp), verification (confirm object detection before grasp), and recovery (retry perception, re-plan path, ask for help).

## Chapter outline (what we will build conceptually)

By the end of this chapter you should be able to describe:

1. a plan representation that is specific enough to execute
2. how to constrain planning to a robot’s known action set
3. how to validate plans (safety, feasibility, permissions)
4. how observations trigger re-planning

## Structured planning: why “just generate steps” is not enough

If you prompt an LLM with a command, it can produce a plan in natural language:

- “Walk to the table. Look for the bottle. Pick it up. Bring it back.”

That is helpful for humans, but it is not yet safe or executable.

For a robot, each step must answer:

- **What action primitive is this?** (navigate, detect, grasp, deliver)
- **What inputs are required?** (goal location, object description)
- **What must be true before the step starts?** (preconditions)
- **How do we know it succeeded?** (postconditions)
- **What can go wrong, and what is the recovery?**

This is why we represent plans as a typed **Action Plan** made of **Action Steps**.

## Plan representation (ActionPlan / ActionStep) (US3)

A practical documentation-friendly representation looks like this:

- **ActionPlan**: an ordered list of ActionSteps
- **ActionStep**: a single atomic action with explicit checks

Each ActionStep should include:

- **name**: the action primitive (e.g., `navigate_to`, `detect_object`, `grasp_object`, `return_to_user`)
- **inputs**: parameters needed to run the step
- **preconditions**: what must already be true
- **postconditions**: what becomes true if it succeeds
- **failure modes**: common ways it can fail
- **recovery strategy**: retry, re-plan, clarify, or stop

Conceptually, this aligns with the module’s shared entities:

- Transcript → Intent → ActionPlan → ActionResult + Observation

### Example: a bounded plan for the bottle request

A planner might produce a plan like:

1. `navigate_to(location="table")`
2. `detect_object(query="red bottle")`
3. `grasp_object(target="detected red bottle")`
4. `navigate_to(location="user")`
5. `hand_over_object(target="grasped object")`

Notice what is *not* present:

- no low-level joint control
- no free-form “do whatever” instructions

The plan stays inside the robot’s known skill set.

## Constraining the planner: actions, permissions, and capabilities

A core safety rule is: **the planner can only choose from a known menu of actions**.

Why this matters:

- It prevents the LLM from inventing actions the robot cannot execute.
- It simplifies validation: you can reason about a finite set of primitives.
- It reduces ambiguity: each action has clear inputs and outputs.

In real systems, the “menu” comes from the robot’s software capabilities (navigation stack, perception models, manipulation pipeline). For this module, it is enough to know that the action set is explicit and versioned.

## Plan validation + safety checks (US3)

Before executing a plan, the system should validate it. Validation is where the robot’s autonomy becomes predictable.

### 1) Safety checks

Examples of safety checks for the bottle task:

- The plan must include a **verify before grasp** step (do not grasp based on assumption).
- Navigation must respect **forbidden zones** (e.g., stairs, no-go areas).
- The robot must maintain safe speeds and stop distances around humans.

### 2) Feasibility checks

- Is the target location known or reachable?
- Does the robot have a working gripper?
- Is the object size within the gripper’s capability?

If feasibility fails, the planner should not “push through.” It should either re-plan with different assumptions or request help.

### 3) Permission / policy checks

Even if something is feasible, it may not be allowed. For example:

- “Bring me the medication from the cabinet” may require additional authorization.

A good policy layer sits outside the LLM: the LLM proposes plans, but policy decides if the plan is permitted.

## Re-planning: how observations change the plan (US3)

Robotics differs from pure software because the world keeps changing. The system therefore loops:

1. execute a step
2. observe the outcome
3. decide whether to continue, retry, or re-plan

### What counts as an observation?

Observations can include:

- the robot’s updated pose after navigation
- detected objects and confidence scores
- whether grasp succeeded
- unexpected obstacles or blocked paths

### Re-planning triggers

Re-planning should happen when:

- the observation contradicts a plan assumption (no table detected where expected)
- execution fails repeatedly (three failed grasps)
- a new hazard appears (person steps into path)

### Recovery strategies

A practical recovery toolbox:

- **Retry** the same step (with a limit)
- **Change viewpoint** (move the head/robot to get a better perception angle)
- **Re-plan** with updated information (choose a different path or search strategy)
- **Clarify** with the user ("Which red bottle do you mean?")
- **Stop safely** and explain what is blocking progress

## Key takeaways

- LLMs can help with planning, but the robot should execute only **validated** plans.
- Plans should be **structured** (ActionPlan/ActionStep) with preconditions, success signals, and recovery.
- Observations are the trigger for retry vs re-plan vs clarification.

## What you should be able to explain after this chapter

After Chapter 2, you should be able to:

- describe an ActionPlan/ActionStep representation
- explain why the planner must be constrained to known primitives
- list safety, feasibility, and policy validation checks
- explain how observations trigger retry vs re-plan vs clarification
