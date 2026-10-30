import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/connectDB.js";
import seedDemoData from "./utils/seed.js";

import authRouter from "./routes/auth.js";
import apiRouter from "./routes/apiRoutes.js";
import patientRouter from "./routes/patientAPI.js";
import donorRouter from "./routes/donorAPI.js";
import hospitalRouter from "./routes/hospitalAPI.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path);
  next();
});

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/, "https://raktconnect.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", authRouter);
app.use("/", apiRouter);
app.use("/", patientRouter);
app.use("/", donorRouter);
app.use("/", hospitalRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to RaktConnect API");
});

connectDB()
  .then(async () => {
    console.log("Database connected");
    await seedDemoData();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database:", err);
    process.exit(1);
  });
