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

Everything installs inside the project folder (no global installs).

```
npm run setup   # node packages + Python venv in ai-backend/.venv
npm run dev     # client :5173, server :5000, AI backend :8000
```

- No `.env` needed locally: without `MONGO_URI` the server starts a local MongoDB
  (downloaded once into `server/.mongo-bin`, data kept in `server/.mongo-data`).
  See `server/.env.example` to use your own MongoDB / JWT secret.
- Demo accounts are seeded on first run: `patient@demo.com`, `donor@demo.com`,
  `hospital@demo.com` — password `Demo@1234`. Or sign up from the login page.
- Client env (optional): `VITE_API_URL`, `VITE_AI_URL` to point at deployed backends.

## 📝 License

This project is licensed under the [MIT License](LICENSE).



