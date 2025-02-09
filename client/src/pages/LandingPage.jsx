import { useNavigate } from "react-router-dom";
// components
import footer from "../components/footer";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Services from "../components/Services";
import OnlineServices from "../components/OnlineServices";
import HeroSection from "../components/HeroSection";


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
