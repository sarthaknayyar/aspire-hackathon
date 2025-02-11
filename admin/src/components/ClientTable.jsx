import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientTable = () => {
    const navigate = useNavigate();
    const [grievances, setGrievances] = useState([]);
    const [filteredGrievances, setFilteredGrievances] = useState([]);

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

    const generatePDF = (grievance) => {
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
        ];
        doc.autoTable({ startY: 30, head: [tableColumn], body: tableRows });
        doc.save(`Grievance_${grievance.grievanceCode}.pdf`);
    };

    return (
        <div>
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr>
                        <th className="py-3 px-4 text-left">Grievance Code</th>
                        <th className="py-3 px-4 text-left">Complainant</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Date of Receipt</th>
                        <th className="py-3 px-4 text-left">Complainant Email</th>
                        <th className="py-3 px-4 text-left">AI Resolved</th>
                        <th className="py-3 px-4 text-left">Current Status</th>
                        <th className="py-3 px-4 text-left">Download PDF</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGrievances.length > 0 ? (
                        filteredGrievances.map((client, index) => (
                            <tr
                                key={index}
                                className="border-b cursor-pointer hover:bg-gray-100"
                                onClick={() => navigate(`/grievance/${client.grievanceCode}`)}
                            >
                                <td className="py-3 px-4">{client.grievanceCode}</td>
                                <td className="py-3 px-4">{client.complainantName}</td>
                                <td className="py-3 px-4">{client.description?.slice(0, 50) + "..."}</td>
                                <td className="py-3 px-4">{new Date(client.createdAt).toISOString().split("T")[0]}</td>
                                <td className="py-3 px-4">{client.complainantEmail}</td>
                                <td className="py-3 px-4">{client.aiResolved ? "Yes" : "No"}</td>
                                <td className="py-3 px-4">{client.currentStatus}</td>
                                <td className="py-3 px-4">
                                    <button
                                        className="bg-green-600 text-white px-4 py-1 rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            generatePDF(client);
                                        }}
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4">No grievances found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;
