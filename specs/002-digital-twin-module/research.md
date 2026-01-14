# Research: Module 2 Integration

## Decision: Gazebo Version
- **Choice**: Gazebo Sim (formerly Ignition).
- **Rationale**: Modern ROS 2 distributions (Humble, Jazzy) favor Gazebo Sim. It provides a more robust plugin architecture and standardized message passing for sensors.
- **Goal**: Conceptual focus on the entity-component system (ECS) in Gazebo Sim.

## Decision: Unity Integration Pattern
- **Choice**: Unity Robotics Hub and `ROS-TCP-Connector`.
- **Rationale**: This is the industry-standard way to connect Unity to ROS 2. It handles high-fidelity rendering while maintaining low-latency communication with the ROS graph.
- **Focus**: Emphasize how Unity can handle complex bipedal animations that would be computationally expensive in a standard physics sim.

## Decision: Sensor Simulation
- **Choice**: Ray-casting for LiDAR and depth maps for vision.
- **Rationale**: Matches how Gazebo and Unity internally calculate occupancy and depth. Explains the "Reality Gap" by discussing how noise models (Gaussian) are applied to these perfect geometric intersections.

## Alternatives Considered
- Gazebo Classic: Rejected as it is nearing end-of-life for future ROS 2 versions.
- Nvidia Isaac Sim: Rejected as it often exceeds "free-tier" or standard student hardware capabilities, whereas Unity and Gazebo are more accessible.
