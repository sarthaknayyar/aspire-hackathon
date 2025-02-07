import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, Lock } from "lucide-react";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    setErrorMessage(null);
    alert("Password changed successfully!");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 bg-fill bg-center relative"
      style={{ backgroundImage: "url('/images/login-bg.jpg')" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {/* Title */}
        <div className="text-center mb-6">
          <Lock className="mx-auto text-blue-600" size={50} />
          <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
          <p className="text-gray-500 mt-1">Enter a new password below.</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-center mb-4 font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-600">
              New Password
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Enter new password"
                required
              />
              {newPassword.length >= 8 && (
                <CheckCircle className="text-green-500 mr-3" size={20} />
              )}
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-600">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent outline-none"
                placeholder="Re-enter password"
                required
              />
              {newPassword === confirmPassword && confirmPassword && (
                <CheckCircle className="text-green-500 mr-3" size={20} />
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-full font-semibold shadow-md mt-4 hover:shadow-lg transition-all duration-300"
          >
            Change Password ➜
          </button>

          {/* Links */}
          <div className="text-center mt-4 text-sm text-gray-600">
            <a href="#" className="hover:text-indigo-700 transition">
              Forgot Password?
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-indigo-700 ml-2 transition">
              Need Help?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
