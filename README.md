# Strivora AI — Smart Goal & Task Mastery System 🚀

Strivora AI is a responsive, full-stack production-ready web application designed to help users define high-level objectives and automatically break them down into actionable milestones using AI. Built with the **MERN stack** and styled using **Material UI**, it leverages robust client-side routing, automated authentication interceptors, and secure cloud-hosted micro-services.

ℹ️ **Live Demo:** [https://strivora-ai-1.onrender.com](https://strivora-ai-1.onrender.com)  
⚠️ *Note: Hosted on Render's free tier. Please allow 30–50 seconds for the backend to spin up on your initial visit.*

---

## 🌟 Key Features

* **AI-Powered Task Decomposition:** Integrates the Gemini API to intelligently parse complex goals into structured, bite-sized tasks.
* **Secure Architecture:** Implements JSON Web Token (JWT) user authentication coupled with customized **Axios Interceptors** to automatically attach bearer tokens and handle expired sessions seamlessly.
* **Robust CORS & Security Management:** Secure cross-origin resource sharing limits access strictly to trusted domains while protecting third-party AI credentials using server-side environment configurations.
* **Modern Dashboard Metrics:** Visualizes task completion, goal velocity, and user productivity trends using dynamic, interactive charts via `Recharts`.
* **Responsive Fluid Design:** A fully adaptive UI leveraging Material UI components designed to deliver a native app experience across both desktop and mobile viewports.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 19, JavaScript (ES6+)
* **Build Tool:** Vite (Optimized production asset compilation)
* **Routing:** React Router v7
* **State & Networking:** Axios (with custom request/response interception pipelines)
* **UI Components:** Material UI (MUI) & Emotion
* **Data Visualization:** Recharts

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **AI Core:** Google Gemini Pro API

---

## 📂 Project Structure

```text
Strivora_AI/
├── frontend/             # React Client Application (Vite Build Pipeline)
│   ├── src/
│   │   ├── api/          # Axios configurations & global interceptors
│   │   ├── components/   # Reusable UI elements & layouts
│   │   └── App.jsx       # Client routing logic
│   └── package.json
└── backend/              # Node.js Server Environment
    ├── config/           # Database setup and connection modules
    ├── routes/           # REST API endpoints (Auth, Goals, Tasks, Dashboard, AI)
    ├── server.js         # Core Express entry point
    └── package.json
