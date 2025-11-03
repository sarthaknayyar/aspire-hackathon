import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AIPDFAnalyzer from "../components/AIPDFAnalyzer";
import Confetti from "react-confetti";

function GrievanceDetail() {
  const { grievanceCode } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI states
  const [currentStage, setCurrentStage] = useState("Complaint Filed"); // selected by user (unsaved)
  const [currentStatus, setCurrentStatus] = useState("Complaint Filed"); // last saved status
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await fetch(
          `https://aspire-hackathon.onrender.com/grievance/grievanceCode/${grievanceCode}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setGrievance(data);

          const savedStatus = data.currentStatus || data.currentStage || "Complaint Filed";
          setCurrentStatus(savedStatus);
          setCurrentStage(savedStatus);
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
    Investigation: {
      default: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      active: "bg-blue-500 text-white",
    },
    "Resolution Provided": {
      default: "bg-gray-300 text-gray-800 hover:bg-gray-400",
      active: "bg-gray-700 text-white",
    },
  };

  const stages = [
    "Complaint Filed",
    "Under Review",
    "Investigation",
    "Resolution Provided",
  ];

  const showFile = async () => {
    try {
      const response = await fetch(`https://aspire-hackathon.onrender.com/download/${grievance.fileName}`, {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("❌ File not found.");
      }
    } catch (error) {
      console.error("❌ Error fetching file:", error);
      alert("❌ Failed to open file.");
    }
  };

  // Toggle handler: now toggles both on and off
  const aiResolvedToggle = async () => {
    // store previous values to revert on failure
    const prevAiResolved = grievance.aiResolved;
    const prevStage = currentStatus;

    const newAiResolved = !prevAiResolved;
    const targetStage = newAiResolved ? "Resolution Provided" : "Complaint Filed";

    // optimistic UI update
    setGrievance((g) => ({ ...g, aiResolved: newAiResolved }));
    setCurrentStage(targetStage);
    setCurrentStatus(targetStage);

    try {
      const response = await fetch(
        `https://aspire-hackathon.onrender.com/grievance/grievanceCode/${grievanceCode}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentStatus: targetStage,
            aiResolved: newAiResolved,
          }),
        }
      );

      if (!response.ok) {
        // revert UI if server fails
        setGrievance((g) => ({ ...g, aiResolved: prevAiResolved }));
        setCurrentStage(prevStage);
        setCurrentStatus(prevStage);
        const err = await response.json().catch(() => ({}));
        alert("❌ Failed to update AI flag: " + (err.message || response.status));
        return;
      }

      // success case:
      if (newAiResolved) {
        // celebration and navigate after delay
        setShowPopup(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowPopup(false);
          setShowConfetti(false);
          navigate("/");
        }, 3000);
      } else {
        // unticked — remain on page; optionally show a small notice
        // e.g., toast.success("AI Assistance removed and stage reset to Complaint Filed")
        // For now, show a simple alert:
        // alert("AI Assistance flag removed and stage set to Complaint Filed.");
      }
    } catch (err) {
      console.error("❌ Error updating AI flag:", err);
      // revert
      setGrievance((g) => ({ ...g, aiResolved: prevAiResolved }));
      setCurrentStage(prevStage);
      setCurrentStatus(prevStage);
      alert("❌ Network error while updating AI flag.");
    }
  };

  // select stage (no save)
  const handleStageSelect = (stage) => {
    setCurrentStage(stage);
  };

  // Save button persists the selected stage (unchanged)
  const handleSave = async () => {
    if (currentStage === currentStatus) {
      alert("No changes to save.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `https://aspire-hackathon.onrender.com/grievance/grievanceCode/${grievanceCode}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentStatus: currentStage }),
        }
      );

      if (response.ok) {
        setCurrentStatus(currentStage);

        if (currentStage === "Resolution Provided") {
          setShowPopup(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowPopup(false);
            setShowConfetti(false);
            navigate("/");
          }, 3000);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        const err = await response.json().catch(() => ({}));
        alert("❌ Failed to save status: " + (err.message || response.status));
      }
    } catch (error) {
      console.error("❌ Error saving status:", error);
      alert("❌ Failed to save status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 p-8 bg-white shadow-lg rounded-3xl border border-gray-200">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti numberOfPieces={600} recycle={false} />
        </div>
      )}

      {showPopup && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="p-6 bg-white rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600">🎉 Grievance Resolved! 🎉</h2>
            <p className="mt-2 text-lg text-gray-700">The issue has been successfully addressed.</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6">📑 Grievance Details</h2>
      <p className="text-gray-500 text-sm mb-6">
        Tracking ID: <span className="font-medium">{grievance.grievanceCode}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Complainant Name:</strong> {grievance.complainantName}
          </p>
          <p className="text-lg">
            <strong>Registered Email:</strong> {grievance.complainantEmail}
          </p>
          <p className="text-lg">
            <strong>Date of Filing:</strong>{" "}
            {new Date(grievance.createdAt).toISOString().split("T")[0]}
          </p>

          <p className="text-lg">
            <strong>Issue Description:</strong> {grievance.description}
          </p>

          <p className="text-lg flex items-center">
            <strong>AI Assistance Used For Resolution:</strong>
            <input
              type="checkbox"
              checked={!!grievance.aiResolved}
              className="ml-2 w-5 h-5 cursor-pointer accent-green-500"
              onChange={aiResolvedToggle}
            />
          </p>

          <p
            className="text-lg hover:text-blue-700 hover:underline cursor-pointer"
            onClick={showFile}
          >
            <strong>View Uploaded Document</strong>
          </p>

        <p className="text-lg hover:text-blue-700 hover:underline cursor-pointer">
            <strong>AI Spam Detected:</strong>{" "}
            {grievance.isSpam ? (
              <span className="text-red-600 font-semibold">Yes</span>
            ) : (
              <span className="text-green-600 font-semibold">No</span>
            )}
        </p>

        </div>

        <div className="space-y-6">
          <div className="p-5 bg-gray-100 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">📌 Grievance Progress</h3>

            <div className="flex flex-wrap gap-3 mb-4">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => handleStageSelect(stage)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition transform duration-200 ${
                    currentStage === stage
                      ? `scale-105 shadow-lg ${stageColors[stage].active}`
                      : `${stageColors[stage].default}`
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>

            {/* Save / Cancel controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving || currentStage === currentStatus}
                className={`px-5 py-2 rounded-full font-semibold shadow-md transition ${
                  saving
                    ? "opacity-60 cursor-wait bg-gray-300 text-gray-700"
                    : currentStage === currentStatus
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white hover:shadow-lg"
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => {
                  setCurrentStage(currentStatus);
                }}
                className="px-4 py-2 rounded-full border text-sm text-gray-700 hover:bg-gray-200"
                disabled={saving || currentStage === currentStatus}
              >
                Cancel
              </button>
            </div>
          </div>

          <AIPDFAnalyzer />
        </div>
      </div>
    </div>
  );
}

export default GrievanceDetail;
