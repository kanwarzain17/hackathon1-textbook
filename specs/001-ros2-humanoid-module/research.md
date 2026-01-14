# Research: Module 1 Implementation

## Decision: Docusaurus Setup
- **Choice**: `npx create-docusaurus@latest . docs --typescript` (with adjustments for docs-only preset).
- **Rationale**: User explicitly requested "docs-only preset". This minimizes unnecessary landing pages and focuses on the course content.
- **Alternatives Considered**:
    - Standard preset: Rejected because it includes a blog and landing page that aren't needed yet.
    - MkDocs: Rejected because Docusaurus was specifically requested.

## Decision: ROS 2 Content Patterns
- **Choice**: Use code blocks with language `python` for `rclpy` examples and `xml` for URDF.
- **Rationale**: Provides syntax highlighting and matches industry standards for these technologies.
- **Goal**: Keep `rclpy` examples under 50 lines per Scarlet Criteria (SC-002).

## Decision: Sidebars Structure
- **Choice**: Category-based sidebar in `sidebars.js`.
- **Rationale**: Groups Module 1 chapters logically.
- **Link**: `/docs/modules/module-1/`

## Technology Best Practices
- **Docusaurus**: Use `slug` metadata in Markdown files to control URLs.
- **ROS 2**: Emphasize asynchronous Pub/Sub for real-time data and synchronous Req/Res for configuration/tasks.
- **Humanoid Robotics**: Focus URDF explanation on the kinematic chain (Base -> Hip -> Knee -> Ankle).
