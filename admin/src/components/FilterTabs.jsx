import React from "react";

const FilterTabs = () => {
  const tabs = ["All", "Active", "Pending", "Drafts"];

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded ${
              index === 0 ? "bg-green-900 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search for clients, businesses"
        className="border p-2 rounded"
      />
    </div>
  );
};

export default FilterTabs;
