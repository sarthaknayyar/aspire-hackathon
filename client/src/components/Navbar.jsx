import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const handleNavigate = async () => {
    navigate("/login");
  };

  

  return (
    <header className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">Grievance Portal</div>

      {/* Navigation Menu */}
      <nav className="relative">
        <ul className="flex space-x-6 relative">
          {["Home", "How It Works", "Track Complaint", "FAQs", "Contact"].map(
            (item, index) => (
              <li
                key={index}
                onClick={() => setActive(item)}
                className="relative cursor-pointer px-4 py-2 transition"
              >
                {/* Capsule Effect (Stays when active) */}
                <span
                  className={`absolute inset-0 bg-white rounded-full transition-all duration-300 ease-in-out 
                  ${
                    active === item
                      ? "opacity-100 scale-x-100" // Active item keeps capsule
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                ></span>

                {/* Menu Item Text */}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    active === item ? "text-blue-900" : "group-hover:text-blue-900"
                  }`}
                >
                  {item}
                </span>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Login Button */}
      <button className="bg-orange-500 px-6 py-3 rounded-md hover:bg-orange-600 transition" onClick={handleNavigate}>
        Login
      </button>
    </header>
  );
};

export default Navbar;
