# 🩸 RaktConnect - Smart Blood Donation Platform

RaktConnect is a **MERN + AI-powered** blood donation platform that connects **hospitals, donors, and patients**. It helps hospitals manage **blood inventory**, donors track **donation history**, and patients request **blood efficiently**.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Features

### 🏥 **Hospital Segment**
- 📊 **Real-time Blood Inventory** (View available blood units)
- 🔮 **AI-based Blood Demand Forecasting** (Predict future shortages)
- 📋 **Manage Blood Requests** (Prioritize urgent cases)
- 📈 **Hospital Dashboard** (Analytics & Reports)

### 🩸 **Donor Segment**
- 🔄 **Donor Registration & Profile Management**
- 📆 **Donation History Tracking**
- 🔔 **AI-based Donation Reminders**
- 📊 **Donor Eligibility Insights (Chart-based)**

### 🚑 **Patient Segment**
- 🏥 **Blood Request System** (Submit & Track Requests)
- 🔄 **Match with Nearest Donors/Hospitals**
- 📝 **Medical History & Profile Management**
- 📊 **Blood Request Status Dashboard**

---

## 🛠 Tech Stack

| **Technology**      | **Purpose** |
|---------------------|------------|
| **MongoDB**        | Database for storing users, donors, and blood inventory |
| **Express.js**     | Backend framework for API handling |
| **React.js**       | Frontend framework for the user interface |
| **Node.js**        | Server-side runtime environment |
| **Recharts** | Data visualization for reports & analytics |
| **Tailwind CSS**   | Modern UI design framework |
| **Python**   | For AI data predictions |

---

## 📌 Installation & Setup

### Prerequisites
- **Node.js 18+** (with npm)
- **Python 3.10+** (with `venv`; on Debian/Ubuntu: `sudo apt install python3-venv`)
- Internet on the first run (downloads packages and a local MongoDB binary, ~80 MB)

Nothing is installed globally — all dependencies live inside the project folder.

### 1️⃣ Clone and install
```
git clone https://github.com/Sanath-Reddy/skill-lab-el.git
cd skill-lab-el
npm run setup
```
`npm run setup` installs the Node packages (client + server) and creates a Python
virtual environment in `ai-backend/.venv` with the AI dependencies.

### 2️⃣ Run
```
npm run dev
```
This starts all three services:

| Service    | URL                     |
|------------|-------------------------|
| Frontend   | http://localhost:5173   |
| API server | http://localhost:5000   |
| AI backend | http://localhost:8000   |

Open http://localhost:5173. The first start takes a minute while MongoDB downloads
(into `server/.mongo-bin`) and the AI models train.

### 3️⃣ Log in
Demo accounts are created automatically on the first run:

| Role     | Email               | Password    |
|----------|---------------------|-------------|
| Patient  | patient@demo.com    | `Demo@1234` |
| Donor    | donor@demo.com      | `Demo@1234` |
| Hospital | hospital@demo.com   | `Demo@1234` |

You can also create new accounts from the login page (passwords need A-Z, a-z,
0-9 and a symbol; phone numbers must be valid 10-digit Indian numbers).
To try the patient search, pick **Karnataka → Bengaluru Urban** (or Mysuru).

### ⚙️ Environment variables (optional)
**No `.env` file is required to run locally.** Defaults:

- Without `MONGO_URI`, the server runs its own MongoDB with data stored in
  `server/.mongo-data` (delete that folder to reset the database).
- `JWT_SECRET` falls back to a development secret.

To customise, copy the example file and edit it:
```
cp server/.env.example server/.env
```

| File          | Variable       | Purpose                                         |
|---------------|----------------|-------------------------------------------------|
| `server/.env` | `MONGO_URI`    | Use your own MongoDB (e.g. MongoDB Atlas)       |
| `server/.env` | `JWT_SECRET`   | Secret used to sign login tokens (set in prod)  |
| `server/.env` | `PORT`         | API port (default `5000`)                       |
| `client/.env` | `VITE_API_URL` | API server URL (default `http://localhost:5000`) |
| `client/.env` | `VITE_AI_URL`  | AI backend URL (default `http://localhost:8000`) |
| `ai-backend/.env` | `MONGO_URI` | Optional extra blood-demand history for forecasting |

### Running services separately
```
npm run dev --workspace=client   # frontend
npm run dev --workspace=server   # API server
npm run ai                       # AI backend
```

## 📝 License

This project is licensed under the [MIT License](LICENSE).



