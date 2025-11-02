import React, { useState } from "react";

const FilterTabs = ({ grievances, setFilteredGrievances }) => {
  const [selectedTab, setSelectedTab] = useState("All");

  const tabs = ["All", "Resolution Provided", "Under Review", "Investigation", "Complaint Filed"];

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
        grievances.filter((g) => g.currentStatus.toLowerCase() === status.toLowerCase())
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 ">
      {/* Tabs */}
      <div className="flex space-x-4 bg-gray-100 p-2 rounded-lg shadow-md ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => filterGrievances(tab)}
            className={`py-2 px-6 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              selectedTab === tab
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <input
          type="text"
          placeholder="🔍 Search grievances..."
          className="w-full p-3 pl-10 text-sm bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          onChange={(e) => {
            const searchQuery = e.target.value.toLowerCase();
            setFilteredGrievances(
              grievances.filter(
                (g) =>
                  g.complainantName.toLowerCase().includes(searchQuery) ||
                  g.grievanceCode.toLowerCase().includes(searchQuery)
              )
            );
          }}
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">

        </span>
      </div>
    </div>
  );
};

export default FilterTabs;
