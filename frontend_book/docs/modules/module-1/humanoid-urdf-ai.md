---
id: humanoid-urdf-ai
title: Humanoid Description with URDF
sidebar_label: 3. URDF & Python Agents
sidebar_position: 3
slug: /modules/module-1/humanoid-urdf-ai
---

# Humanoid Description with URDF

To control a robot, the software must know what the robot looks like physically. We use **URDF (Universal Robot Description Format)** for this.

## Links and Joints

A humanoid robot is modeled as a tree of **Links** connected by **Joints**.

- **Link**: A rigid body (like a bone).
- **Joint**: A connection between two links (like a motor in a knee).

### The Kinematic Chain

For a humanoid, the chain typically starts from a `base_link` (usually the torso or pelvis) and branches out:

1.  **Lower Body**: Pelvis -> Hip -> Knee -> Ankle -> Foot.
2.  **Upper Body**: Torso -> Shoulder -> Elbow -> Wrist -> Hand.
3.  **Head**: Neck -> Head.

## How AI Maps to URDF

When your AI model calculates that the "Knee should bend 15 degrees", it sends a command to a specific joint name defined in the URDF.

```xml
<joint name="knee_joint" type="revolute">
  <parent link="thigh"/>
  <child link="shin"/>
  <axis xyz="0 1 0"/>
  <limit effort="100" velocity="1.0" lower="-1.57" upper="0"/>
</joint>
```

Your Python logic (using `rclpy`) acts as the "Controller" that reads the AI's intent and translates it into these joint-specific voltages/currents.
