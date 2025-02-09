import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for burger menu
import Header from "../components/Header";
import Footer from "../components/footer";
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
import { useNavigate } from 'react-router';
import { deleteCookie, getCookie } from "../utilities/cookie";

function Sidebar({ setActivePage }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    deleteCookie("token");
    fetch("https://aspire-hackathon.onrender.com/user/logout", {
      method: "GET",
      credentials: "include", // Ensure credentials are included
    })
      .then(() => navigate("/"))
      .catch((err) => console.error("Logout error", err));
  }

  return (
    <>
      {/* Toggle Button (visible on smaller screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
      >
        {isOpen ? "✖ Close" : "☰ Menu"}
      </button>

      {/* Sidebar Container */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 p-5 rounded-r-2xl
          bg-gradient-to-b from-blue-900 to-blue-600 shadow-xl
          backdrop-blur-md text-white transform transition-transform
          duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-72"}
          lg:translate-x-0 lg:static
          flex flex-col
        `}
      >
        {/* Sidebar Menu */}
        <ul className="space-y-3 mt-12 overflow-y-auto flex-grow">
          <SidebarItem
            icon="📺"
            text={
              <span onClick={() => setActivePage("home")} className="cursor-pointer">
                Appeal Dashboard
              </span>
            }
          />
          <SidebarItem
            icon="➕"
            text={
              <span onClick={() => setActivePage("newGrievanceOrganisation")} className="cursor-pointer">
                Lodge Public Grievance
              </span>
            }
          />
          <SidebarItem
            icon="➕"
            text={
              <span onClick={() => setActivePage("grievanceForm")} className="cursor-pointer">
                Lodge Pension Grievance
              </span>
            }
          />
          <SidebarItem
            icon="➕"
            text={
              <span onClick={() => setActivePage("status")} className="cursor-pointer">
                Check Status
              </span>
            }
          />
          <SidebarItem
            icon="🔄"
            text={
              <span onClick={() => setActivePage("accountDetails")} className="cursor-pointer">
                Account Activity
              </span>
            }
          />
          <SidebarItem
            icon="✏️"
            text={
              <span onClick={() => setActivePage("profile")} className="cursor-pointer">
                Edit Profile
              </span>
            }
          />
          <SidebarItem
            icon="🔒"
            text={
              <span onClick={() => setActivePage("changePassword")} className="cursor-pointer">
                Change Password
              </span>
            }
          />
          <div onClick={logout}>
            <SidebarItem
              icon="🔌"
              text={<span className="cursor-pointer">Sign out</span>}
              special
            />
          </div>
        </ul>
      </div>

      {/* Overlay on Mobile (closes sidebar when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function SidebarItem({ icon, text, special, onClick }) {
  return (
    <li
      className={`flex justify-between items-center p-3 rounded-xl
        transition-all duration-200 transform hover:scale-105
        hover:shadow-md cursor-pointer ${
          special
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-white/20 hover:bg-white/30 text-white"
        }`}
    >
      <div className="flex items-center space-x-4">
        <span className="text-xl">{icon}</span>
        <span className="text-lg font-bold text-center">{text}</span>
      </div>
    </li>
  );
}


function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    console.log("Token", token);
    setIsAuthenticated(!!token);
  }, []);

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold text-gray-700">You are not logged in</h1>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </div>
      );
    }

    switch (activePage) {
      case "home":
        return <Home />;
      case "Submit":
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

      <Header />

      <HomeHeader />

      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button onClick={() => setIsSidebarOpen(true)} className="text-2xl focus:outline-none">
          <FiMenu />
        </button>
      </div>

      {isAuthenticated && (
        <div className="flex flex-col lg:flex-row flex-grow">     
          <aside className="hidden lg:block w-1/4 xl:w-1/5 bg-white shadow-md lg:min-h-screen">
            <Sidebar setActivePage={setActivePage} />
          </aside>

          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
              <div className="w-68 bg-white p-2 h-full shadow-md flex flex-col">
                <button onClick={() => setIsSidebarOpen(false)} className="self-end p-4 text-xl">
                  <FiX />
                </button>
                <Sidebar setActivePage={setActivePage} />
              </div>
              <div className="flex-grow" onClick={() => setIsSidebarOpen(false)}></div>
            </div>
          )}

          <main className="flex-grow p-4">{renderContent()}</main>
        </div>
      )}
      {!isAuthenticated && <div className="flex-grow p-4">{renderContent()}</div>}

      <Footer />
    </div>
  );
}

export default HomePage;
