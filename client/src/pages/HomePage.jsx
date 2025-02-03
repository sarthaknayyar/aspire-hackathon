import React, { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for burger menu
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import HomeHeader from "../components/HomeHeader";
import Home from "../components/Home";
import Complaints from "../components/Complaints";
import Status from "../components/Status";
import Contact from "../components/Contact";
import NewGrievanceOrganisation from "../components/NewGrievanceOrganisation";
import ProfilePage from "../components/ProfilePage";
import SignUp from "../components/SignUp";
import GrievanceForm from "../components/GrievanceForm";
import LoginForm from "../components/login";
import FAQPage from "../components/FAQPage";
import ChangePassword from "../components/ChangePassword";
import AccountDetails from "../components/AccountDetails";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "complaints":
        return <Complaints />;
      case "status":
        return <Status />;
      case "contact":
        return <Contact />;
      case "newGrievanceOrganisation":
        return <NewGrievanceOrganisation />;
      case "profile":
        return <ProfilePage />;
      case "signUp":
        return <SignUp />;
      case "grievanceForm":
        return <GrievanceForm />;
      case "login":
        return <LoginForm />;
      case "faq":
        return <FAQPage />;
      case "changePassword":
        return <ChangePassword />;
      case "accountDetails":
        return <AccountDetails />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <HomeHeader />

      {/* Burger Menu for Small Screens */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button onClick={() => setIsSidebarOpen(true)} className="text-2xl focus:outline-none">
          <FiMenu /> {/* Burger Icon */}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar for Large Screens */}
        <aside className="hidden lg:block w-1/4 xl:w-1/5 bg-white shadow-md lg:min-h-screen">
          <div className="mt-5 lg:mt-10 p-4">
            <Sidebar setActivePage={setActivePage} />
          </div>
        </aside>

        {/* Mobile Sidebar - Sliding Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            <div className="w-68 bg-white p-2 h-full shadow-md flex flex-col">
              <button onClick={() => setIsSidebarOpen(false)} className="self-end p-4 text-xl">
                <FiX /> {/* Close Icon */}
              </button>
              <Sidebar setActivePage={setActivePage} />
            </div>
            <div className="flex-grow" onClick={() => setIsSidebarOpen(false)}></div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow p-4">{renderContent()}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
