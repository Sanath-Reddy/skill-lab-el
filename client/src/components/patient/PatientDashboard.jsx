import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../apiConfig";
import { toast } from "react-toastify";
import PageMeta from "../common/PageMeta";

const PatientDashboard = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [requestData, setRequestData] = useState({
    units: "",
    urgency: "low",
    date: "",
    note: "",
  });
  const [districts, setDistricts] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const fetchDistricts = async (selectedState) => {
    if (!selectedState) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/districts?state=${encodeURIComponent(selectedState)}`
      );
      const data = await response.json();
      setDistricts(Array.isArray(data) ? data : []);
      setDistrict("");
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const fetchHospitals = async () => {
    if (!state || !district || !bloodType) {
      toast.warn("Please select state, district, and blood type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}/api/getHospitals?district=${encodeURIComponent(
          district
        )}&bloodType=${encodeURIComponent(bloodType)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load hospitals");
      }
      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError(error.message);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestBlood = (hospital) => {
    setSelectedHospital(hospital);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRequestData({ units: "", urgency: "low", date: "", note: "" });
  };

  const isFormValid = requestData.units && requestData.urgency && requestData.date;

  const handleSubmitRequest = async () => {
    if (!isFormValid) return;

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setNotification("User not authenticated!");
      return;
    }

    if (!selectedHospital) {
      setNotification("Please select a hospital.");
      return;
    }

    const requestBody = {
      hospitalId: selectedHospital._id,
      units: requestData.units,
      bloodType: bloodType,
      urgencyLevel: requestData.urgency,
      requestDate: requestData.date,
      note: requestData.note,
      token: authToken,
    };

    try {
      const response = await fetch(`${BASE_URL}/patient/bloodRequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        handleCloseModal();
        setNotification("Blood request sent successfully!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        setNotification("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const userType = localStorage.getItem("userType");
      const authToken = localStorage.getItem("authToken");

      if (userType !== "patient" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/verify/patient`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        setIsAuthenticating(false);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    authenticateUser();
  }, [navigate]);

  if (isAuthenticating) {
    return (
      <div className="p-8 text-center text-sm text-gray-600">
        Verifying patient authentication...
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Patient Dashboard | RaktConnect" />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          {notification && (
            <div className="p-3 bg-green-100 border border-green-200 text-green-800 text-xs rounded">
              {notification}
            </div>
          )}

          <div className="border-b border-gray-200 pb-3">
            <h1 className="text-xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-xs text-gray-600">Find available blood units at nearby partner hospitals</p>
          </div>

          {/* Search Box */}
          <div className="bg-white p-5 rounded border border-gray-200 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">Find Blood Units</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">State *</label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    fetchDistricts(e.target.value);
                  }}
                  required
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">District *</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                >
                  <option value="">Select District</option>
                  {districts.map((item, index) => (
                    <option key={index} value={item.district}>
                      {item.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Required Blood Type *</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A_positive">A+</option>
                  <option value="A_negative">A-</option>
                  <option value="B_positive">B+</option>
                  <option value="B_negative">B-</option>
                  <option value="AB_positive">AB+</option>
                  <option value="AB_negative">AB-</option>
                  <option value="O_positive">O+</option>
                  <option value="O_negative">O-</option>
                </select>
              </div>
            </div>

            <button
              onClick={fetchHospitals}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded"
            >
              Search Hospitals
            </button>
          </div>

          {loading && <p className="text-xs text-gray-600 text-center py-4">Searching hospital databases...</p>}
          {error && <p className="text-xs text-red-600 text-center py-4">{error}</p>}

          {/* Hospitals List */}
          {hospitals.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Matching Hospitals ({hospitals.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitals.map((hospital) => (
                  <div
                    key={hospital.id || hospital._id}
                    className="p-4 bg-white border border-gray-200 rounded flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {hospital.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">{hospital.district}, {hospital.state}</p>
                      <p className="text-xs text-gray-500 mb-3">Phone: {hospital.phoneNumber || "N/A"}</p>

                      <div className="border-t border-gray-100 pt-2 mb-3">
                        <span className="text-[11px] font-medium text-gray-500 block mb-1">Available Units:</span>
                        <div className="text-xs text-gray-700">
                          {hospital.bloodInventory &&
                            Object.entries(hospital.bloodInventory)
                              .filter(([type]) => type === bloodType)
                              .map(([type, units]) => (
                                <span key={type} className="inline-block bg-red-50 text-red-700 px-2 py-0.5 rounded font-semibold">
                                  {type.replace("_positive", "+").replace("_negative", "-")}: {units} units
                                </span>
                              ))}
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1.5 rounded"
                      onClick={() => handleRequestBlood(hospital)}
                    >
                      Request Blood
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Request Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-white p-5 rounded border border-gray-300 max-w-sm w-full space-y-3">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Request Blood from {selectedHospital?.name}
                </h3>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Units Required *</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    value={requestData.units}
                    onChange={(e) => setRequestData({ ...requestData, units: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Urgency Level *</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white"
                    value={requestData.urgency}
                    onChange={(e) => setRequestData({ ...requestData, urgency: e.target.value })}
                  >
                    <option value="low">Low (Planned)</option>
                    <option value="medium">Medium</option>
                    <option value="high">High (Emergency)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Needed By Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    value={requestData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setRequestData({ ...requestData, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Doctor Note / Prescription</label>
                  <textarea
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    value={requestData.note}
                    onChange={(e) => setRequestData({ ...requestData, note: e.target.value })}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    className="bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded disabled:opacity-50"
                    onClick={handleSubmitRequest}
                    disabled={!isFormValid}
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
