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

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

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
     
    </section>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate("/homepage");
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Navbar */}
      <header className="bg-green-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold">Mayorx</div>
        <nav className="space-x-6">
          <ul className="flex space-x-6">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">Pages</li>
            <li className="hover:underline cursor-pointer">News</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </nav>
        <button
          className="bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600 transition"
          onClick={handleNavigate}
        >
          Login 
        </button>
      </header>

      {/* Hero Section with Sliding Background */}
      <HeroSection />

      {/* Features Section */}
      <section className="text-center py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-12">
          The growth of the richest city of all time
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 shadow-lg rounded-md">
            <img
              src="https://via.placeholder.com/100"
              alt="Feature 1"
              className="mx-auto mb-6"
            />
            <p className="text-lg">The proof of the richest city of all time</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-md">
            <img
              src="https://via.placeholder.com/100"
              alt="Feature 2"
              className="mx-auto mb-6"
            />
            <p className="text-lg">City highlights include all attractions</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-md">
            <img
              src="https://via.placeholder.com/100"
              alt="Feature 3"
              className="mx-auto mb-6"
            />
            <p className="text-lg">The growth of the richest city of all time</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-green-800 text-white py-20 px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Together, We Will Move Country Forward
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-green-700 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Your Government</h3>
            <p className="text-base">Learn more</p>
          </div>
          <div className="p-6 bg-green-700 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Road & Transportation</h3>
            <p className="text-base">Explore options</p>
          </div>
          <div className="p-6 bg-green-700 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Jobs & Unemployment</h3>
            <p className="text-base">Read more</p>
          </div>
          <div className="p-6 bg-green-700 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Arts & Culture</h3>
            <p className="text-base">Check out</p>
          </div>
        </div>
      </section>

      {/* Online Services Section */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Explore Online Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 shadow-lg rounded-md">Building Permits</div>
          <div className="bg-white p-6 shadow-lg rounded-md">Parking Permits</div>
          <div className="bg-white p-6 shadow-lg rounded-md">Tax Permits</div>
          <div className="bg-white p-6 shadow-lg rounded-md">Apply City Job</div>
          <div className="bg-white p-6 shadow-lg rounded-md">Planning Documents</div>
          <div className="bg-white p-6 shadow-lg rounded-md">Report Issues</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white px-8 py-12">
        <div className="text-center">
          <p className="text-lg mb-2">Address: Main Square Road, Region 12</p>
          <p className="text-lg mb-2">Contact: contact@mayorx.gov</p>
          <p className="text-lg">Clock: Open 9:00 AM - Close 6:00 PM</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
