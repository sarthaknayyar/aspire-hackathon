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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {/* Show the Form if Grievance is Not Fetched */}
      {!grievance ? (
        <>
          <h2 className="text-xl font-bold mb-4 text-center">Check Grievance Status</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input Field */}
            <div>
              <label className="block text-lg font-semibold mb-1">Grievance Code</label>
              <input
                type="text"
                value={grievanceCode}
                onChange={(e) => setGrievanceCode(e.target.value)}
                placeholder="Enter your grievance code"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Check Status
            </button>
          </form>
        </>
      ) : (
        /* Show Grievance Details */
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-center mb-4">Grievance Details</h2>

          <div className="space-y-2">
            <p><strong>Complainant Name:</strong> {grievance.complainantName}</p>
            <p><strong>Complainant Email:</strong> {grievance.complainantEmail}</p>
            <p><strong>Department:</strong> {grievance.department}</p>
            {/* <p><strong>Grievance Code:</strong> {grievance.grievanceCode}</p> */}
            <p><strong>Description:</strong> {grievance.description}</p>
            <p><strong>Current Status:</strong> <span className="text-blue-600 font-semibold">{grievance.currentStatus}</span></p>
            <p><strong>Created At:</strong> {new Date(grievance.createdAt).toLocaleString()}</p>
            <p><strong>Last Updated:</strong> {new Date(grievance.updatedAt).toLocaleString()}</p>
          </div>

          {/* Back Button */}
          <div className="text-center mt-4">
            <button
              onClick={() => setGrievance(null)} // Reset to show the form again
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Check Another Grievance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
