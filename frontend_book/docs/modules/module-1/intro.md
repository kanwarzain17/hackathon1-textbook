---
id: intro
title: ROS 2 Fundamentals
sidebar_label: 1. Fundamentals
sidebar_position: 1
slug: /modules/module-1/intro
---

# ROS 2 Fundamentals

Welcome to Module 1 of the Physical AI & Humanoid Robotics course. In this chapter, we explore **ROS 2 (Robot Operating System 2)**, the "robotic nervous system" that connects AI intelligence to humanoid robot control.

## What is ROS 2?

ROS 2 is a middleware framework for robotics. It provides the infrastructure needed for different software components—called **Nodes**—to communicate with each other in a distributed system.

### Key Concepts for AI Students

As an AI/ML developer, you can think of ROS 2 as the bus that carries data between your neural networks and the robot's hardware.

1.  **Node**: A process that performs computation. For example, a "Vision Node" handles camera data, while a "Control Node" handles motor commands.
2.  **The ROS Graph**: The network of nodes and the communication channels between them.
3.  **Middleware Domain**: An isolated environment where nodes can discover and talk to each other.

## Why ROS 2 for Humanoids?

Humanoid robots are complex. They require high-frequency feedback loops for stabilization. ROS 2 provides:
- **Distributed Computing**: Offload heavy AI tasks to a GPU while keeping low-level control on a real-time CPU.
- **Fault Tolerance**: If one node crashes, the rest of the system can remain functional.
- **Hardware Abstraction**: Write code for one humanoid model and reuse it on another.

---

*In the next chapter, we will dive deep into ROS 2 Communication patterns: Topics and Services.*
