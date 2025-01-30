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
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-center mt-10 font-bold">Welcome to the Grievance Portal</h1>

      {/* Summary Cards */}
      <div className="mt-10 mx-auto max-w-6xl grid grid-cols-3 gap-5">
        <div className="bg-orange-500 text-white p-5 rounded-lg text-center shadow-lg">
          <p className="text-2xl font-bold">{totalGrievances}</p>
          <p className="mt-2">Total Grievances Registered</p>
        </div>
        <div className="bg-green-500 text-white p-5 rounded-lg text-center shadow-lg">
          <p className="text-2xl font-bold">{pendingGrievances}</p>
          <p className="mt-2">Number of Grievances Pending</p>
        </div>
        <div className="bg-red-500 text-white p-5 rounded-lg text-center shadow-lg">
          <p className="text-2xl font-bold">{closedGrievances}</p>
          <p className="mt-2">Number of Grievances Closed</p>
        </div>
      </div>

      {/* Grievances Table */}
      <div className="mt-10 mx-auto max-w-6xl bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-5">List of Grievances</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-300 p-2">Sn.</th>
              <th className="border border-gray-300 p-2">Registration Number</th>
              <th className="border border-gray-300 p-2">Received Date</th>
              <th className="border border-gray-300 p-2">Grievance Description</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((grievance, index) => (
              <tr key={grievance.id} className="bg-gray-100">
                <td className="border border-gray-300 p-2">{indexOfFirstEntry + index + 1}</td>
                <td className="border border-gray-300 p-2">{grievance.registrationNumber}</td>
                <td className="border border-gray-300 p-2">{grievance.receivedDate}</td>
                <td className="border border-gray-300 p-2">{grievance.description}</td>
                <td className="border border-gray-300 p-2">{grievance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
          >
            Prev
          </button>
          <p className="text-gray-600">
            Page {currentPage} of {Math.ceil(grievances.length / entriesPerPage)}
          </p>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(grievances.length / entriesPerPage)}
            className={`px-4 py-2 rounded ${
              currentPage === Math.ceil(grievances.length / entriesPerPage) ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
