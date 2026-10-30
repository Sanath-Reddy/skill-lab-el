import bcrypt from "bcrypt";
import Patient from "../models/patient.js";
import Donor from "../models/donor.js";
import Hospital from "../models/hospital.js";

export const DEMO_PASSWORD = "Demo@1234";

// Creates demo accounts on an empty database so every dashboard can be tried out
const seedDemoData = async () => {
  if ((await Hospital.estimatedDocumentCount()) > 0) return;

  const password = await bcrypt.hash(DEMO_PASSWORD, 10);

  await Hospital.insertMany([
    {
      name: "City General Hospital",
      emailId: "hospital@demo.com",
      password,
      phoneNumber: "9876543210",
      licenseNumber: "KA-HOSP-001",
      state: "Karnataka",
      district: "Bengaluru Urban",
      bloodInventory: {
        A_positive: 12, A_negative: 4, B_positive: 15, B_negative: 3,
        AB_positive: 6, AB_negative: 2, O_positive: 20, O_negative: 5,
      },
    },
    {
      name: "Lifeline Medical Centre",
      emailId: "lifeline@demo.com",
      password,
      phoneNumber: "9876543211",
      licenseNumber: "KA-HOSP-002",
      state: "Karnataka",
      district: "Mysuru",
      bloodInventory: {
        A_positive: 8, A_negative: 0, B_positive: 10, B_negative: 1,
        AB_positive: 3, AB_negative: 0, O_positive: 14, O_negative: 2,
      },
    },
  ]);

  await Patient.create({
    name: "Demo Patient",
    emailId: "patient@demo.com",
    password,
    phoneNumber: "9876543212",
    age: 30,
  });

  await Donor.create({
    name: "Demo Donor",
    emailId: "donor@demo.com",
    password,
    phoneNumber: "9876543213",
    age: 25,
  });

  console.log(`Seeded demo accounts (patient/donor/hospital@demo.com, password ${DEMO_PASSWORD})`);
};

export default seedDemoData;
