import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for burger menu
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import Status from "./pages/Status";
import Contact from "./pages/Contact";
import Sidebar from "./components/Sidebar";
import HomeHeader from "./components/HomeHeader";
import NewGrievanceOrganisation from "./pages/NewGrievanceOrganisation";
import ProfilePage from "./pages/ProfilePage"; // Import Profile Page
import GrievanceForm from "./pages/GrievanceForm"; // Import Grievance Form Page

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <HomeHeader />

      {/* Burger Menu for Small Screens */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl focus:outline-none"
        >
          <FiMenu /> {/* Burger Icon */}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar for Large Screens */}
        <aside className="hidden lg:block w-1/4 xl:w-1/5 bg-white shadow-md lg:min-h-screen">
          <div className="mt-5 lg:mt-10 p-4">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile Sidebar - Sliding Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            {/* Sidebar Container */}
            <div className="w-68 bg-white p-2 h-full shadow-md flex flex-col">
              {/* Close Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="self-end p-4 text-xl"
              >
                <FiX /> {/* Close Icon */}
              </button>
              <Sidebar />
            </div>

            {/* Click outside to close the menu */}
            <div
              className="flex-grow"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/status" element={<Status />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newGrievanceOrganisation" element={<NewGrievanceOrganisation />} />
            <Route path="/profile" element={<ProfilePage />} /> 
            <Route path="/grievance-form/:department" element={<GrievanceForm />} />
          </Routes>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
