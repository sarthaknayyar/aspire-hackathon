import React, { useState } from "react";

export default function Home() {
  // Grievance data
  const [grievances] = useState([
    { id: 1, registrationNumber: "DOUR/E/2025/0000837", receivedDate: "15/01/2025", description: "Housing and Urban Affairs", status: "Under process" },
    { id: 2, registrationNumber: "DOUR/E/2025/0000838", receivedDate: "16/01/2025", description: "Water Supply Issue", status: "Pending" },
    { id: 3, registrationNumber: "DOUR/E/2025/0000839", receivedDate: "17/01/2025", description: "Street Light Issue", status: "Closed" },
    { id: 4, registrationNumber: "DOUR/E/2025/0000840", receivedDate: "18/01/2025", description: "Road Repair Issue", status: "Pending" },
    { id: 5, registrationNumber: "DOUR/E/2025/0000841", receivedDate: "19/01/2025", description: "Electricity Issue", status: "Under process" },
    { id: 6, registrationNumber: "DOUR/E/2025/0000842", receivedDate: "20/01/2025", description: "Garbage Collection", status: "Pending" },
    { id: 7, registrationNumber: "DOUR/E/2025/0000843", receivedDate: "21/01/2025", description: "Public Park Maintenance", status: "Closed" },
    { id: 8, registrationNumber: "DOUR/E/2025/0000844", receivedDate: "22/01/2025", description: "Water Contamination", status: "Under process" },
    { id: 9, registrationNumber: "DOUR/E/2025/0000845", receivedDate: "23/01/2025", description: "Street Nameplate Missing", status: "Pending" },
    { id: 10, registrationNumber: "DOUR/E/2025/0000846", receivedDate: "24/01/2025", description: "Broken Traffic Lights", status: "Closed" },
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Calculate the index of the first and last entries for the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = grievances.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle next and previous page actions
  const nextPage = () => {
    if (currentPage < Math.ceil(grievances.length / entriesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Dynamic card calculations
  const totalGrievances = grievances.length;
  const pendingGrievances = grievances.filter((g) => g.status === "Pending").length;
  const closedGrievances = grievances.filter((g) => g.status === "Closed").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 py-10 text-center shadow-md">
        <h1 className="text-4xl font-bold text-white">Welcome to the Grievance Portal</h1>
        <p className="mt-2 text-white">Manage and view all your grievances in one place</p>
      </header>

      {/* Summary Cards */}
      <div className="mt-10 mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-5 px-5">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-xl transform transition duration-200 hover:scale-105">
          <p className="text-3xl font-bold">{totalGrievances}</p>
          <p className="mt-2">Total Grievances Registered</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-xl transform transition duration-200 hover:scale-105">
          <p className="text-3xl font-bold">{pendingGrievances}</p>
          <p className="mt-2">Number of Grievances Pending</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-xl transform transition duration-200 hover:scale-105">
          <p className="text-3xl font-bold">{closedGrievances}</p>
          <p className="mt-2">Number of Grievances Closed</p>
        </div>
      </div>

      {/* Grievances Table */}
      <div className="mt-10 mx-auto max-w-6xl bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">List of Grievances</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Sn.</th>
                <th className="p-3">Registration Number</th>
                <th className="p-3">Received Date</th>
                <th className="p-3">Grievance Description</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((grievance, index) => (
                <tr
                  key={grievance.id}
                  className={`border-b last:border-b-0 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="p-3">{indexOfFirstEntry + index + 1}</td>
                  <td className="p-3">{grievance.registrationNumber}</td>
                  <td className="p-3">{grievance.receivedDate}</td>
                  <td className="p-3">{grievance.description}</td>
                  <td className="p-3 font-semibold">{grievance.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-5 flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Prev
          </button>
          <p className="text-gray-700">
            Page {currentPage} of {Math.ceil(grievances.length / entriesPerPage)}
          </p>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(grievances.length / entriesPerPage)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              currentPage === Math.ceil(grievances.length / entriesPerPage)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

    
    </div>
  );
}
