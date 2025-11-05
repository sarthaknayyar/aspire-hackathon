import React, { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import FilterTabs from "../components/FilterTabs";
import ClientTable from "../components/ClientTable";

const Clients = () => {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch("https://aspire-hackathon.onrender.com/grievance/allGrievances", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setGrievances(data);
        } else {
          console.error("Error fetching grievances:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };
    fetchGrievances();
  }, []);

  return (
    <div style={{ zoom: "0.9" }}>
      <SummaryCards grievances={grievances} />
      <ClientTable grievances={grievances} /> {/* ✅ Pass grievances as a prop */}
    </div>
  );
};

export default Clients;
