import React from "react";

const SummaryCards = () => {
  const cards = [
    { title: "Money transfer using bank", value: "$948" },
    { title: "Premium this month", value: "$145.50" },
    { title: "Active Clients", value: "14" },
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
