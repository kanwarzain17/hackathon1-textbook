# Data Model: Module 2 Content Outline

## Chapters & Technical Focus

### Chapter 1: gazebo-physics.md
- **Topic**: Physics Simulation with Gazebo
- **Concepts**:
    - Rigid body dynamics (Center of Mass, Inertia).
    - Contact physics (Friction, Bounciness).
    - Humanoid stability (Bipedal balance, CoM projection).
- **Goal**: Explain why the robot doesn't just "stay up" in sim.

### Chapter 2: unity-interaction.md
- **Topic**: Environment & Interaction in Unity
- **Concepts**:
    - High-fidelity rendering (Shaders, Lighting for perception).
    - Human-Robot Interaction (Social cues, joint animations).
    - Rendering vs Physics (Why use Unity? Immersive testing).
- **Goal**: Show the value of Unity for social robotics.

### Chapter 3: sensor-simulation.md
- **Topic**: Sensor Simulation (Virtual Perception)
- **Concepts**:
    - Range sensors: LiDAR (Ray-casting).
    - Vision: Depth Cameras (Depth buffers).
    - Interior sensors: IMU (Acceleration, Gyroscopic drift).
- **Goal**: Bridge the gap between sim data and perception algorithms.

## Metadata Schema
```yaml
id: [filename]
title: [Human title]
sidebar_label: [Short label]
sidebar_position: [Index]
slug: /modules/physical-ai/module-2/[filename]
```
