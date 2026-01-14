---
id: sensor-simulation
title: Sensor Simulation (Virtual Perception)
sidebar_label: 3. Sensor Simulation
sidebar_position: 3
slug: /modules/module-2/sensor-simulation
---

# Sensor Simulation

A digital twin is only complete when the robot can perceive its virtual environment. We simulate this by generating data from virtual sensors.

## 1. Range Sensors (LiDAR)

LiDAR simulation in Gazebo and Unity typically uses **Ray-casting**. The engine casts a line from the sensor origin; if it hits a virtual object, it returns a distance.
- **Output**: Point clouds or laser scan messages.

## 2. Vision (Depth Cameras)

Depth cameras are simulated by reading the **Depth Buffer** of the rendering engine. Each pixel stores the distance to the nearest object.
- **Output**: Depth maps and RGB-D images.

## 3. Interior Sensors (IMU)

The **Inertial Measurement Unit (IMU)** is simulated by reading the linear acceleration and angular velocity of the robot's base body from the physics engine.

## The Sim-to-Real Gap

Simulated sensors are often "too perfect." To make them realistic, we apply:
- **Noise Models**: Adding Gaussian noise to distance readings.
- **Latency**: Simulating the time it takes for a real sensor to process and send a packet.

Understanding these discrepancies is vital for **Sim-to-Real** transfer, ensuring that AI trained in a digital twin can still function in the messy real world.
