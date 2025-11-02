import { useState } from "react";

export default function Status() {
  const [grievanceCode, setGrievanceCode] = useState("");
  const [grievance, setGrievance] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/grievance/grievanceCode/${grievanceCode}`);
      
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
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Track Your Grievance</h2>
          <p className="text-gray-500 mt-1">Enter your grievance code to check the current status.</p>
        </div>

        {!grievance ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grievance Code Input */}
            <div>
              <label className="text-sm font-semibold text-gray-600">Grievance Code</label>
              <input
                type="text"
                value={grievanceCode}
                onChange={(e) => setGrievanceCode(e.target.value)}
                placeholder="Enter your grievance code"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg  hover:cursor-pointer transition-all duration-300"
            >
              Check Status
            </button>
          </form>
        ) : (
          /* Grievance Details */
          <div className="p-5 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-lg shadow-xl transition-all">
            <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
              Grievance Details
            </h2>

            <div className="space-y-3">
              <p><span className="font-semibold text-gray-700">Name:</span> {grievance.complainantName}</p>
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
                className="w-full  bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-gray-600 hover:cursor-pointer transition-all duration-300"
              >
                Track Another Grievance
              </button>
            </div>
          </div>
        )}

        {/* Terms & Privacy */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          By using this service, you agree to our{" "}
          <a href="#" className="text-blue-600 underline">Terms of Service</a> and{" "}
          <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}