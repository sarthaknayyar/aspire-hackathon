import React from "react";

export default function Sidebar() {
  return (
    <div className="h-[75vh] w-64 p-5 rounded-xl bg-gradient-to-b from-blue-900 to-blue-600 shadow-lg backdrop-blur-md text-white">
      
      {/* Header */}
      <div className="bg-white/20 text-white font-semibold p-4 rounded-xl text-center mb-6 shadow-md">
        <span className="flex items-center justify-center space-x-2 text-lg">
          🎨
          <span>Grievance Dashboard</span>
        </span>
      </div>

      {/* Menu Items */}
      <ul className="space-y-3">
        <SidebarItem icon="📺" text="Appeal Dashboard" badge="NEW" />
        <SidebarItem icon="➕" text="Lodge Public Grievance" />
        <SidebarItem icon="➕" text="Lodge Pension Grievance" />
        <SidebarItem icon="➕" text="Lodge Appeal" />
        <SidebarItem icon="🔄" text="Account Activity" />
        <SidebarItem icon="✏️" text="Edit Profile" />
        <SidebarItem icon="🔒" text="Change Password" />
        <SidebarItem icon="🔌" text="Sign out" special />
      </ul>
    </div>
  );
}

function SidebarItem({ icon, text, badge, special }) {
  return (
    <li
      className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
        special
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-white/20 hover:bg-white/30 text-white"
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
      {badge && <span className="text-xs font-bold text-red-400">{badge}</span>}
    </li>
  );
}
