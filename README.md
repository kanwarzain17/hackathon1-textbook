# Physical AI & Humanoid Robotics Course

This repository contains the documentation and course materials for the "Physical AI & Humanoid Robotics" course.

## Course Structure

The course is built using Docusaurus and is located in the `frontend_book` directory.

### Module 1: The Robotic Nervous System (ROS 2)
Module 1 introduces ROS 2 as the middleware connecting AI intelligence to humanoid robot control.

- **1. ROS 2 Fundamentals**: Basic concepts of nodes and the ROS graph.
- **2. Python AI Integration**: Connecting Python agents to controllers using `rclpy`.
- **3. Humanoid Description (URDF)**: Physical body representation for software mapping.

### Module 2: The Digital Twin (Gazebo & Unity)
Module 2 focuses on digital twins using physics simulation and immersive environments.

- **1. Physics Simulation (Gazebo)**: Gravity, collisions, and humanoid dynamics.
- **2. Immersive Interaction (Unity)**: High-fidelity rendering and social robotics.
- **3. Sensor Simulation**: Generative perception (LiDAR, Depth, IMU) and Sim-to-Real.

### Module 3: The AI-Robot Brain (NVIDIA Isaac™)
Module 3 focuses on advanced AI perception, simulation, and humanoid navigation using NVIDIA Isaac Sim and Isaac ROS.

- **1. Isaac Sim Overview & Synthetic Data**: Photorealistic simulation and dataset generation with Omni.Replicator.
- **2. Isaac ROS & VSLAM**: Real-time mapping and localization from simulated sensors.
- **3. Nav2 Path Planning (Bipedal)**: Navigation configuration and recovery behaviors for humanoid locomotion.

## Development

### Prerequisites
- Node.js 24.12.0+
- npm 11.6.2+

### Getting Started
To run the documentation locally:

```bash
cd frontend_book
npm install
npm start
```

### Building for Production
To build the static site:

```bash
cd frontend_book
npm run build
```
