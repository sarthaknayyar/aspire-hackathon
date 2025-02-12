import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AIPDFAnalyzer from "../components/AIPDFAnalyzer";

function GrievanceDetail() {
    const { grievanceCode } = useParams();
    const [grievance, setGrievance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrievance = async () => {
            try {
                const response = await fetch(`http://localhost:5000/grievance/grievanceCode/${grievanceCode}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setGrievance(data);
                } else {
                    console.error("Error fetching grievance:", response.statusText);
                }
            } catch (error) {
                console.error("Network error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGrievance();
    }, [grievanceCode]);

    if (loading) return <p>Loading...</p>;
    if (!grievance) return <p>Grievance not found</p>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Grievance Details</h2>
            <p><strong>Code:</strong> {grievance.grievanceCode}</p>
            <p><strong>Complainant Name:</strong> {grievance.complainantName}</p>
            <p><strong>Description:</strong> {grievance.description}</p>
            <p><strong>Date:</strong> {new Date(grievance.createdAt).toISOString().split("T")[0]}</p>
            <p><strong>Email:</strong> {grievance.complainantEmail}</p>
            <p><strong>AI Resolved:</strong> {grievance.aiResolved ? "Yes" : "No"}</p>
            <p><strong>Status:</strong> {grievance.currentStatus}</p>
            <AIPDFAnalyzer/>
        </div>
    );
}

export default GrievanceDetail;
