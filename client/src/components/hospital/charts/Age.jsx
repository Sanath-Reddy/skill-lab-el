import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import PageMeta from "../../common/PageMeta";

const donorAgeData = [
  { ageGroup: "18-25", donors: 150 },
  { ageGroup: "26-35", donors: 200 },
  { ageGroup: "36-45", donors: 180 },
  { ageGroup: "46-55", donors: 100 },
  { ageGroup: "56+", donors: 50 }
];

const Age = () => {
  return (
    <>
      <PageMeta title="Age Distribution | RaktConnect" />
      <div className="bg-white p-4 border border-gray-200 rounded">
        <h3 className="text-sm font-semibold mb-3 text-gray-800 text-center">
          Donor Age Distribution
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={donorAgeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="ageGroup" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="donors" fill="#dc2626" barSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Age;
