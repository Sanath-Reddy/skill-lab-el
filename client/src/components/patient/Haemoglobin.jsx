import React, { useState } from "react";
import { toast } from "react-toastify";
import PageMeta from "../common/PageMeta";

const HaemoglobinPredictor = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    dietary_habits: "",
    medical_history: "",
    previous_haemoglobin: "",
  });

  const [prediction, setPrediction] = useState(null);

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
      const response = await fetch(
        "https://raktconnect-ai-backend.onrender.com/predict/haemoglobin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      toast.success("Prediction calculated successfully!");
      setPrediction(data);
    } catch (error) {
      console.error("Error predicting haemoglobin:", error);
      toast.error("Failed to predict haemoglobin level. Please check network/backend.");
    }
  };

  return (
    <>
      <PageMeta title="Haemoglobin Predictor | RaktConnect" />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded border border-gray-300 w-full max-w-lg shadow-sm">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h1 className="text-lg font-bold text-gray-900">
              Haemoglobin Level Estimator
            </h1>
            <p className="text-xs text-gray-500">
              Machine learning-assisted estimation based on physiological parameters
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 24"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 65"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Height (cm) *</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 172"
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Dietary Habits *</label>
                <select
                  name="dietary_habits"
                  value={formData.dietary_habits}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
                >
                  <option value="">Select Dietary Habit</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Medical History *</label>
                <select
                  name="medical_history"
                  value={formData.medical_history}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-red-600"
                >
                  <option value="">Select Medical History</option>
                  <option value="none">None</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="hypertension">Hypertension</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Previous Haemoglobin Reading (g/dL) *
              </label>
              <input
                type="number"
                step="0.1"
                name="previous_haemoglobin"
                value={formData.previous_haemoglobin}
                onChange={handleChange}
                required
                placeholder="e.g. 13.5"
                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded text-sm mt-2"
            >
              Estimate Haemoglobin
            </button>
          </form>

          {prediction && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
              <h2 className="font-bold text-gray-900 text-sm">Prediction Output:</h2>
              <p className="text-gray-700">
                <span className="font-semibold">Estimated Hb: </span>
                <strong className="text-red-600">{prediction.predicted_haemoglobin} g/dL</strong>
              </p>
              {prediction.advice && (
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Dietary Advice: </span> {prediction.advice}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HaemoglobinPredictor;
