import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-blue-600 text-white min-h-screen w-64 p-5">
      <div className="bg-gray-100 text-blue-600 font-bold p-3 rounded-lg text-center mb-5">
        <span className="flex items-center justify-center space-x-2">
          <span>🎨</span>
          <span>Grievance Dashboard</span>
        </span>
      </div>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2">
          <span>📂</span>
          <span>Appeal Dashboard</span>
          <span className="text-red-500 font-bold text-sm ml-2">NEW</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>➕</span>
          <span>Lodge Public Grievance</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>➕</span>
          <span>Lodge Pension Grievance</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>➕</span>
          <span>Lodge Appeal</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>🔄</span>
          <span>Account Activity</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>✏️</span>
          <span>Edit Profile</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>🔒</span>
          <span>Change Password</span>
        </li>
        <li className="flex items-center space-x-2 text-yellow-300">
          <span>🔌</span>
          <span>Sign out</span>
        </li>
      </ul>
    </div>
  );
}
