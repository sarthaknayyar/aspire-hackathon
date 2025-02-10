import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();

  return (
    <header className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold">Grievance Portal</div>

      <nav>
        <ul className="flex space-x-6">
          {[
            { name: "Home", path: "/homepage" },
            {name: "How it works", path: "/how-it-works"},
            { name: "FAQs", path: "/faqs" },
            { name: "Submit Complaints", path: "/complaints" },
            
            { name: "Contact", path: "/contact" },
          ].map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-2 transition ${
                active === item.name ? "text-blue-900 bg-white rounded-full" : ""
              }`}
              onClick={() => setActive(item.name)}
            >
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600 transition"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </header>
  );
};

export default Navbar;
