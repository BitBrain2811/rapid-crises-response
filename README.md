# CrisisControl: Hotel Emergency Response System

CrisisControl is a high-availability, real-time dashboard designed for hotel security and management to respond to incidents within seconds.

## Core Features

- **Live Alert Feed**: High-vulnerability events (Fire, Medical, Police) are pushed instantly to all connected staff.
- **SOS Terminal**: A fail-safe mechanism that allows anyone to broadcast their exact location during a crisis (Hold for 2 seconds to trigger).
- **Geospatial Mapping**: Visualize every active alert on an interactive map using the browser's Geolocation API.
- **Status Marshalling**: Admins and staff can track and "Resolve" alerts in real-time, synchronizing the state across the entire team.

## Getting Started

1. **Wait for Provisioning**: Ensure Firebase setup is complete and terms are accepted in the AI Studio UI.
2. **Launch Application**: The system runs as a full-stack Express + React application.
3. **Trigger SOS**: Use the red SOS Terminal on the right to simulate a user-triggered emergency.
4. **Broadcast Alert**: Use the "New Alert" button in the header to manually distribute a staff alert.

## Technical Architecture

- **Frontend**: React 19 + Tailwind CSS for a high-density "Mission Control" aesthetic.
- **Backend**: Express.js handling health checks and static serving.
- **Database**: Firebase Firestore for sub-second real-time state synchronization.
- **Security**: Hardened Firestore Rules enforcing data integrity and preventing unauthorized state transitions.

## Security & Privacy

This application uses the Browser Geolocation API. Users must grant permission for their location to be shared with the response team during an emergency.
