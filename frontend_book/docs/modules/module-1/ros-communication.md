---
id: ros-communication
title: Topics, Services, and Real-time Communication
sidebar_label: 2. Communication
sidebar_position: 2
slug: /modules/module-1/ros-communication
---

# Topics, Services, and Communication

In a humanoid robot, information must flow efficiently. ROS 2 provides two primary communication patterns: **Topics** and **Services**.

## 1. Topics (Pub/Sub)

Topics are used for continuous data streams. They follow a **Publisher/Subscriber** model.

- **Asynchronous**: The sender doesn't wait for a reply.
- **Use Case**: Sensor data (IMU, Joint states, Battery level).

### Code Example: Python Pulse Node

Here is a simple `rclpy` node that publishes a heart pulse:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class PulseNode(Node):
    def __init__(self):
        super().__init__('pulse_node')
        self.publisher_ = self.create_publisher(String, 'pulse', 10)
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Pulse: OK'
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    node = PulseNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## 2. Services (Req/Res)

Services are used for discrete actions. They follow a **Request/Response** model.

- **Synchronous**: The client waits for the server to finish the task.
- **Use Case**: Enabling motors, resetting sensors, or complex path-finding requests.

## Real-time Considerations

Humanoids require low-latency communication for stability. Imagine the robot tilt sensor data being delayed—it would fall over before the "brain" could react. ROS 2 uses **DDS (Data Distribution Service)** to ensure reliable, high-speed delivery of these critical packets.
