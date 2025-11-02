import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterTabs from "./FilterTabs";

const ClientTable = () => {
    const navigate = useNavigate();
    const [loadingGrievance, setLoadingGrievance] = useState(null);
    const [grievances, setGrievances] = useState([]);
    const [filteredGrievances, setFilteredGrievances] = useState([]);

    // Pagination States
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

    
    const fetchAISolution = async (description) => {
        try {
          const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCHK_9m7dwti-kYYWmr-ciR-Kp9_QTgvOc",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              contents: [
                {
                  parts: [{ text: `Analyze the problem and provide a detailed solution with highlighted points regarding how to solve the problem from the perspective of a Government officer: ${description}` }],
                },
              ],
            },
          });
          return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error generating AI solution";
        } catch (error) {
          console.error("Error fetching AI solution:", error);
          return "Error generating AI solution";
        }
      };

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

      const generatePDF = async (grievance) => {
        const aiSolution = await fetchAISolution(grievance.description);
    
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Grievance Report", 14, 20);
    
        const tableColumn = ["Field", "Value"];
        const tableRows = [
          ["Grievance Code", grievance.grievanceCode],
          ["Complainant Name", grievance.complainantName],
          ["Description", grievance.description || "No description available"],
          ["Date of Receipt", new Date(grievance.createdAt).toISOString().split("T")[0]],
          ["Complainant Email", grievance.complainantEmail],
          ["AI Resolved", grievance.aiResolved ? "Yes" : "No"],
          ["Current Status", grievance.currentStatus],
          ["AI Proposed Solution", aiSolution],
        ];
        doc.autoTable({ startY: 30, head: [tableColumn], body: tableRows });
        doc.save(`Grievance_${grievance.grievanceCode}.pdf`);
      };

    // Handle AI Resolved Toggle
    const toggleAIResolved = (index, event) => {
        event.stopPropagation(); // Prevent row click
        const updatedGrievances = [...filteredGrievances];
        updatedGrievances[index].aiResolved = !updatedGrievances[index].aiResolved;
        setFilteredGrievances(updatedGrievances);
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * entriesPerPage;
    const indexOfFirstItem = indexOfLastItem - entriesPerPage;
    const currentGrievances = filteredGrievances.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredGrievances.length / entriesPerPage)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <FilterTabs grievances={grievances} setFilteredGrievances={setFilteredGrievances} />
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full border-collapse rounded-lg">
                    <thead className="bg-gray-800 text-white sticky top-0">
                        <tr>
                            {["Grievance Code", "Complainant", "Description", "Date of Receipt", "Email", "AI Resolved", "Status", "Download"]
                                .map((header, index) => (
                                    <th key={index} className="py-3 px-4 text-left font-medium">{header}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentGrievances.length > 0 ? (
                            currentGrievances.map((client, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-gray-100 transition duration-200 ${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`} // Striped Rows
                                    onClick={() => navigate(`/grievance/${client.grievanceCode}`)}
                                >
                                    <td className="py-3 px-4">{client.grievanceCode}</td>
                                    <td className="py-3 px-4">{client.complainantName}</td>
                                    <td className="py-3 px-4">{client.description?.slice(0, 20) + "..."}</td>
                                    <td className="py-3 px-4">{new Date(client.createdAt).toISOString().split("T")[0]}</td>
                                    <td className="py-3 px-4">{client.complainantEmail}</td>
                                    <td className="py-3 px-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={client.aiResolved} // ✅ Checkbox is controlled by `aiResolved`
                                            readOnly // ✅ Prevents manual changes
                                            className="w-5 h-5 cursor-default" // ✅ Removes pointer cursor
                                        />
                                    </td>

                                    <td className="py-3 px-4">{client.currentStatus}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center transition duration-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                generatePDF(client);
                                            }}
                                            disabled={loadingGrievance === client.grievanceCode}
                                        >
                                            {loadingGrievance === client.grievanceCode ? "Downloading..." : "Download"}
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
            </div>

            {/* Pagination Controls */}
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
                    Page {currentPage} of {Math.max(1, Math.ceil(filteredGrievances.length / entriesPerPage))}
                </p>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredGrievances.length / entriesPerPage)}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                        currentPage === Math.ceil(filteredGrievances.length / entriesPerPage)
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ClientTable;
