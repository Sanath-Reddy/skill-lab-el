import { Router } from "express";
import Hospital from "../models/hospital.js";

const apiRouter = Router();

apiRouter.get("/api/getHospitals", async (req, res) => {
  const { district, bloodType } = req.query;

  try {
    const hospitals = await Hospital.find({
      district: district,
      [`bloodInventory.${bloodType}`]: { $gt: 0 },
    }).select("-password");

    if (hospitals.length === 0) {
      return res
        .status(404)
        .json({ message: "No hospitals found with the requested blood type" });
    }
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Districts that have registered hospitals in a state
apiRouter.get("/api/districts", async (req, res) => {
  try {
    const districts = await Hospital.distinct("district", { state: req.query.state });
    res.json(districts.sort().map((district) => ({ district })));
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default apiRouter;
