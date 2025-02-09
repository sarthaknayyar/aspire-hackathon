import React, { useState } from "react";

export default function Status() {
  const [grievanceCode, setGrievanceCode] = useState("");
  const [grievance, setGrievance] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await fetch(`http://localhost:5000/grievance/${grievanceCode}`);

      if (!response.ok) {
        throw new Error("Grievance not found");
      }

      const data = await response.json();
      setGrievance(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl transition-all duration-300">
        {!grievance ? (
          <>
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 text-center">Check Grievance Status</h2>
            <p className="text-gray-500 text-center mt-2">
              Enter your grievance code below to check the current status.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Input Field */}
              <div>
                <label className="text-sm font-semibold text-gray-600">Grievance Code</label>
                <input
                  type="text"
                  value={grievanceCode}
                  onChange={(e) => setGrievanceCode(e.target.value)}
                  placeholder="Enter grievance code"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none mt-1 transition-all"
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Check Status
              </button>
            </form>
          </>
        ) : (
          /* Grievance Details */
          <div className="p-4 bg-gray-100 rounded-lg shadow-md transition-all">
            <h2 className="text-lg font-bold text-center text-gray-800 mb-4">Grievance Details</h2>

            <div className="space-y-3">
              <p><span className="font-semibold text-gray-700">Complainant Name:</span> {grievance.complainantName}</p>
              <p><span className="font-semibold text-gray-700">Email:</span> {grievance.complainantEmail}</p>
              <p><span className="font-semibold text-gray-700">Department:</span> {grievance.department}</p>
              <p><span className="font-semibold text-gray-700">Description:</span> {grievance.description}</p>
              <p>
                <span className="font-semibold text-gray-700">Status:</span>
                <span className="text-blue-600 font-semibold"> {grievance.currentStatus}</span>
              </p>
              <p><span className="font-semibold text-gray-700">Created At:</span> {new Date(grievance.createdAt).toLocaleString()}</p>
              <p><span className="font-semibold text-gray-700">Last Updated:</span> {new Date(grievance.updatedAt).toLocaleString()}</p>
            </div>

            {/* Back Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => setGrievance(null)}
                className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition-all duration-300"
              >
                Check Another Grievance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
