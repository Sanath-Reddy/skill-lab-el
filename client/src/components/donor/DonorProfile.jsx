import { useState, useEffect } from "react";
import { FaUser, FaTint, FaCalendarAlt, FaNotesMedical } from "react-icons/fa";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";

const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${BASE_URL}/verify/donor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        setDonor(data.user);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto p-6 bg-white rounded border border-gray-200 text-sm text-gray-500">
          Loading donor profile...
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Donor Profile | RaktConnect" />
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-xl mx-auto bg-white p-6 border border-gray-200 rounded">
          <div className="border-b border-gray-200 pb-3 mb-4">
            <h1 className="text-lg font-bold text-gray-900">Donor Profile</h1>
            <p className="text-xs text-gray-500">Your registered volunteer donor credentials</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaUser className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Full Name</span>
                <strong className="text-gray-800">{donor?.name || "N/A"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaTint className="text-red-600" />
              <div>
                <span className="text-xs text-gray-500 block">Blood Group</span>
                <strong className="text-red-700">{donor?.bloodType?.toUpperCase() || "Not specified"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaCalendarAlt className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Last Donation Date</span>
                <strong className="text-gray-800">{donor?.lastDonationDate || "Never donated"}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 bg-gray-50 border border-gray-100 rounded">
              <FaNotesMedical className="text-gray-500" />
              <div>
                <span className="text-xs text-gray-500 block">Total Donations Recorded</span>
                <strong className="text-gray-800">{donor?.totalDonations || 0}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorProfile;
