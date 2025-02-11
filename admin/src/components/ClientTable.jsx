import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import FilterTabs from "./FilterTabs";

const ClientTable = () => {
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch("http://localhost:5000/grievance/allGrievances", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setGrievances(data);
          setFilteredGrievances(data);
        } else {
          console.error("Error fetching grievances:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };
    fetchGrievances();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredGrievances.slice(indexOfFirstEntry, indexOfLastEntry);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredGrievances.length / entriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <FilterTabs grievances={grievances} setFilteredGrievances={setFilteredGrievances} />
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="py-3 px-4">Grievance Code</th>
              <th className="py-3 px-4">Complainant</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Date of Receipt</th>
              <th className="py-3 px-4">Complainant Email</th>
              <th className="py-3 px-4">AI Resolved</th>
              <th className="py-3 px-4">Current Status</th>
              <th className="py-3 px-4">Download PDF</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.length > 0 ? (
              currentEntries.map((client, index) => (
                <tr
                  key={index}
                  className={`border-b transition-all hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="py-3 px-4">{client.grievanceCode}</td>
                  <td className="py-3 px-4">{client.complainantName}</td>
                  <td className="py-3 px-4">{client.description?.slice(0, 50) + "..."}</td>
                  <td className="py-3 px-4">{new Date(client.createdAt).toISOString().split("T")[0]}</td>
                  <td className="py-3 px-4">{client.complainantEmail}</td>
                  <td className="py-3 px-4 text-center">
                    <input type="checkbox" checked={client.aiResolved} className="w-5 h-5 cursor-pointer accent-blue" readOnly />
                  </td>
                  <td className="py-3 px-4">{client.currentStatus}</td>
                  <td className="py-3 px-4">
                    <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 cursor-pointer transition-all">
                      Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No grievances found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-5 flex justify-between items-center p-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Prev
          </button>
          <p className="text-gray-700">
            Page {currentPage} of {Math.max(1, Math.ceil(filteredGrievances.length / entriesPerPage))}
          </p>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(filteredGrievances.length / entriesPerPage)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              currentPage === Math.ceil(filteredGrievances.length / entriesPerPage) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientTable;
