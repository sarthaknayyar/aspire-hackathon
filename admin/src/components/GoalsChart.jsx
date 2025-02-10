import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 500 },
  { name: "Apr", uv: 700 },
  { name: "May", uv: 600 },
];

const GoalsChart = () => {
  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h3 className="text-lg font-bold text-gray-700">Projections and Goals</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="uv" fill="#34D399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalsChart;
