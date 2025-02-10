import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white p-6 shadow">
      <div>
        <h1 className="text-2xl font-bold">Hi Jacob Dominic</h1>
        <p className="text-gray-600">Here's all your clients</p>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <span>jacob.d@gmail.com</span>
      </div>
    </header>
  );
};

export default Header;
