import React, { useState } from "react";

const FilterTabs = ({ grievances, setFilteredGrievances }) => {
  const [selectedTab, setSelectedTab] = useState("All");

  const tabs = ["All", "Resolved", "Pending"];

  const filterGrievances = (status) => {
    setSelectedTab(status);
    if (status === "All") {
      setFilteredGrievances(grievances);
    } else {
      setFilteredGrievances(
        grievances.filter((g) => g.currentStatus.toLowerCase() === status.toLowerCase())
      );
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => filterGrievances(tab)}
            className={`py-2 px-4 rounded ${selectedTab === tab ? "bg-green-900 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search for grievances"
        className="border p-2 rounded"
        onChange={(e) => {
          const searchQuery = e.target.value.toLowerCase();
          setFilteredGrievances(
            grievances.filter((g) =>
              g.complainantName.toLowerCase().includes(searchQuery) ||
              g.grievanceCode.toLowerCase().includes(searchQuery)
            )
          );
        }}
      />
    </div>
  );
};

export default FilterTabs;
