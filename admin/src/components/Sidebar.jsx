import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "My Clients", path: "/" },
    { name: "My Quotes", path: "/quotes" },
    { name: "Billing", path: "/billing" },
    { name: "Reports", path: "/reports" },
    { name: "Referrals", path: "/referrals" }
  ];

  return (
    <div className="w-64 bg-green-900 text-white flex flex-col">
      <h1 className="text-2xl font-bold p-6">Rainsurance</h1>
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <li key={index} className="p-4 hover:bg-green-700 cursor-pointer">
            <Link to={item.path} className="block w-full h-full">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
