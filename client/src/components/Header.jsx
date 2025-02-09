import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState("");

  return (
    <header className="bg-blue-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="hover:text-gray-300">Grievance Portal</Link>
      </div>

      {/* Navigation Menu */}
      <nav className="relative">
        <ul className="flex space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "Complaints", path: "/complaints" },
            { name: "Check Status", path: "/status" },
            { name: "Contact Us", path: "/contact" },
          ].map((item, index) => (
            <li
              key={index}
              onClick={() => setActive(item.name)}
              className="relative cursor-pointer px-4 py-2 transition group"
            >
              {/* Capsule Effect (Stays when active) */}
              <span
                className={`absolute inset-0 bg-white rounded-full transition-all duration-300 ease-in-out 
                ${
                  active === item.name
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                }`}
              ></span>

              {/* Menu Item Text */}
              <Link
                to={item.path}
                className={`relative z-10 transition-colors duration-300 ${
                  active === item.name ? "text-blue-900" : "group-hover:text-blue-900"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
