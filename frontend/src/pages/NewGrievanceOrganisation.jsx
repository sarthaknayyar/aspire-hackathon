import React from "react";

const Card = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center justify-center w-64 h-48 border-2 rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:scale-105 hover:cursor-pointer">
      {/* Icon Section */}
      <div className="flex justify-center items-center w-full h-24 border-2 rounded-xl  bg-blue-100">
        <img
          src={icon}
          alt={title}
          className="w-12 h-12"
        />
      </div>
      {/* Text Section */}
      <div className="flex items-center justify-center w-full h-24 bg-blue-600 border-2 rounded-md text-white text-center">
        <p className="text-base font-semibold">{title}</p>
      </div>
    </div>
  );
};

const NewGrievanceOrganisation = () => {
  const cards = [
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Financial Services (Banking Division)"
    },
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Labour and Employment"
    },
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Central Board of Direct Taxes (Income Tax)"
    },
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Posts"
    },
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Telecommunications"
    },
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Home Affairs"
    },
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Housing and Urban Affairs"
    },
    {
      icon: "https://via.placeholder.com/60", // Replace with actual image URL
      title: "Health & Family Welfare"
    },
  ];

  return (
    <div className="bg-gray-200 p-10 m-10 h-auto rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">New Grievance Organisation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {cards.map((card, index) => (
          <Card key={index} icon={card.icon} title={card.title} />
        ))}
      </div>
    </div>
  );
};

export default NewGrievanceOrganisation;
