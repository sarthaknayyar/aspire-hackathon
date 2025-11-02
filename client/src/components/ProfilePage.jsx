import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ setActivePage, showToast }) => {
  const navigate = useNavigate(); // ✅ Move useNavigate outside the function

  async function handleSaveProfile(event) {
    event.preventDefault(); // Prevents form submission from refreshing the page
    console.log("Saving profile...");

    const name = document.getElementById("name").value;
    const gender = document.getElementById("gender").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("district").value;
    const pincode = document.getElementById("pincode").value;
    const address = document.getElementById("address").value;
    const mobile = document.getElementById("mobile").value;

    const response = await fetch("http://localhost:5000/user/profileUpdate", {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            name, gender, state, city, pincode, address, mobile
        }),
    });

    const data = await response.json();

    if (response.status === 200) {
        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("showProfileUpdateToast", "true");
        setActivePage("home");
        console.log("Profile updated successfullyyy");
        // navigate("/homepage"); // ✅ Works correctly now
    } else {
        console.error("Failed to update profile");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl p-8"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-8 text-center"
        >
          Profile Information
        </motion.h2>

        <form className="space-y-6">
          {/* Username & Name */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700" >Name *</label>
              <input
                type="text"
                id="name" name="name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </motion.div>
          </div>

          {/* Gender, State, District */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Gender", "State", "District"].map((field, index) => (
              <motion.div key={index} whileFocus={{ scale: 1.05 }}>
                <label className="block text-sm font-semibold text-gray-700">{field} *</label>
                <input
                  type={field === "Gender" ? "select" : "text"}
                  id = {field.toLowerCase()}
                  name = {field.toLowerCase()}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>
            ))}
          </div>

          {/* Pincode & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">Pincode</label>
              <input
                type="text"
                id="pincode" name="pincode"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </motion.div>
            <motion.div whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-700">Address *</label>
              <input
                type="text"
                id="address" name="address"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </motion.div>
          </div>

          {/* Phone & Mobile Number */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {["Mobile Number *"].map((field, index) => (
              <motion.div key={index} whileFocus={{ scale: 1.05 }}>
                <label className="block text-sm font-semibold text-gray-700">{field}</label>
                <input
                  type="tel"
                  id="mobile" name="mobile"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required={field.includes("*")}
                />
              </motion.div>
            ))}
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-8" onClick={handleSaveProfile}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 font-medium rounded-lg
                         bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                         hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Save Profile
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;