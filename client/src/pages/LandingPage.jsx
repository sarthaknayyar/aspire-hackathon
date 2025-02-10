import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Services from "../components/Services";
import OnlineServices from "../components/OnlineServices";
import HeroSection from "../components/HeroSection";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Prevent horizontal scrolling
    return () => {
      document.body.style.overflowX = "auto"; // Re-enable scrolling when component unmounts
    };
  }, []);

  const handleNavigate = async () => {
    navigate("/login");
  };

  return (
    <div className="overflow-x-hidden w-full">
      {/* Navbar */}
      {/* <Navbar /> */}
      {/* Hero Section with Sliding Background */}
      <HeroSection />
      {/* Features Section */}
      <Features />
      {/* Services Section */}
      <Services />
      {/* Online Services Section with Framer Motion Animations */}
      <OnlineServices />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
