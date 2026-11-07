<!-- 
=============================================================================
CONFIDENTIALITY NOTICE: WIPO / NNN / NDA PROTECTED
=============================================================================
Exclusive Intellectual Property of F1725 Development Technologies.
Total or partial disclosure, use, or reproduction is strictly prohibited 
without the express written authorization of the author.

Non-Disclosure, Non-Use, and Non-Circumvention (NNN) Agreement applies.
All rights reserved under international intellectual property laws (WIPO).
=============================================================================
-->

# 🥽 Klarixa Spatial Inspector
**Meta VR Start Developer Competition 2026**  
**Category:** Productivity / Enterprise Mixed Reality (Search & Rescue / Industrial Inspection)

## 🚀 Executive Summary
Klarixa Spatial Inspector is a Mixed Reality (XR) command interface designed for the safe and efficient orchestration of autonomous drone swarms in critical environments. It empowers a single operator to visualize, control, and annotate a real-time Digital Twin, fusing multi-sensor data through the **Nonacortex 5-3-1** multi-agent architecture.

## 🎯 The Problem
Industrial inspection and Search & Rescue (SAR) operations in hostile environments are slow, dangerous, and lack collaborative real-time context. Current solutions fragment telemetry, video, and decision-making into disconnected silos, increasing operator cognitive load and reaction time.

## 💡 The Solution: Klarixa XR
A WebXR-native application for Meta Quest 3 that transforms the operator into the "Zero Node" of the swarm. Leveraging **Meta Presence Platform** principles, the system delivers:

1. **Asymmetric Bimanual Control:** 
   - *Left Hand:* 360° spatial navigation of the drone swarm.
   - *Right Hand:* Gaze/Eye-Tracking targeting + Trigger confirmation.
2. **Dynamic Spatial Anchors:** Fixating gaze and triggering on an anomaly (e.g., a structural fracture or victim) places a persistent holographic marker at exact 3D coordinates.
3. **Asynchronous Processing (Nonacortex 5-3-1):** While the operator continues exploring, the system processes the marker in the background, updating its state (e.g., severity color-coding) and triggering 3D spatial audio alerts.
4. **Low-Friction Interoperability:** Conceptual integration of Push-to-Talk (PTT) and video to pre-programmed channels (e.g., WhatsApp) for immediate collaboration without breaking immersion.

## 🧠 Core Architecture: Nonacortex 5-3-1
Klarixa is powered by a 9-node neuromorphic architecture distributed across three layers:

- **Layer 1: Sensors / Edge (Nodes 1-5):** Computer Vision (4K+Thermal), LiDAR (3D mapping), Gas/Air Quality, Directional Audio, and IMU/Barometer/RTK.
- **Layer 2: Fusion / Processing (Nodes 6-8):** Sensor fusion, On-device ML anomaly classification, and Local Digital Twin generation.
- **Layer 3: Decision / Router (Node 9):** The Nonacortex Orchestrator. Prioritizes tasks, distributes load across the 6+1 swarm, and enforces **KSHIELD** (critical security validation for high-risk commands).

## 🚁 Swarm Topology: 6+1
- **6 Tactical Drones:** Adaptable hexagonal formation with interchangeable modules (Alpha: SAR, Beta: Industrial, Gamma: Tactical/RF).
- **1 Satellite Node (SAT-07):** Mesh network anchor at 6km altitude, providing macro-sensor coverage over 50 km².

## 🛠️ Technical Stack & Execution
- **Frontend XR:** WebXR API, A-Frame / Three.js (Lightweight 3D rendering compatible with Meta Quest Browser).
- **Logic:** Modular JavaScript simulating the Nonacortex processing queue.
- **Security:** KSHIELD protocol simulation for encrypted swarm command validation.
- **Deployment:** GitHub Pages (HTTPS native, zero-latency global CDN).

## 🎮 How to Run the Demo
No APK installation or physical drone hardware is required.

1. Open this repository in **Meta Quest 3 Browser** or **Chrome Dev (Android)** with WebXR enabled.
2. Click the **"ENTRAR EN XR"** (Enter XR) button.
3. **Interact:** 
   - Use Gaze (1.5s dwell) or Click/Tap on 3D objects to "Mark Hazard".
   - Observe the live telemetry and the Mission Log (Bitácora) updating in real-time.

## 📄 Methodology & Development Context
Please refer to the accompanying document: [`JUDGE_CONTEXT.md`](./JUDGE_CONTEXT.md) for a detailed overview of the development environment, AI orchestration strategy, and architectural methodology used to build this project.

## 👨‍💻 Author
**Freddy** | Founder & Lead Architect, **F1725 Development Technologies**  
*Building digital sovereignty and autonomous AI ecosystems from the Edge.*