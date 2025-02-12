import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password || !department) {
      alert("Please fill in all fields.");
      return;
    }

    navigate("/clients"); // Navigate to Clients page
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('./assets/admin-login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-600 text-center mb-6">
          जनसुनवाई - समाधान
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Department Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Choose your option</option>
              <option value="financial_services">
                Financial Services (Banking Division)
              </option>
              <option value="labour_employment">Labour and Employment</option>
              <option value="income_tax">
                Central Board of Direct Taxes (Income Tax)
              </option>
              <option value="posts">Posts</option>
              <option value="telecommunications">Telecommunications</option>
              <option value="personnel_training">Personnel and Training</option>
              <option value="housing_urban">Housing and Urban Affairs</option>
              <option value="health_welfare">Health & Family Welfare</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 cursor-pointer rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

        {/* Terms and Policy */}
        <p className="text-gray-500 text-sm text-center mt-4">
          By logging in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
