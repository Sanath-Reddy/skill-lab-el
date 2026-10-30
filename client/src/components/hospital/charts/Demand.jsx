import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import PageMeta from "../../common/PageMeta";
import { AI_URL } from "../../../apiConfig";

const API_URL = `${AI_URL}/predict/bloodDemand`;

const BloodDemandChart = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setPredictions(data.predictions || []);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching predictions:", error);
        setError("Failed to load predictions");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-xs text-gray-500 py-6">Loading predictions...</p>;
  if (error) return <p className="text-center text-xs text-red-500 py-6">Error: {error}</p>;

  return (
    <>
      <PageMeta title="Demand Forecast | RaktConnect" />
      <div className="p-4 bg-white border border-gray-200 rounded">
        <h3 className="text-sm font-semibold mb-3 text-gray-800 text-center">
          Blood Demand Forecast
        </h3>
        {predictions.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={predictions} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="ds" 
                tick={{ fontSize: 10 }}
                tickFormatter={(tick) => new Date(tick).toLocaleDateString(undefined, { month: "short", day: "numeric" })} 
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="yhat" stroke="#dc2626" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-xs text-gray-500 py-6">No prediction data available</p>
        )}
      </div>
    </>
  );
};

export default BloodDemandChart;
