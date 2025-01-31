import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import Status from "./pages/Status";
import Contact from "./pages/Contact";
import Sidebar from "./components/Sidebar";
import HomeHeader from "./components/HomeHeader";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <HomeHeader />
      <div className="flex flex-row"> 
        <div className="flex flex-col h-screen justify-start items-center">
          <div className="mt-auto mb-56 ml-2">
            <Sidebar />
          </div>
        </div>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/status" element={<Status />} />
            <Route path="/contact" element={<Contact />} />
          
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;




