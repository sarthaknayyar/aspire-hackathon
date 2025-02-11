import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white p-6 shadow">
      <div>
        <h1 className="text-2xl font-bold">Department of Agriculture</h1>
        <p className="text-gray-600">Rohan Prakash </p>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="/assets/image.png"
          alt="profile"
          className="w-20 h-15 rounded-full"
        />
        <span>rohanPrakash@gmail.com</span>
      </div>
    </header>
  );
};

export default Header;
