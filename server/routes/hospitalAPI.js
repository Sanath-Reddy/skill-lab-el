import { Router } from "express";
import BloodRequest from "../models/bloodRequest.js";
import requireAuth from "../middleware/auth.js";

const hospitalRouter = Router();

hospitalRouter.post("/api/bloodRequests", requireAuth("hospital"), async (req, res) => {
  try {
    const requests = await BloodRequest.find({ hospitalId: req.userId })
      .populate("patientId", "name phoneNumber")
      .sort({ requestDate: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

hospitalRouter.put("/api/bloodRequests/:id/status", requireAuth("hospital"), async (req, res) => {
  try {
    const request = await BloodRequest.findOneAndUpdate(
      { _id: req.params.id, hospitalId: req.userId },
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update status" });
  }
});

export default hospitalRouter;
