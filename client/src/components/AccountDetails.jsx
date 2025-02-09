import React, { useState, useEffect } from "react";
import { User, Phone, Mail, Globe, Calendar, MapPin, Landmark, Edit3 } from "lucide-react"; // Icons for cards
import { getCookie } from "../utilities/cookie";

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    const token = getCookie('token');
    console.log("Token: ");

    if (token) {
      console.log("Fetching user data...");
      fetch(`https://aspire-hackathon.onrender.com/user/token/${token}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  // Show loading if user is null
  if (!user) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  const personalInfo = [
    { label: "Name", value: user.name || "N/A", icon: <User size={20} /> },
    { label: "Date of Birth", value: user.dob || "N/A", icon: <Calendar size={20} /> },
    { label: "Language", value: user.language || "English (US)", icon: <Globe size={20} /> },
    { label: "Contactable at", value: user.email || "N/A", icon: <Mail size={20} /> },
  ];

  const addressInfo = user.address
    ? [
        { label: "State", value: user.address.state || `${user.address}`, icon: <MapPin size={20} /> },
        { label: "District", value: user.address.district || `${user.city}`, icon: <Landmark size={20} /> },
        { label: "Pincode", value: user.address.pincode || `${user.pincode}`, icon: <Edit3 size={20} /> },
        { label: "State", value: user.address.locality || `${user.state}`, icon: <MapPin size={20} /> },
        // { label: "Premise Name", value: user.address.premise || "N/A", icon: <MapPin size={20} /> },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 flex">
        {/* Left Sidebar */}
        <div className="w-1/4 pr-8 border-r">
          <h1 className="text-lg font-bold text-gray-800 mb-6">Account Details</h1>
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <User size={32} />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>
          <ul className="space-y-6">
            <li
              onClick={() => setActiveTab("personal")}
              className={`cursor-pointer text-lg font-medium ${
                activeTab === "personal"
                  ? "text-blue-600 border-l-4 border-blue-600 pl-2"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Personal Information
            </li>
            <li
              onClick={() => setActiveTab("address")}
              className={`cursor-pointer text-lg font-medium ${
                activeTab === "address"
                  ? "text-blue-600 border-l-4 border-blue-600 pl-2"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Address
            </li>
            <li
              onClick={() => setActiveTab("status")}
              className={`cursor-pointer text-lg font-medium ${
                activeTab === "status"
                  ? "text-blue-600 border-l-4 border-blue-600 pl-2"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              View Status
            </li>
          </ul>
        </div>

        {/* Right Content */}
        <div className="w-3/4 pl-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {activeTab === "personal"
              ? "Personal Information"
              : activeTab === "address"
              ? "Address"
              : "View Status"}
          </h2>
          <p className="text-gray-600 mb-6">
            {activeTab === "personal"
              ? "Manage your personal details, including name, date of birth, and contact details."
              : activeTab === "address"
              ? "View or update your address details for accurate communication."
              : "Track the status of your application or requests."}
          </p>

          {activeTab === "personal" && (
            <div className="grid grid-cols-2 gap-6">
              {personalInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-between h-32"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">{item.label}</h3>
                    <p className="text-lg text-gray-800">{item.value}</p>
                  </div>
                  <div className="text-blue-600">{item.icon}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "address" && (
            <div className="grid grid-cols-2 gap-6">
              {addressInfo.length > 0 ? (
                addressInfo.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm flex items-center justify-between h-32"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">{item.label}</h3>
                      <p className="text-lg text-gray-800">{item.value}</p>
                    </div>
                    <div className="text-blue-600">{item.icon}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No address information available.</p>
              )}
            </div>
          )}

          {activeTab === "status" && (
            <div>
              <p className="text-gray-800">The View Status feature is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
