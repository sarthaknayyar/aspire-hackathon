import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react"; // For modern icons

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Change your password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter a new password below to change your password
        </p>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-center mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-4 relative">
            <label
              htmlFor="new-password"
              className="block text-gray-700 font-medium mb-1"
            >
              New password
            </label>
            <div className="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={showNewPassword ? "text" : "password"}
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none outline-none rounded-lg"
                placeholder="Enter your new password"
                required
              />
              {newPassword.length >= 8 && (
                <CheckCircle className="text-green-500 mr-3" size={20} />
              )}
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="px-3"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium mb-1"
            >
              Confirm password
            </label>
            <div className="flex items-center border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-transparent border-none outline-none rounded-lg"
                placeholder="Re-enter your password"
                required
              />
              {newPassword === confirmPassword && confirmPassword && (
                <CheckCircle className="text-green-500 mr-3" size={20} />
              )}
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="px-3"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

