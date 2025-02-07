import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [securityCode, setSecurityCode] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      document.cookie = `token=${token}; Secure; SameSite=None; Domain=sweet-dango-ca4344.netlify.app;`;
      navigate("/homepage");
    } else if (response.status === 404) {
      setStatus("User not found");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100   bg-fill bg-center relative"
    style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">User Login</h2>
        <p className="text-gray-500 text-center mt-1">
          Welcome back! Please enter your credentials.
        </p>

        {/* Username/Email/Mobile Input */}
        <div className="mt-6">
          <label className="text-sm font-semibold text-gray-600">Email / Mobile No</label>
          <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your details"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label className="text-sm font-semibold text-gray-600">Password</label>
          <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Status Message */}
        {status && <p className="text-red-600 text-sm mt-2 text-center">{status}</p>}

        {/* Login Button */}
        <button
          className="w-full bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-full font-semibold shadow-md mt-6 hover:shadow-lg transition-all duration-300"
          onClick={handleLogin}
        >
          Login ➜
        </button>

        {/* Links */}
        <div className="text-center mt-4 text-sm text-gray-600">
          <a href="#" className="hover:text-indigo-700 transition">Forgot Password</a> | 
          <a href="#" className="hover:text-indigo-700 ml-2 transition">Forgot Username</a>
          <br />
          <a href="/signup" className="hover:text-indigo-700 font-medium transition">
            Click here to Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
