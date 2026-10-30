import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHeartbeat,
  FaPhoneAlt,
  FaEnvelope,
  FaNotesMedical,
  FaAngleDoubleUp,
} from "react-icons/fa";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        if (userType !== "patient" || !token) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        const response = await fetch(`${BASE_URL}/verify/patient`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();
        setPatient(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [navigate, token, userType]);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto p-6 bg-white rounded border border-gray-200 text-sm text-gray-500">
          Loading patient profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Patient Profile | RaktConnect" />

      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto bg-white p-6 rounded border border-gray-200">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h1 className="text-lg font-bold text-gray-900">Patient Profile</h1>
            <p className="text-xs text-gray-500">Your personal patient account details</p>
          </div>

          {error && <div className="text-xs text-red-600 mb-3">{error}</div>}

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaUser className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Name</span>
                <strong className="text-gray-800">{patient?.name || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaAngleDoubleUp className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Age</span>
                <strong className="text-gray-800">{patient?.age || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaHeartbeat className="text-red-600" />
              <div>
                <span className="text-xs text-gray-500 block">Blood Group</span>
                <strong className="text-red-700">{patient?.bloodType?.toUpperCase() || "Not specified"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaPhoneAlt className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Phone</span>
                <strong className="text-gray-800">{patient?.phoneNumber || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaEnvelope className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Email</span>
                <strong className="text-gray-800">{patient?.emailId || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaNotesMedical className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Medical History / Condition</span>
                <strong className="text-gray-800">{patient?.medicalCondition || "None reported"}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
