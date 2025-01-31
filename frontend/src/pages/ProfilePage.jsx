import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-2xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Profile Information</h2>
        <form className="space-y-6">
          {/* Username & Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Username *</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Gender, State, District */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Gender *</label>
              <select
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">State *</label>
              <input
                type="text"
                placeholder="Enter your state"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">District *</label>
              <input
                type="text"
                placeholder="Enter your district"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Pincode & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Pincode</label>
              <input
                type="text"
                placeholder="Enter your pincode"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Address *</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Phone & Mobile Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Mobile Number *</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">E-mail Address *</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-3 font-medium rounded-lg
                         bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                         hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
