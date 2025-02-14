import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [total, setTotal] = useState(0);
  const [pendingGrievances, setPendingGrievances] = useState(0);
  const [closedGrievances, setClosedGrievances] = useState(0);
  const [spam, setSpam] = useState(0);
  const colors = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#6B7280", "#D946EF"];

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch("http://localhost:5000/grievance/allGrievances", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setGrievances(data);

          // Compute status counts
          const total = data.length;
          const pending = data.filter((g) => g.currentStatus !== "Resolution Provided" && g.currentStatus !== "Rejected" && g.currentStatus !== "Under Review").length;
          const closed = data.filter((g) => g.currentStatus === "Resolution Provided" || g.currentStatus === "Rejected").length;
          const spam = data.filter((g) => g.isspam !== false).length;
          setSpam(spam);
          setTotal(total);
          setPendingGrievances(pending);
          setClosedGrievances(closed);
        } else {
          console.error("Error fetching grievances:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchGrievances();
  }, []);

  // BarChart Data (Updated after grievances are fetched)
  const barData = [
    { name: "Pending", value: pendingGrievances },
    { name: "Resolved", value: closedGrievances },
    { name: "Under Review", value: total-pendingGrievances-closedGrievances },
    { name: "Spam", value: spam },
  ];

  // PieChart Data (Static for now)
  const pieData = [
    { name: "Public Safety", value: 80 },
    { name: "Water Supply", value: 60 },
    { name: "Electricity", value: 50 },
    { name: "Infrastructure", value: 45 },
    { name: "Health Issues", value: 40 },
    { name: "Others", value: 30 },
  ];

  // LineChart Data (Static for now)
  const lineData = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 95 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 180 },
    { name: "May", value: 210 },
    { name: "Jun", value: 230 },
    { name: "Jul", value: 250 },
    { name: "Aug", value: 270 },
  ];

  // ScatterChart Data (Static for now)
  const scatterData = [
    { x: 5, y: 40 },
    { x: 10, y: 90 },
    { x: 15, y: 150 },
    { x: 20, y: 200 },
    { x: 25, y: 250 },
    { x: 30, y: 270 },
  ];

  return (
    <div className="p-8 overflow-y-hidden bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🏛️ Platform Insights 
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Grievance Status Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">📊 Grievance Status Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grievance Categories Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">📌 Grievance Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    className="transition-all duration-300 hover:opacity-75"
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} cases`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Grievance Trends */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">📅 Monthly Grievance Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Resolution Efficiency */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🤖 AI Resolution Efficiency</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="Days Taken" />
              <YAxis type="number" dataKey="y" name="Resolved Cases" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={scatterData} fill="#EF4444" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
