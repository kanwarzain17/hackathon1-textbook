---
id: unity-interaction
title: Environment & Interaction in Unity
sidebar_label: 2. Unity Interaction
sidebar_position: 2
slug: /modules/module-2/unity-interaction
---

# Environment & Interaction in Unity

While Gazebo focuses on rigid-body physics, **Unity** is often used as the "Digital Twin" frontend for high-fidelity rendering and complex human-robot interaction (HRI).

## Rendering vs. Physics

Unity excels at:
- **Visual Realism**: Advanced lighting and shaders that better simulate what a real camera would see.
- **Large Environments**: Managing complex indoor or outdoor scenes with many interactive objects.

## Unity Robotics Hub

The **Unity Robotics Hub** and the `ROS-TCP-Connector` allow Unity to talk to the ROS graph just like any other node. This bridge enables:
- **Low-Latency Streams**: Send joint states from ROS to Unity to update the 3D model.
- **Social Interaction**: Testing how a humanoid should approach a human or signal intent using social cues.

## High-Fidelity Humanoids

In Unity, we can model bipedal animations and gestures with high detail. This is crucial for **Physical AI** because the "feel" of the robot's movement impacts how people perceive and trust it.

---

*In the final chapter, we'll examine how these virtual bodies "perceive" the world through simulated sensors.*
