import React from "react";
import { CheckCircle, Hourglass, List } from "lucide-react";

const SummaryCards = ({ grievances }) => {
  const totalGrievances = grievances.length;
  const pendingGrievances = grievances.filter((g) => (g.currentStatus !== "Resolved" || g.currentStatus !== "Rejected")).length;
  const closedGrievances = totalGrievances - pendingGrievances;

  const cards = [
    {
      title: "Total Grievances",
      value: totalGrievances,
      icon: <List size={36} className="text-blue-500" />,
    },
    {
      title: "Pending Grievances",
      value: pendingGrievances,
      icon: <Hourglass size={36} className="text-yellow-500" />,
    },
    {
      title: "Resolved Grievances",
      value: closedGrievances,
      icon: <CheckCircle size={36} className="text-green-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-6 bg-white cursor-pointer border border-gray-200 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center justify-center mb-4">{card.icon}</div>
          <h2 className="text-4xl font-bold text-gray-900">{card.value}</h2>
          <p className="text-lg text-gray-600">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
