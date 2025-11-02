import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { setIsLoggedIn } = useAuth(); // Get the setter  
  const [securityCode, setSecurityCode] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setStatus(null);
    setLoading(true);
    try {
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

      // Try to parse JSON if possible
      let data = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await response.json();
      }

      if (response.ok) {
        // Successful login
        const token = data?.token || "";
        const user = data?.user || {};

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true); // update Header reactively

        toast.success(data?.message || "Login successful");
        navigate("/");
      } else {
        // Error cases (400, 401, 404, 500, etc.)
        const msg = (data && data.message) ? data.message : `Login failed (${response.status})`;
        setStatus(msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = "Network error — please check your connection";
      setStatus(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 bg-fill bg-center relative"
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
          className={`w-full py-3 rounded-full font-semibold shadow-md mt-6 hover:shadow-lg transition-all duration-300 
            ${loading ? "opacity-60 cursor-not-allowed" : "bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white"}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login ➜"}
        </button>
        <ToastContainer />

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