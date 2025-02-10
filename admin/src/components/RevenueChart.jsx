import React from "react";

const revenueData = [
  { label: "Last Week", value: "$1.2k" },
  { label: "This Week", value: "$7.2k" },
  { label: "This Month", value: "$28.5k" },
];

const RevenueChart = () => {
  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h3 className="text-lg font-bold text-gray-700">Revenue by Period</h3>
      <div className="flex justify-around mt-4">
        {revenueData.map((item, index) => (
          <div key={index} className="text-center">
            <div
              className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center text-green-700 font-bold text-lg"
            >
              {item.value}
            </div>
            <p className="mt-2 text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
