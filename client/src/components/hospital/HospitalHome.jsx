import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MainGraph from "./charts/MainGraph";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";

const initialInventory = {
  A: { units: 15, capacity: 40, donors: 8 },
  B: { units: 25, capacity: 40, donors: 12 },
  AB: { units: 5, capacity: 40, donors: 3 },
  O: { units: 35, capacity: 40, donors: 15 },
};

const criticalAlerts = [
  { id: 1, type: "AB+", level: "critical", message: "Only 2 units remaining" },
  { id: 2, type: "A-", level: "warning", message: "Below safety threshold" },
];

const recentDonations = [
  { id: 1, name: "John Doe", type: "O+", date: "2024-03-15", units: 2 },
  { id: 2, name: "Jane Smith", type: "A+", date: "2024-03-14", units: 1.5 },
];

const HospitalHome = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedBloodType, setSelectedBloodType] = useState("All");

  useEffect(() => {
    const interval = setInterval(() => {
      setInventory((prev) =>
        Object.entries(prev).reduce(
          (acc, [type, data]) => ({
            ...acc,
            [type]: {
              ...data,
              units: Math.max(
                0,
                data.units + Math.floor(Math.random() * 3 - 1)
              ),
            },
          }),
          {}
        )
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const userType = localStorage.getItem("userType");
      const authToken = localStorage.getItem("authToken");

      if (userType !== "hospital" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/verify/hospital`, {
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
        Verifying hospital authentication...
      </div>
    );
  }

  return (
    <>
      <PageMeta title="Hospital Dashboard | RaktConnect" />

      {/* Hospital Nav Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/hospital" className="flex items-center gap-2 font-bold text-lg text-red-600">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
            RaktConnect <span className="text-xs font-normal text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded">Hospital</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/hospital/requestmanagement"
              className="text-xs font-medium bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded"
            >
              Request Management
            </Link>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="text-xs border border-gray-300 text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Hospital Blood Management
              </h1>
              <p className="text-xs text-gray-600">Overview of blood stocks, patient requisitions, and analytics</p>
            </div>
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded">
              ● Connected
            </span>
          </div>

          {/* Critical Alerts */}
          {criticalAlerts.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs space-y-1">
              <span className="font-bold text-red-800">Critical Stock Notice:</span>
              <ul className="list-disc list-inside text-red-700 space-y-0.5">
                {criticalAlerts.map((alert) => (
                  <li key={alert.id}>
                    <strong>{alert.type}:</strong> {alert.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Inventory Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(inventory).map(([type, data]) => (
              <div key={type} className="p-4 bg-white border border-gray-200 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">{type}+</span>
                  <span className="text-xs font-semibold text-red-600">{data.units} Units</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                  <div
                    className="bg-red-600 h-full"
                    style={{ width: `${Math.min(100, (data.units / data.capacity) * 100)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-gray-500">
                  <span>Capacity: {data.capacity}</span>
                  <span>Donors: {data.donors}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Graph */}
          <div className="bg-white p-5 rounded border border-gray-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h2 className="text-sm font-semibold text-gray-900">
                Blood Stock & Demand Analytics
              </h2>
              <div className="flex gap-2">
                <select
                  className="px-2 py-1 text-xs border border-gray-300 rounded bg-white"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
                <select
                  className="px-2 py-1 text-xs border border-gray-300 rounded bg-white"
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                >
                  <option value="All">All Blood Groups</option>
                  {Object.keys(inventory).map((type) => (
                    <option key={type} value={type}>
                      {type}+
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <MainGraph timeRange={timeRange} bloodType={selectedBloodType} />
          </div>

          {/* Predictions & Recent Donations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white border border-gray-200 rounded space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Demand Forecasting</h3>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
                <p className="font-semibold text-gray-900">O+ Projected Shortage</p>
                <p className="text-gray-600">Expected 40% increase in trauma department usage next week.</p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
                <p className="font-semibold text-gray-900">Local Donors Matched</p>
                <p className="text-gray-600">12 verified compatible donors within hospital service area.</p>
              </div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Recent Donations Logged</h3>
              <div className="space-y-2">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="flex justify-between items-center text-xs p-2 bg-gray-50 border border-gray-100 rounded">
                    <div>
                      <strong className="text-gray-800">{donation.name}</strong>
                      <span className="text-gray-500 ml-2">({donation.type})</span>
                    </div>
                    <div className="text-gray-500">
                      {donation.units} units • {donation.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalHome;
