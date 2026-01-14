---
id: nav2-bipedal-path-planning
title: Nav2 Path Planning for Bipedal Humanoids
sidebar_label: 3. Nav2 Path Planning
sidebar_position: 3
slug: /modules/module-3/nav2-bipedal-path-planning
---

# Nav2 Path Planning for Bipedal Humanoids

After simulation (Isaac Sim) and localization/mapping (Isaac ROS VSLAM), the next core “brain” capability is **planning**: deciding how to move from the current pose to a goal without collisions.

In ROS 2 ecosystems, the most common navigation framework is **Nav2**. For wheeled robots, Nav2 is often configured with assumptions like “continuous rolling” and relatively stable footprints. For humanoids, planning must respect **bipedal constraints** such as balance, foot placement, and more complex recovery behaviors.

This chapter explains the Nav2 stack at a conceptual + configuration level, with special emphasis on what changes for bipeds.

## Nav2 in one picture: planner, controller, recovery

A simplified mental model of Nav2:

1. **Global planner**: computes a high-level path through the map.
2. **Local controller**: turns the global plan into short-term commands while avoiding obstacles.
3. **Recovery behaviors**: what to do when you get stuck (blocked path, oscillation, localization problems).

For students, the key is understanding the data flow:

- Inputs: robot pose (from VSLAM), a map/costmap, and a navigation goal.
- Outputs: velocity commands or motion targets (depending on your humanoid control interface).

## What “bipedal-specific” means

The spec requires that Nav2 be configured “tailored for bipedal humanoid footprint and dynamics.” In practice, this means you must represent the robot in a way that planners and costmaps can reason about.

### 1) Footprint modeling

Wheeled robots often use a simple circular footprint. Humanoids may need:

- A **wider footprint** during stepping
- A footprint that changes during gait (single support vs double support)
- Additional clearance for arms or carried objects

A practical teaching approach is:

- Start with a conservative 2D footprint that represents the “worst-case” space the robot occupies.
- Tune it based on simulated collisions and near-misses.

### 2) Costmap tuning

A costmap is a grid of the world where each cell has a “cost” (free space vs obstacle vs inflated obstacle).

For bipeds, costmap tuning often emphasizes:

- **Inflation radius**: keep extra space so steps are stable and do not clip obstacles.
- **Obstacle layers**: incorporate dynamic obstacles that appear in sensor data.
- **Resolution trade-off**: finer resolution gives better precision but higher compute cost.

This directly maps to the acceptance scenario: *Given a Nav2 goal, when bipedal-specific costmap params are applied, then the path planner accounts for the robot’s footprint and gait requirements.*

### 3) Dynamic constraints

Humanoids have constraints beyond maximum velocity:

- Turning too fast can destabilize the gait.
- Sudden stop/start can cause falls.
- Some terrains or slopes may be “navigable” for wheels but not safe for steps.

The local controller settings should reflect:

- Smoother accelerations
- Conservative turning rates
- Clear preferences for straight, stable motion where possible

## Recovery behaviors and dynamic obstacles (Edge Case)

The spec asks: *How does the humanoid handle recovery behaviors if the path is blocked by dynamic obstacles not in the static map?*

Recovery behaviors commonly include:

- **Clear costmap**: discard stale obstacle data.
- **Wait / pause**: let a moving obstacle pass.
- **Back up and replan**: create space for a new plan.
- **Rotate in place**: scan environment to update obstacle map.

For humanoids, recovery must also consider stability:

- Backing up may be harder than for a wheeled base.
- Rotating in place may require a special stepping controller.

When teaching Nav2 recovery for bipeds, emphasize that “recovery behavior” might translate into *high-level intents* (pause, replan, step back) that your humanoid gait controller executes safely.

## Scenario 1: Office Navigation (FR-005)

**Goal**: Navigate a humanoid through an office-like indoor environment.

Office environments are challenging because:

- Narrow corridors
- Chairs and tables with thin legs
- Dynamic obstacles (people)

A solid learning scenario:

1. Start the humanoid at the office entrance.
2. Set a goal pose near a desk.
3. Observe planning around furniture and corridor constraints.
4. Trigger a dynamic obstacle (a moving person) and observe recovery behavior.

Key configuration lessons:

- Use an inflation radius that prevents “squeezing” between chair legs.
- Prefer smooth local control for stable gait.

## Scenario 2: Warehouse Inspection (FR-006)

**Goal**: Navigate aisles and inspect zones using multi-sensor perception.

Warehouse environments include:

- Long aisles with repetitive visual features (challenging for localization)
- Pallets and boxes (often moved)
- Wide open areas that encourage long straight paths

A good inspection scenario:

1. Define several waypoints (“inspection stops”).
2. Navigate aisle by aisle.
3. Replan when an aisle is blocked by a pallet.

Key configuration lessons:

- Dynamic obstacle layers matter because the environment changes.
- Recovery strategies should include “wait” and “replan” rather than aggressive maneuvers.

## Summary

Nav2 provides a flexible navigation framework, but humanoids require careful configuration and realistic assumptions:

- Represent the robot footprint conservatively.
- Tune costmaps for stability and clearance.
- Use recovery behaviors that map to safe humanoid motion.

---

*With these three chapters, Module 3 completes the conceptual loop of the AI-Robot Brain: simulate → perceive/localize → plan and navigate.*
