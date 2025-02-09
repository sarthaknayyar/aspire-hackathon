import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, stagger } from "framer-motion";
import { useNavigate } from "react-router-dom";
import footer from "../components/footer";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

const images = [
  "/images/bg4.jpg",
  "/images/bg5.jpg",
  "/images/bg6.jpg",
  "/images/bg7.jpg",
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
      <div className="relative w-full h-screen flex items-center justify-center">
  {/* Translucent black overlay */}
  <div className="absolute  w-full h-screen inset-0 bg-black opacity-50"></div>

  {/* Your content */}
  <motion.div
  initial={{ opacity: 0, y: 250 }} // Starts lower and invisible
  animate={{ opacity: 1, y: 0 }} // Moves up and becomes visible
  transition={{ duration: 0.8, ease: "easeOut" }} // Smooth timing
  className="relative z-10 text-center px-4"
>
  <h1 className="text-5xl font-bold">
    Welcome to the Grievance Redressal Portal
  </h1>
  <p className="mt-4 text-lg">
    A seamless and transparent platform to lodge and track your complaints.
  </p>
</motion.div>

</div>

    </section>
  );
};



const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = async () => {
    navigate("/login");
  };

  return (
    



    <div>
      {/* Navbar */}
      <Navbar />



      {/* Hero Section with Sliding Background */}
      <HeroSection />

      {/* Features Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-20 px-6 md:px-20">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-16 antialiased text-center">
          A Platform for Efficient Grievance Redressal 
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg8.png"
              alt="Easy Complaint Registration"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Easy Complaint Registration
            </h3>
            <p className="text-gray-600">
              Submit grievances effortlessly through our user-friendly platform.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg9.png"
              alt="Track Your Complaint"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Track Your Complaint
            </h3>
            <p className="text-gray-600">
              Stay updated on the progress of your grievance in real time.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src="/images/bg10.png"
              alt="Fast & Transparent Resolution"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Fast & Transparent Resolution
            </h3>
            <p className="text-gray-600">
              Our system ensures quick resolution and complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-blue-800 text-white py-20 px-6 md:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-extrabold">
            Our Services
          </h2>
          <p className="text-lg mt-4 text-blue-200">
            We are committed to resolving your complaints efficiently.
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
            { title: "File Complaints", description: "Submit grievances in minutes." },
            { title: "Track Status", description: "Monitor complaint progress." },
            { title: "Get Support", description: "Connect with officials." },
            { title: "Report Issues", description: "Raise public concerns effectively." },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-8 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-base text-blue-100">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

       {/* Online Services Section with Framer Motion Animations */}
       <section className="py-20 px-6 md:px-20 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12">
    Explore Online Services
  </h2>
  
  <motion.div
    className="grid grid-cols-1 md:grid-cols-3 gap-10"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    // variants={{
    //   visible: {
    //     transition: {
    //       // duration: 1.5, // Smooth overall transition duration
    //       // ease: "easeInOut", // Natural acceleration & deceleration
    //       // staggerChildren: 0.5, // Delays each child animation
    //     },  
    //   },
    // }}
  >
    {[
      {
        title: "Submit Feedback on Resolution",
        description: "Provide feedback on how your grievance was handled and suggest improvements.",
      },
      {
        title: "Access Knowledge Base & FAQs",
        description: "Find answers to common grievances, procedures, and legal rights to resolve issues faster.",
      },
      {
        title: "Appeal a Decision",
        description: "Request a review if you are unsatisfied with the resolution provided.",
      },
      {
        title: "Government Schemes & Benefits",
        description: "Check eligibility and raise concerns regarding public welfare programs.",
      },
      {
        title: "Public Service Issues",
        description: "Report problems related to roads, water, electricity, and sanitation.",
      },
      {
        title: "Legal & Administrative Concerns",
        description: "Seek assistance for legal matters or administrative delays in services.",
      },
    ].map((item, idx) => {
      const variant =
        idx < 3
          ? {
              hidden: { opacity: 0, x: "-100vw" },
              ease: "easeInOut",
              visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
              stagger: { duration: 0.5 },
            }
          : {
              hidden: { opacity: 0, x: "100vw" },
              ease: "easeInOut  ",
              visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
              stagger: { duration: 0.5 },
            };

      return (
        <motion.div
          key={idx}
          className="relative bg-white p-8 rounded-2xl shadow-lg transition transform hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
          variants={variant}
        >
          {/* Subtle Glossy Overlay */}
          <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg transition-opacity opacity-0 hover:opacity-20"></div>

          {/* Icon Placeholder (For Future Icon Addition) */}
          <div className="mb-4 w-16 h-16 mx-auto flex items-center justify-center bg-blue-100 text-blue-500 rounded-full shadow-md">
            🛠️
          </div>

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
      <Footer />
    </div>
  );
};

export default LandingPage;
