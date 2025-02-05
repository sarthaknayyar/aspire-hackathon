"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
];

const Card = ({ bgColor, imgSrc, text, link }) => {
  return (
    <a href={link} className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg ${bgColor} transition-transform transform hover:scale-105`}>
      <div className="bg-white rounded-full p-4 shadow-md">
        <img src={imgSrc} alt={text} className="w-16 h-16" />
      </div>
      <button className="mt-4 bg-indigo-900 text-white font-semibold py-2 px-4 rounded">{text}</button>
    </a>
  );
};

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-115 flex items-center justify-center text-white overflow-hidden">
      {/* Background Sliding Images */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </AnimatePresence>
      </div>

      {/* Overlay Content */}
      {/* You can add overlay text or a call-to-action here */}
    </section>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#fbfdff] font-sans">
      {/* Navbar */}
      <header className="bg-green-900 text-white px-8 py-4 flex justify-between items-center shadow-md customColor">
        <div className="text-2xl font-bold">NAME</div>
        <nav className="space-x-6">
          <ul className="flex space-x-6">
            <li className="hover:underline cursor-pointer cstFont">Home</li>
            <li className="hover:underline cursor-pointer cstFont">Services</li>
            <li className="hover:underline cursor-pointer cstFont">Pages</li>
            <li className="hover:underline cursor-pointer cstFont">News</li>
            <li className="hover:underline cursor-pointer cstFont">Contact</li>
          </ul>
        </nav>
        <button
          className="bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600 transition cstBtnClr"
          onClick={handleNavigate}
        >
          Login
        </button>
      </header>

      {/* Hero Section with Sliding Background */}
      <HeroSection />

      {/* ABOUT US SECTION */}
      <div className="bg-[#fbfdff] flex justify-center p-6">
        <div className="p-6 ">
          <h2 className="text-indigo-800 text-2xl font-bold border-b-2 border-indigo-800 pb-2">
            ABOUT [Your Portal Name]
          </h2>
          <p className="mt-4 text-gray-700">
            [Your Portal Name] is an online grievance redressal platform that allows users to submit complaints regarding various services. Available 24x7, it provides a centralized system where grievances can be addressed efficiently by the relevant authorities. The portal ensures transparency, accountability, and timely resolution of complaints.
          </p>
          <p className="mt-2 text-gray-700">
            Users can file grievances related to [mention specific areas your portal covers], and each complaint is assigned a unique registration ID for easy tracking. The platform also offers an appeal mechanism for users who are not satisfied with the initial resolution. If a grievance remains unresolved or receives a low rating, an option to file an appeal is enabled.
          </p>
          <p className="mt-2 text-gray-700">
            Our system is accessible via [mention web portal, mobile app, or other platforms] to ensure ease of use for all citizens.
          </p>

          <h3 className="text-indigo-700 text-xl font-semibold mt-6">
            ❗ Issues Not Considered for Redressal
          </h3>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>RTI-related queries</li>
            <li>Court-related or sub judice matters</li>
            <li>Religious concerns</li>
            <li>General suggestions</li>
            <li>Employee grievances (unless internal redressal channels have been exhausted)</li>
          </ul>

          <h3 className="text-indigo-700 text-xl font-semibold mt-6">📌 Note:</h3>
          <ul className="list-decimal pl-6 mt-2 text-gray-700">
            <li>
              If your grievance is not resolved within a reasonable period, you may escalate it to higher authorities through the appropriate channels.
            </li>
            <li>
              There are no charges for filing grievances. Any payment made is solely for processing via authorized service providers.
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 md:px-12 py-10">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
    <Card
      bgColor="bg-[#6A1B9A]"
      imgSrc="https://res.cloudinary.com/dhgezdw5u/image/upload/v1738752155/Untitled_design_2_qhb3mm.png"
      text="REGISTER / LOGIN"
      link="/register"
      className="max-w-xs mx-auto"
    />
    <Card
      bgColor="bg-[#8E44AD]"
      imgSrc="https://res.cloudinary.com/dhgezdw5u/image/upload/v1738750299/statusUpdate_r7mdhm.jpg"
      text="VIEW STATUS"
      link="/status"
      className="max-w-xs mx-auto"
    />
    <Card
      bgColor="bg-[#6A1B9A]"
      imgSrc="https://res.cloudinary.com/dhgezdw5u/image/upload/v1738752054/Untitled_design_1_iuzdbq.png"
      text="CONTACT US"
      link="/contact"
      className="max-w-xs mx-auto"
    />
  </div>
</div>


      {/* Footer */}
      <footer className="bg-[#0f2a75] text-white px-8 py-12">
        <div className="text-center bg-[#0f2a75]">
          <p className="text-lg mb-2">Address: Main Square Road, Region 12</p>
          <p className="text-lg mb-2">Contact: contact@mayorx.gov</p>
          <p className="text-lg">Clock: Open 9:00 AM - Close 6:00 PM</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
