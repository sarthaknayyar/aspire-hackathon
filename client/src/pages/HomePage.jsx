  // import React, { useState } from 'react';
// import { FiMenu, FiX } from "react-icons/fi"; // Import icons for burger menu
// import Header from "../../client/src/components/Header";
// import Footer from "../../client/src/components/Footer";
// import HomeHeader from "../../client/src/components/HomeHeader";
// import Home from "./pages/Home";
// import Complaints from "./pages/Complaints";
// import Status from "./pages/Status";
// import Contact from "./pages/Contact";
// import NewGrievanceOrganisation from "./pages/NewGrievanceOrganisation";
// import ProfilePage from "./pages/ProfilePage";
// import SignUp from "./pages/SignUp";
// import GrievanceForm from "./pages/GrievanceForm";
// import LoginForm from "./pages/login";
// import FAQPage from "./pages/FAQPage";
// import ChangePassword from "./pages/ChangePassword";
// import AccountDetails from "./pages/AccountDetails";
// import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for burger menu
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Sidebar from "../components/Sidebar";
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
import { deleteCookie } from "../utilities/cookie";


function Sidebar({ setActivePage }) {
  const navigate = useNavigate();
  function logout(){
    console.log("Logging out");
    deleteCookie('token');
    if(!document.cookie.includes('token')) navigate('/');
  }
  return (
    <div className="h-[65vh] w-64 p-5 rounded-2xl bg-gradient-to-b from-blue-900 to-blue-600 shadow-xl backdrop-blur-md text-white">
      {/* Menu Items */}
      <ul className="space-y-3">
        <SidebarItem icon="📺" text={<span onClick={() => setActivePage("home")} className="cursor-pointer">Appeal Dashboard</span>} badge="NEW" />
        <SidebarItem 
          icon="➕" 
          text={<span onClick={() => setActivePage("newGrievanceOrganisation")} className="cursor-pointer">Lodge Public Grievance</span>} 
        /> 
        <SidebarItem icon="➕" text={<span onClick={() => setActivePage("grievanceForm")} className="cursor-pointer">Lodge Pension Grievance</span>} />
        <SidebarItem icon="➕" text={<span onClick={() => setActivePage("status")} className="cursor-pointer">Check Status</span>} /> 
        <SidebarItem icon="🔄" text={<span onClick={() => setActivePage("accountDetails")} className="cursor-pointer">Account Activity</span>} />
        <SidebarItem 
          icon="✏️"
          text={<span onClick={() => setActivePage("profile")} className="cursor-pointer">Edit Profile</span>} 
        />
        
        <SidebarItem 
          icon="🔒"
          text={<span onClick={() => setActivePage("changePassword")} className="cursor-pointer">Change Password</span>} 
        />

        <span onClick={logout} ><SidebarItem icon="🔌" text={<span className="cursor-pointer">Sign out</span>} special /></span> 
      </ul>
    </div>
  );
}

function SidebarItem({ icon, text, badge, special }) {
  return (
    <li
      className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
        special ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white/20 hover:bg-white/30 text-white"
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-md">{icon}</span>
        <span className="text-sm font-small">{text}</span>
      </div>
      {badge && (
        <span className="ml-2 px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded-full">
          {badge}
        </span>
      )}
    </li>
  );
}

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
      <Header />
      <HomeHeader />

      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button onClick={() => setIsSidebarOpen(true)} className="text-2xl focus:outline-none">
          <FiMenu />
        </button>
      </div>

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

      <Footer />
    </div>
  );
}

export default HomePage;
