import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";

const Donations = () => {
  const navigate = useNavigate();
  const [donationHistory, setDonationHistory] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchDonationHistory = async () => {
      if (userType !== "donor" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/donor/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authToken }),
        });

        const data = await response.json();
        if (data.success) {
          setDonationHistory(data.donations || []);
          setUpcomingAppointments(data.appointments || []);
        }
      } catch (error) {
        console.error("Error fetching donation history:", error);
      }
    };

    fetchDonationHistory();
  }, [userType, authToken, navigate]);

  return (
    <>
      <PageMeta title="My Donations | RaktConnect" />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h1 className="text-xl font-bold text-gray-900">Donation History & Schedule</h1>
            <p className="text-xs text-gray-600">Track past blood donation records and scheduled visits</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Table */}
            <div className="lg:col-span-2 bg-white p-5 rounded border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Completed Donations
              </h2>

              {donationHistory.length === 0 ? (
                <p className="text-xs text-gray-500 py-6 text-center">
                  No previous donation records logged.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-gray-200">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                      <tr>
                        <th className="p-2.5 border-b">Date</th>
                        <th className="p-2.5 border-b">Type</th>
                        <th className="p-2.5 border-b">Volume</th>
                        <th className="p-2.5 border-b">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {donationHistory.map((donation, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-2.5">{new Date(donation.date).toLocaleDateString()}</td>
                          <td className="p-2.5">{donation.type}</td>
                          <td className="p-2.5">{donation.volume} ml</td>
                          <td className="p-2.5">
                            <span className="inline-flex items-center gap-1 font-medium text-green-700">
                              {donation.status === "completed" ? (
                                <FaCheckCircle size={12} />
                              ) : (
                                <FaClock size={12} className="text-gray-500" />
                              )}
                              {donation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Upcoming */}
            <div className="bg-white p-5 rounded border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Upcoming Appointments
              </h2>

              {upcomingAppointments.length === 0 ? (
                <div className="text-xs text-gray-500 text-center py-6">
                  No upcoming appointments booked.
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded text-xs space-y-1">
                      <div className="font-semibold text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="text-gray-600">{appointment.location}</div>
                      <div className="text-gray-500">Type: {appointment.type}</div>
                      <button
                        onClick={() => navigate(`/donor/appointment/${appointment.id}`)}
                        className="mt-2 text-xs bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded"
                      >
                        Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donations;
