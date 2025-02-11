import React from "react";

const SummaryCards = ({grievances}) => {
    console.log(grievances);
    const totalGrievances = grievances.length;
      const pendingGrievances = grievances.filter((g) => g.currentStatus === "Under process").length;
      const closedGrievances = totalGrievances - pendingGrievances;
  const cards = [
    { title: "Total Grievances", value: totalGrievances },
    { title: "Pending Grievances", value: pendingGrievances },
    { title: "Resolved Grievances", value: closedGrievances },
  ];

  return (
    <div className="flex space-x-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow flex-1 text-center"
        >
          <h2 className="text-xl font-bold">{card.value}</h2>
          <p className="text-gray-600">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
