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
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-6 md:px-20">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-16">
          The Growth of the Richest City of All Time
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg4.jpg"
              alt="Feature 1"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              The Proof of the Richest City
            </h3>
            <p className="text-gray-600">
              Explore how this city became a beacon of success and wealth.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg5.jpg"
              alt="Feature 2"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              City Highlights & Attractions
            </h3>
            <p className="text-gray-600">
              Discover the must-see attractions and hidden gems of the city.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg1.jpg"
              alt="Feature 3"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Future Growth of the City
            </h3>
            <p className="text-gray-600">
              Learn about upcoming developments that will shape the city’s future.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-green-800 text-white py-20 px-6 md:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-extrabold">
            Together, We Will Move Country Forward
          </h2>
          <p className="text-lg mt-4 text-green-200">
            Explore the resources and services that help shape our country's future.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            { title: "Your Government", description: "Learn more" },
            { title: "Road & Transportation", description: "Explore options" },
            { title: "Jobs & Unemployment", description: "Read more" },
            { title: "Arts & Culture", description: "Check out" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-8 bg-green-700 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-base text-green-100">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Online Services Section with Framer Motion Animations */}
      {/* Online Services Section with Framer Motion Animations */}
<section className="py-20 px-6 md:px-20 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12">
    Explore Online Services
  </h2>
  <motion.div
    className="grid grid-cols-1 md:grid-cols-3 gap-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      visible: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
  >
    {[
      {
        title: "Building Permits",
        description: "Apply for building permits with a streamlined process.",
      },
      {
        title: "Parking Permits",
        description: "Secure your parking permits quickly and efficiently.",
      },
      {
        title: "Tax Permits",
        description: "Manage your tax-related permits online with ease.",
      },
      {
        title: "Apply City Job",
        description: "Discover and apply for exciting career opportunities.",
      },
      {
        title: "Planning Documents",
        description: "Access all planning documents and guidelines in one place.",
      },
      {
        title: "Report Issues",
        description: "Report concerns or issues directly to city officials.",
      },
    ].map((item, idx) => {
      // For md screens, the first three cards slide in from the left,
      // and the next three slide in from the right.
      const variant =
        idx < 3
          ? {
              hidden: { opacity: 0, x: "-100vw" },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }
          : {
              hidden: { opacity: 0, x: "100vw" },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            };

      return (
        <motion.div
          key={idx}
          className="bg-white p-8 rounded-xl shadow-md"
          variants={variant}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </motion.div>
      );
    })}
  </motion.div>
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
