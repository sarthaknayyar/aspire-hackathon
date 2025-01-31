import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import Status from "./pages/Status";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/status" element={<Status />} />
          <Route path="/contact" element={<Contact />} />
         
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;




