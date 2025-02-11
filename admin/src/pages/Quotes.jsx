import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, CartesianGrid } from "recharts";

const barData = [
  { name: "Feature A", value: 400 },
  { name: "Feature B", value: 300 },
  { name: "Feature C", value: 500 },
  { name: "Feature D", value: 200 },
];

const pieData = [
  { name: "Users", value: 45 },
  { name: "Creators", value: 30 },
  { name: "Admins", value: 25 },
];

const lineData = [
  { name: "Jan", value: 300 },
  { name: "Feb", value: 400 },
  { name: "Mar", value: 350 },
  { name: "Apr", value: 500 },
];

const scatterData = [
  { x: 10, y: 30 },
  { x: 20, y: 50 },
  { x: 30, y: 80 },
  { x: 40, y: 100 },
];

const colors = ["#0088FE", "#00C49F", "#FFBB28"];

const Quotes = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Platform Insights</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="col-span-1 bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Feature Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Pie Chart */}
        <div className="col-span-1 bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Line Chart */}
        <div className="col-span-1 bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Scatter Plot */}
        <div className="col-span-1 bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Data Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="X-axis" />
              <YAxis type="number" dataKey="y" name="Y-axis" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatterData} fill="#ff7300" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
