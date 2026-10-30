import React, { useState } from 'react';
import { differenceInMonths } from "date-fns";
import PageMeta from '../common/PageMeta';

const Eligibility = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    lastDonation: "",
    chronicDisease: "No",
    diseaseName: "",
    recentProcedure: "No",
    feelingHealthy: "Yes",
  });

  const [eligibility, setEligibility] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkEligibility = () => {
    if (!formData.age || !formData.weight || !formData.lastDonation) {
      setEligibility("Please fill out all required fields.");
      return;
    }

    const age = Number(formData.age);
    const weight = Number(formData.weight);
    const lastDonationDate = new Date(formData.lastDonation);
    const monthsSinceLastDonation = differenceInMonths(new Date(), lastDonationDate);

    if (age < 18 || age > 65) {
      setEligibility("Not eligible: Age must be between 18 and 65.");
    } else if (weight < 50) {
      setEligibility("Not eligible: Minimum weight should be at least 50 kg.");
    } else if (formData.chronicDisease === "Yes" && !formData.diseaseName.trim()) {
      setEligibility("Not eligible: Please specify your chronic disease.");
    } else if (formData.chronicDisease === "Yes") {
      setEligibility("Not eligible: Chronic conditions restrict regular blood donation.");
    } else if (formData.recentProcedure === "Yes") {
      setEligibility("Not eligible: Please wait 6 months after tattoo, piercing, or major surgery.");
    } else if (formData.feelingHealthy === "No") {
      setEligibility("Not eligible: You must be in good current health to donate.");
    } else if (monthsSinceLastDonation < 3) {
      setEligibility("Not eligible: You must wait at least 3 months between donations.");
    } else {
      setEligibility("Eligible: You meet the basic requirements to donate blood.");
    }
  };

  return (
    <>
      <PageMeta title="Eligibility | RaktConnect" />

      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Donor Eligibility Checker
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Verify if you meet the medical guidelines for donating blood safely
            </p>
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Age (years) *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 60"
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Blood Donation Date *
              </label>
              <input
                type="date"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Do you have any chronic conditions (e.g. cardiac, kidney, cancer)?
              </label>
              <select
                name="chronicDisease"
                value={formData.chronicDisease}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {formData.chronicDisease === "Yes" && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  If yes, please specify condition
                </label>
                <input
                  type="text"
                  name="diseaseName"
                  value={formData.diseaseName}
                  onChange={handleChange}
                  placeholder="Condition name"
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tattoo, piercing, or surgical procedure in the last 6 months?
              </label>
              <select
                name="recentProcedure"
                value={formData.recentProcedure}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Are you currently feeling completely fit and healthy?
              </label>
              <select
                name="feelingHealthy"
                value={formData.feelingHealthy}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <button
              onClick={checkEligibility}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded transition-colors"
            >
              Evaluate Eligibility
            </button>

            {eligibility && (
              <div
                className={`p-3 rounded text-xs sm:text-sm border font-medium text-center ${
                  eligibility.startsWith("Eligible")
                    ? "bg-green-50 text-green-800 border-green-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                {eligibility}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Eligibility;
