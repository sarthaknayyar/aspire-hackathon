import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AIPDFAnalyzer from "../components/AIPDFAnalyzer";
import Confetti from "react-confetti"; // 🎊 Import Confetti animation
import { useNavigate } from "react-router-dom";

function GrievanceDetail() {
    const { grievanceCode } = useParams();
    const [grievance, setGrievance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentStage, setCurrentStage] = useState("Complaint Filed");
    const [currentStatus, setCurrentStatus] = useState("Complaint Filed");
    const [showPopup, setShowPopup] = useState(false); // Popup visibility
    const [showConfetti, setShowConfetti] = useState(false); // Confetti effect
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGrievance = async () => {
            try {
                const response = await fetch(`https://aspire-hackathon.onrender.com/grievance/grievanceCode/${grievanceCode}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setGrievance(data);
                    setCurrentStage(data.currentStage || "Complaint Filed");
                    setCurrentStage(data.currentStatus || "Complaint Filed");
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!grievance) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
                ❌ No grievance found. Please check the reference ID.
            </div>
        );
    }

    const stageColors = {
        "Complaint Filed": {
            default: "bg-green-100 text-green-700 hover:bg-green-200",
            active: "bg-green-500 text-white",
        },
        "Under Review": {
            default: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
            active: "bg-yellow-500 text-white",
        },
        "Investigation": {
            default: "bg-blue-100 text-blue-700 hover:bg-blue-200",
            active: "bg-blue-500 text-white",
        },
        "Resolution Provided": {
            default: "bg-gray-300 text-gray-800 hover:bg-gray-400",
            active: "bg-gray-700 text-white",
        }
    };

    const stages = [
        "Complaint Filed",
        "Under Review",
        "Investigation",
        "Resolution Provided"
    ];

    const showFile = async () => {
        try {
            const response = await fetch(`https://aspire-hackathon.onrender.com/download/${grievance.fileName}`, {
                method: "GET",
            });
    
            if (response.ok) {
                const blob = await response.blob(); // Convert to a Blob
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank"); // ✅ Opens the file in a new tab
            } else {
                alert("❌ File not found.");
            }
        } catch (error) {
            console.error("❌ Error fetching file:", error);
            alert("❌ Failed to open file.");
        }
    };

    const aiResolvedTick = async () => {
        setCurrentStage("Resolution Provided");
        setCurrentStatus("Resolution Provided");
        console.log("currentStage", currentStage);
        try {
            const response = await fetch(`https://aspire-hackathon.onrender.com/grievance/grievanceCode/${grievanceCode}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentStatus: "Resolution Provided",
                    aiResolved: true,
                }),
            });
            if (response.ok) {
                alert("✅ AI Assistance flag updated successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 1000);

            } else {
                alert("❌ Failed to update AI flag.");
            }

        }
        catch (error) {
            console.error("❌ Error updating AI flag:", error);
            alert("❌ Failed to update AI flag.");
        }
    };

    

    const handleStageClick = async(stage) => {
        setCurrentStage(stage);
        const response = await fetch(`https://aspire-hackathon.onrender.com/grievance/grievanceCode/${grievanceCode}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentStatus: stage,
            }),
        });

        // Show confetti & popup when "Resolution Provided" is clicked 🎊
        if (stage === "Resolution Provided") {
            setShowPopup(true);
            setShowConfetti(true);

            // Stop confetti & hide popup after 3 seconds
            setTimeout(() => {
                setShowPopup(false);
                setShowConfetti(false);
            }, 3000);
        }
        setTimeout(() => {
            navigate("/");
        }, 4000);


    };

    return (
        <div className="w-full mx-auto mt-10 p-8 bg-white shadow-lg rounded-3xl border border-gray-200">
           
            {/* 🎊 Confetti Animation */}
            {showConfetti && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    <Confetti numberOfPieces={600} recycle={false} />
                </div>
            )}

            {/* Black Opaque Overlay */}
            {showPopup && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}

            {/* 🎉 Celebration Popup Message */}
            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="p-6 bg-white rounded-xl shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-600">🎉 Grievance Resolved! 🎉</h2>
                        <p className="mt-2 text-lg text-gray-700">The issue has been successfully addressed.</p>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📑 Grievance Details</h2>
            <p className="text-gray-500 text-sm mb-6">Tracking ID: <span className="font-medium">{grievance.grievanceCode}</span></p>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-lg"><strong>Complainant Name:</strong> {grievance.complainantName}</p>
                    <p className="text-lg"><strong>Registered Email:</strong> {grievance.complainantEmail}</p>
                    <p className="text-lg"><strong>Date of Filing:</strong> {new Date(grievance.createdAt).toISOString().split("T")[0]}</p>
                    
                    <p className="text-lg"><strong>Issue Description:</strong> {grievance.description}</p>
                    <p className="text-lg flex items-center">
                        <strong>AI Assistance Used:</strong>
                        <input type="checkbox" checked={grievance.aiResolved} className="ml-2 w-5 h-5 cursor-pointer accent-green-500" onClick={aiResolvedTick} />
                    </p>
                    <p className="text-lg hover:text-blue-700 hover:underline cursor-pointer" onClick={showFile}>
                        <strong>View Uploaded Document</strong>
                    </p>
                </div>

                <div className="space-y-6 ">
                    <div className="p-5 bg-gray-100 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">📌 Grievance Progress</h3>
                        <div className="flex flex-wrap gap-3">
                            {Object.keys(stageColors).map((stage) => (
                                <button key={stage} onClick={() => handleStageClick(stage)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition cursor-pointer transform duration-200 ${
                                        currentStage === stage ? `scale-105 shadow-lg ${stageColors[stage].active}` : `${stageColors[stage].default}`
                                    }`}
                                >{stage}</button>
                            ))}
                        </div>
                    </div>

                    <AIPDFAnalyzer />
                </div>
            </div>
        </div>
    );
}

export default GrievanceDetail;
