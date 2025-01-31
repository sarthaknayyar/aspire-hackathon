import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import Status from "./pages/Status";
import Contact from "./pages/Contact";
import Sidebar from "./components/Sidebar";
import HomeHeader from "./components/HomeHeader";
import NewGrievanceOrganisation from "./pages/NewGrievanceOrganisation";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <HomeHeader />
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 xl:w-1/5 bg-white shadow-md lg:min-h-screen">
          <div className="mt-5 lg:mt-10 p-4">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/status" element={<Status />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/newGrievanceOrganisation"
              element={<NewGrievanceOrganisation />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
