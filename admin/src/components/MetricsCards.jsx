import React from "react";

const metrics = [
  { title: "Customers", value: "12.3k" },
  { title: "Website Views", value: "21.6k" },
  { title: "Orders", value: "34.4k" },
  { title: "Growth", value: "15.6%" },
];

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white shadow p-4 rounded-lg text-center border-t-4 border-green-500"
        >
          <p className="text-gray-600">{metric.title}</p>
          <h2 className="text-2xl font-bold text-green-700">{metric.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
