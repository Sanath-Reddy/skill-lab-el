import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Patient from "../models/patient.js";
import Donor from "../models/donor.js";
import Hospital from "../models/hospital.js";
import validateSignupData from "../utils/validation.js";
import requireAuth, { JWT_SECRET } from "../middleware/auth.js";

const authRouter = Router();

const models = { patient: Patient, donor: Donor, hospital: Hospital };

const signToken = (user, userType) =>
  jwt.sign({ id: user._id, userType }, JWT_SECRET, { expiresIn: "7d" });

// Signup
authRouter.post("/signup/:userType", async (req, res) => {
  try {
    const { userType } = req.params;
    const Model = models[userType];
    if (!Model) return res.status(400).json({ message: "Invalid user type" });

    validateSignupData(req, userType);

    const emailId = req.body.emailId.toLowerCase();
    if (await Model.findOne({ emailId })) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = new Model({ ...req.body, emailId, password: passwordHash });
    await user.save();

    res.status(201).json({
      message: "Signup successful!",
      token: signToken(user, userType),
      userType,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || "Error during signup" });
  }
});

// Login
authRouter.post("/login/:userType", async (req, res) => {
  try {
    const { userType } = req.params;
    const Model = models[userType];
    if (!Model) return res.status(400).json({ message: "Invalid user type" });

    const { emailId, password } = req.body;
    const user = await Model.findOne({ emailId: emailId?.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password || "", user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      token: signToken(user, userType),
      userType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify token and return the logged in user
const verify = async (req, res) => {
  try {
    const { userType } = req.params;
    const Model = models[userType];
    if (!Model) return res.status(400).json({ message: "Invalid user type" });
    if (userType !== req.userType) {
      return res.status(403).json({ message: "User type mismatch" });
    }

    const user = await Model.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Token verified", user });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Internal error" });
  }
};

authRouter.get("/verify/:userType", requireAuth(), verify);
authRouter.post("/verify/:userType", requireAuth(), verify);

export default authRouter;
