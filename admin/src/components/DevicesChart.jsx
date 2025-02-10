import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mobile", value: 60 },
  { name: "Desktop", value: 30 },
  { name: "Tablet", value: 10 },
];

const COLORS = ["#34D399", "#10B981", "#064E3B"];

const DevicesChart = () => {
  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h3 className="text-lg font-bold text-gray-700">Devices</h3>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
              innerRadius={50}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-4 text-sm text-gray-600">
          {data.map((item, index) => (
            <div key={index}>
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></span>{" "}
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevicesChart;
