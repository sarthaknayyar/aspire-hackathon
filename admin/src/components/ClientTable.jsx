import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import FilterTabs from "./FilterTabs";

const ClientTable = () => {
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

  return (
    <div>
      <FilterTabs grievances={grievances} setFilteredGrievances={setFilteredGrievances} />
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
              <tr key={index} className="border-b">
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
                    onClick={() => generatePDF(client)}
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
