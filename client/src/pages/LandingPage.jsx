import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Services from "../components/Services";
import OnlineServices from "../components/OnlineServices";
import HeroSection from "../components/HeroSection";
import { toast, ToastContainer } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate();
    useEffect(() => {
      const showToast = localStorage.getItem("showLoginToast"); // ✅ Check flag in localStorage
      console.log("🚀 Checking Local Storage:", showToast); 
  
      if (showToast === "true") {
        console.log("🚀 Showing toast");
          // localStorage.removeItem("showLoginToast"); // ✅ Remove flag before showing toast
          toast.success("Signed Out Successfully!", { position: "top-center", autoClose: 3000 }); // ✅ Show toast
          setTimeout(() => {
            localStorage.removeItem("showLoginToast");
          }
          , 3000);
      }
  }, []);

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
      <ToastContainer autoClose={3000} position="top-center" />
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