import { Router } from "express";
import Donor from "../models/donor.js";
import BloodDonation from "../models/bloodDonation.js";
import requireAuth from "../middleware/auth.js";

const donorRouter = Router();

donorRouter.post("/donor/checkInfo", requireAuth("donor"), async (req, res) => {
  try {
    const user = await Donor.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const missing = !user.bloodType || !user.lastDonationDate || !user.state || !user.district;

    res.json({ missing, user });
  } catch (error) {
    console.error("Check error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

donorRouter.post("/donor/updateInfo", requireAuth("donor"), async (req, res) => {
  try {
    const user = await Donor.findByIdAndUpdate(
      req.userId,
      {
        bloodType: req.body.bloodType,
        lastDonationDate: req.body.lastDonationDate,
        state: req.body.state,
        district: req.body.district,
        medicalCondition: req.body.medicalCondition,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "Donor not found" });

    res.json({ success: true, donor: user });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update donor info" });
  }
});

donorRouter.post("/donor/history", requireAuth("donor"), async (req, res) => {
  try {
    const records = await BloodDonation.find({ donorId: req.userId })
      .populate("hospitalId", "name")
      .sort({ donationDate: -1 });

    const now = new Date();
    const format = (d) => ({
      id: d._id,
      date: d.donationDate,
      location: d.hospitalId?.name || "Hospital",
      type: d.bloodType,
      volume: d.unitsDonated * 450,
      status: d.status === "fulfilled" ? "completed" : d.status,
    });

    res.json({
      success: true,
      donations: records.filter((d) => d.donationDate <= now).map(format),
      appointments: records.filter((d) => d.donationDate > now).map(format),
    });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch history" });
  }
});

export default donorRouter;
