import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import BASE_URL from "../../apiConfig";
import { toast } from "react-toastify";
import PageMeta from "../common/PageMeta";

const Requests = () => {
  const navigate = useNavigate();
  const [requestHistory, setRequestHistory] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);

  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchBloodHistory = async () => {
      if (userType !== "patient" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/patient/requestHistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authToken }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blood history");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const newRequestHistory = [];
          const newActiveRequests = [];

          data.data.forEach((request) => {
            const formattedData = {
              _id: request._id,
              bloodType: request.bloodType,
              units: request.units,
              urgency: request.urgencyLevel,
              requestDate: new Date(request.requestDate).toLocaleDateString(),
              status: request.status,
            };

            newRequestHistory.push(formattedData);

            if (request.status === "active") {
              newActiveRequests.push(formattedData);
            }
          });

          setRequestHistory(newRequestHistory);
          setActiveRequests(newActiveRequests);
        }
      } catch (error) {
        console.error("Error fetching blood history:", error.message);
      }
    };

    fetchBloodHistory();
  }, [userType, authToken, navigate]);

  const cancelRequest = async (requestId) => {
    try {
      const response = await fetch(`${BASE_URL}/patient/cancelRequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authToken, requestId }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Request cancelled successfully");
        setActiveRequests((prev) =>
          prev.filter((req) => req._id !== requestId)
        );
        setRequestHistory((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: "cancelled" } : req
          )
        );
      } else {
        toast.error(result.message || "Failed to cancel request");
      }
    } catch (error) {
      toast.error("Failed to cancel request");
      console.error("Error cancelling request:", error.message);
    }
  };

  return (
    <>
      <PageMeta title="My Requests | RaktConnect" />

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h1 className="text-xl font-bold text-gray-900">Blood Requests</h1>
            <p className="text-xs text-gray-600">Track status of your blood requisitions submitted to hospitals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* History Table */}
            <div className="lg:col-span-2 bg-white p-5 rounded border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Request Log
              </h2>

              {requestHistory.length === 0 ? (
                <div className="text-xs text-gray-500 py-6 text-center">
                  No previous blood requests recorded.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border border-gray-200">
                    <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                      <tr>
                        <th className="p-2.5 border-b">Date</th>
                        <th className="p-2.5 border-b">Blood Group</th>
                        <th className="p-2.5 border-b">Units</th>
                        <th className="p-2.5 border-b">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {requestHistory.map((request, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-2.5">{request.requestDate}</td>
                          <td className="p-2.5 font-medium">{request.bloodType}</td>
                          <td className="p-2.5">{request.units}</td>
                          <td className="p-2.5">
                            <span className="inline-flex items-center gap-1 font-medium capitalize">
                              {request.status === "fulfilled" && (
                                <FaCheckCircle size={12} className="text-green-600" />
                              )}
                              {request.status === "active" && (
                                <FaExclamationCircle size={12} className="text-yellow-600" />
                              )}
                              {(request.status === "rejected" || request.status === "cancelled") && (
                                <FaTimesCircle size={12} className="text-red-600" />
                              )}
                              <span>{request.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Active Requests */}
            <div className="bg-white p-5 rounded border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Active Requests ({activeRequests.length})
              </h2>

              {activeRequests.length === 0 ? (
                <div className="text-xs text-gray-500 py-6 text-center">
                  No pending active requests.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeRequests.map((request) => (
                    <div key={request._id} className="p-3 border border-gray-200 rounded text-xs space-y-1">
                      <div className="flex justify-between items-center font-semibold">
                        <span className="text-gray-900">{request.bloodType} ({request.units} units)</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          request.urgency === "high" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {request.urgency}
                        </span>
                      </div>
                      <div className="text-gray-500">Needed by: {request.requestDate}</div>
                      <button
                        onClick={() => cancelRequest(request._id)}
                        className="mt-2 w-full text-xs border border-red-600 text-red-600 hover:bg-red-50 py-1 rounded font-medium"
                      >
                        Cancel Request
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

export default Requests;
