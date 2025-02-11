import React, { useState } from "react";

const FilterTabs = ({ grievances, setFilteredGrievances }) => {
  const [selectedTab, setSelectedTab] = useState("All");

  const tabs = ["All", "Rejected", "Under process"];

  const filterGrievances = (status) => {
    setSelectedTab(status);
    if (status === "All") {
        // console.log("bye");
      setFilteredGrievances(grievances);
    } else {
        // console.log("hi");
        // console.log(status);
        // console.log(grievances);
        // grievances.filter((g) => console.log(g.currentStatus));
      setFilteredGrievances(
        grievances.filter((g) => g.currentStatus === status)
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
