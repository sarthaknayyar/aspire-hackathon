import React from "react";
import financialServicesGif from "../assets/Bank.gif";
import labourEmploymentGif from "../assets/Labour.gif";
import taxesGif from "../assets/Income.gif";
import postsGif from "../assets/Post.gif";
import telecommunicationsGif from "../assets/Telecomm.gif";
import housingUrbanAffairsGif from "../assets/Housing.gif";
import healthWelfareGif from "../assets/Health.gif";
import training from "../assets/Training.gif";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card = ({ icon, title, delay = 0 }) => {
  return (
    <motion.div
      // Initial and animate props control the fade/slide effect on mount
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      // Tailwind classes for hover transitions
      className="flex flex-col items-center justify-center 
                 w-full max-w-xs h-48 border-2 rounded-xl shadow-md 
                 hover:shadow-lg hover:scale-105 transition-transform 
                 duration-300 ease-in-out cursor-pointer"
    >
      {/* Icon Section */}
      <div className="flex justify-center items-center w-full h-24 bg-blue-100 rounded-t-xl">
        <img src={icon} alt={title} className="w-16 h-16" />
      </div>
      {/* Text Section */}
      <div className="flex items-center justify-center w-full h-24 bg-blue-600 rounded-b-xl text-white text-center">
        <p className="text-base font-semibold px-2">{title}</p>
      </div>
    </motion.div>
  );
};

const NewGrievanceOrganisation = () => {
  const cards = [
    {
      icon: financialServicesGif,
      title: "Financial Services (Banking Division)",
    },
    {
      icon: labourEmploymentGif,
      title: "Labour and Employment",
    },
    {
      icon: taxesGif,
      title: "Central Board of Direct Taxes (Income Tax)",
    },
    {
      icon: postsGif,
      title: "Posts",
    },
    {
      icon: telecommunicationsGif,
      title: "Telecommunications",
    },
    {
      icon: training,
      title: "Personnel and Training",
    },
    {
      icon: housingUrbanAffairsGif,
      title: "Housing and Urban Affairs",
    },
    {
      icon: healthWelfareGif,
      title: "Health & Family Welfare",
    },
  ];

  return (
    <div className="bg-gray-200 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center">
        New Grievance Organisation
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Link
          to={`/grievance-form/${card.title}`}
          key={index}
          className="block" // Make entire area clickable
        >
          <Card
            icon={card.icon}
            title={card.title}
            delay={index * 0.1}
          />
        </Link>
      ))}
      </div>
    </div>
  );
};

export default NewGrievanceOrganisation;
