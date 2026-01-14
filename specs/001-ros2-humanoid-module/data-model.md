# Data Model: Module 1 Content Structure

## Chapters & Content Outline

### Chapter 1: intro.md
- **Topic**: ROS 2 Fundamentals
- **Abstract**: Introduction to ROS 2 as the "robotic nervous system".
- **Key Concepts**: Nodes (computational units), Graph (connectivity).
- **Interactive Element**: Diagram placeholder for Node-to-Node communication.

### Chapter 2: ros-communication.md
- **Topic**: Topics, Services, and Real-time Communication
- **Abstract**: Deep dive into how information flows in a humanoid.
- **Key Concepts**:
    - Topics: Pub/Sub for high-frequency sensor data (IMU, Joint states).
    - Services: Req/Res for discrete tasks (Enable motors, reset sensors).
- **Acceptance Check**: SC-001 (Distinguish pattern for battery vs camera vs joint).

### Chapter 3: humanoid-urdf-ai.md
- **Topic**: Python Agents and URDF
- **Abstract**: Bridge between AI logic and physical body.
- **Key Concepts**:
    - `rclpy`: Writing the brain in Python.
    - URDF: Defining the links (limbs) and joints (motors).
- **Scalability**: Covers full kinematic chain (Ankles to Neck).

## Metadata Schema (Markdown Frontmatter)
```yaml
id: [filename-without-extension]
title: [Human-friendly title]
sidebar_label: [Short title for sidebar]
sidebar_position: [Order number]
slug: /modules/module-1/[filename]
```
