---
id: gazebo-physics
title: Physics Simulation with Gazebo
sidebar_label: 1. Gazebo Physics
sidebar_position: 1
slug: /modules/module-2/gazebo-physics
---

# Physics Simulation with Gazebo

In this chapter, we explore **Gazebo Sim**, the primary physics engine used in the ROS 2 ecosystem. For humanoid robotics, Gazebo acts as the sandbox where we test balancing, walking, and manipulation.

## Rigid Body Dynamics

A humanoid robot is a complex assembly of rigid bodies. In simulation, we must account for:
- **Mass and Inertia**: How heavy each limb is and how resistant it is to rotation.
- **Center of Mass (CoM)**: The point where the robot's weight is balanced. In a bipedal humanoid, the CoM must be carefully managed to prevent falling.

## Contact Physics

When the robot's foot touches the floor, Gazebo calculates the interaction forces:
1.  **Friction**: Prevents the robot from sliding.
2.  **Restitution (Bounciness)**: Controls how much energy is lost when the foot impacts the ground.

## Why Simulation Matters for Stability

Humanoid stability is inherently difficult. By testing in Gazebo, we can:
- **Predict Falls**: See if a step is too wide or too fast.
- **Test Joint Limits**: Ensure the motors have enough torque to lift the body weight.
- **Safety**: A virtual robot can't break itself or hurt a human when it falls.

---

*Next, we'll see how Unity takes these concepts to a high-fidelity immersive environment.*
