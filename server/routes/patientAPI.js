import { Router } from "express";
import BloodRequest from "../models/bloodRequest.js";
import requireAuth from "../middleware/auth.js";

const patientRouter = Router();

patientRouter.post("/patient/bloodRequests", requireAuth("patient"), async (req, res) => {
  try {
    const { hospitalId, units, bloodType, urgencyLevel, requestDate, note } = req.body;

    if (!hospitalId || !units || !bloodType || !urgencyLevel || !requestDate) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const bloodRequest = new BloodRequest({
      patientId: req.userId,
      hospitalId,
      bloodType,
      units,
      urgencyLevel,
      requestDate,
      note,
      status: "active",
    });

    await bloodRequest.save();
    res.status(201).json({ message: "Blood request created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});

patientRouter.post("/patient/requestHistory", requireAuth("patient"), async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.find({ patientId: req.userId }).sort({
      requestDate: -1,
    });
    res.status(200).json({ success: true, data: bloodRequests });
  } catch (error) {
    console.error("Error fetching blood history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

patientRouter.post("/patient/cancelRequest", requireAuth("patient"), async (req, res) => {
  try {
    const request = await BloodRequest.findOneAndUpdate(
      { _id: req.body.requestId, patientId: req.userId, status: "active" },
      { status: "cancelled" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found or already processed" });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    console.error("Error cancelling blood request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default patientRouter;
