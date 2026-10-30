import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../apiConfig";
import { toast } from "react-toastify";
import PageMeta from "../common/PageMeta";

const BloodRequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBloodRequests();
  }, []);

  const fetchBloodRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/api/bloodRequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("authToken") }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/bloodRequests/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("authToken"),
            status: status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status");
      }

      await fetchBloodRequests();
      toast.success(`Request marked as ${status}.`);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(`Failed to update request status: ${err.message}`);
    }
  };

  return (
    <>
      <PageMeta title="Manage Blood Requests | RaktConnect" />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/hospital" className="flex items-center gap-2 font-bold text-lg text-red-600">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
            RaktConnect <span className="text-xs font-normal text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded">Hospital</span>
          </Link>

          <Link
            to="/hospital"
            className="text-xs text-gray-600 hover:text-red-600 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Patient Blood Requests
              </h1>
              <p className="text-xs text-gray-600">Review, approve, or reject incoming blood unit requests</p>
            </div>
            <button
              onClick={fetchBloodRequests}
              className="text-xs bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded"
            >
              Refresh List
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-gray-500 bg-white rounded border border-gray-200">
              Loading requests...
            </div>
          ) : error ? (
            <div className="p-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          ) : requests.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500 bg-white rounded border border-gray-200">
              No blood requests received yet.
            </div>
          ) : (
            <div className="bg-white rounded border border-gray-200 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Patient / ID</th>
                    <th className="p-3">Blood Group</th>
                    <th className="p-3">Units</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono text-gray-700">
                        {request.patientId?.name || request._id}
                      </td>
                      <td className="p-3 font-semibold text-gray-900">
                        {request.bloodType}
                      </td>
                      <td className="p-3 text-gray-800">
                        {request.units}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            request.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : request.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {request.status === "active" && (
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => updateStatus(request._id, "accepted")}
                              className="px-2.5 py-1 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => updateStatus(request._id, "rejected")}
                              className="px-2.5 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BloodRequestManagement;
