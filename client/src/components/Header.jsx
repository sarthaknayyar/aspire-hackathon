import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState("");

  return (
    <header className=" text-white px-8 py-4 flex justify-between items-center shadow-md"
    style={{ backgroundColor: "#83a2d4" }}>
      {/* Logo */}
      <div 
      className="text-2xl font-bold"
  >
        <Link to="/" className="hover:text-gray-300">JansunwAI</Link>
      </div>

      {/* Navigation Menu */}
      <nav className="relative">
        <ul className="flex space-x-6">
          {[
            { name: "Home", path: "/homepage" },
            { name: "Contact Us", path: "/homepage/contact" },
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