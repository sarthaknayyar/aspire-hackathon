import { Link } from "react-router-dom";
import { Home, BarChart3 } from "lucide-react"; // Importing Lucide icons

const Sidebar = () => {
  const menuItems = [
    { name: "My Clients", path: "/", icon: <Home size={20} /> },
    { name: "Insights", path: "/quotes", icon: <BarChart3 size={20} /> },
    // { name: "Billing", path: "/billing", icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-green-900 to-green-700 text-white flex flex-col shadow-xl">
      {/* Logo/Header */}
      <h1 className="text-2xl font-bold p-6 tracking-wide text-center border-b border-green-600">
        जनसुनवाई - समाधान
      </h1>

      {/* Navigation Links */}
      <ul className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <li key={index} className="group">
            <Link
              to={item.path}
              className="flex items-center space-x-3 p-4 transition-all hover:bg-green-800 hover:scale-105"
            >
              {item.icon}
              <span className="text-lg">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="p-4 border-t border-green-600">
        <button className="w-full cursor-pointer py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-all">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
