import React, { useState } from "react";
import PageMeta from "../common/PageMeta";

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    weight: "",
    lastDonation: "",
    recentTravel: "",
    medications: "",
    healthCondition: "",
  });

  const [eligibility, setEligibility] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/check-eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setEligibility(data);
    } catch (error) {
      console.error("Error checking eligibility:", error);
    }
  };

  return (
    <>
      <PageMeta title="Eligibility Checker | RaktConnect" />
      <div className="min-h-screen py-10 px-4 flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded border border-gray-300 w-full max-w-md shadow-sm">
          <h1 className="text-lg font-bold mb-1 text-center text-gray-900">
            Donor Eligibility Assessment
          </h1>
          <p className="text-xs text-gray-500 text-center mb-6">
            Enter your vitals to verify current donation eligibility
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Weight (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                placeholder="e.g. 58"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Days since last donation:</label>
              <input
                type="number"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
                required
                placeholder="e.g. 90"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Recent International Travel (days ago):</label>
              <input
                type="number"
                name="recentTravel"
                value={formData.recentTravel}
                onChange={handleChange}
                placeholder="Leave blank if none"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Current Medications:</label>
              <input
                type="text"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                placeholder="e.g. None or antibiotics"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Health Conditions:</label>
              <select
                name="healthCondition"
                value={formData.healthCondition}
                onChange={handleChange}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
              >
                <option value="">Select Condition</option>
                <option value="none">None</option>
                <option value="hypertension">Hypertension</option>
                <option value="diabetes">Diabetes</option>
                <option value="anemia">Anemia</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded text-sm mt-3"
            >
              Verify Eligibility
            </button>
          </form>

          {eligibility && (
            <div className="mt-4 p-3 border rounded text-xs">
              <div className={`font-semibold mb-1 ${eligibility.isEligible ? 'text-green-700' : 'text-red-700'}`}>
                {eligibility.isEligible ? "Eligible to Donate" : "Not Eligible to Donate"}
              </div>
              <p className="text-gray-600">{eligibility.message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EligibilityChecker;
