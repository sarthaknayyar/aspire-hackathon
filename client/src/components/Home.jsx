import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  
  const [grievances, setGrievances] = useState([]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Calculate the index of the first and last entries for the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = grievances.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle next and previous page actions
  const nextPage = () => {
    if (currentPage < Math.ceil(grievances.length / entriesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Dynamic card calculations
  const totalGrievances = grievances.length;
  const pendingGrievances = grievances.filter((g) => (g.currentStatus !== "Resolution Provided" && g.currentStatus !== "Rejected")).length;
  const closedGrievances = totalGrievances - pendingGrievances;

  // Array of card data for easy mapping + animation
  const cardData = [
    {
      key: "total",
      title: "Total Grievances Registered",
      value: totalGrievances,
      gradientClass: "from-indigo-500 to-indigo-600",
    },
    {
      key: "pending",
      title: "Number of Grievances Pending",
      value: pendingGrievances,
      gradientClass: "from-green-500 to-green-600",
    },
    {
      key: "closed",
      title: "Number of Grievances Closed",
      value: closedGrievances,
      gradientClass: "from-red-500 to-red-600",
    },
  ];


  useEffect(() => {
    const fetchGrievances = async () => {
      const response = await fetch("https://aspire-hackathon.onrender.com/grievance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setGrievances(data);
      }
    };
    fetchGrievances();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Summary Cards */}
      <div className="mt-10 mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-5 px-5">
        {cardData.map((card, index) => (
          <motion.div
            key={card.key}
            // Initial and animate state for each card
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            // Stagger the animations with a small delay for each card
            transition={{ duration: 0.5, delay: 0.2 * index }}
            // Scale up on hover
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-r ${card.gradientClass} text-white p-6 rounded-xl shadow-xl cursor-pointer`}
          >
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="mt-2">{card.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Grievances Table */}
      <div className="mt-10 mx-auto max-w-6xl bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">List of Grievances</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Sn.</th>
                <th className="p-3">Registration Number</th>
                <th className="p-3">Received Date</th>
                <th className="p-3">Grievance Description</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((grievance, index) => (
                <tr
                  key={grievance.id}
                  className={`border-b last:border-b-0 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="p-3">{indexOfFirstEntry + index + 1}</td>
                  <td className="p-3">{grievance.grievanceCode}</td>
                  <td className="p-3">{new Date(grievance.createdAt
                    
                  ).toISOString().split("T")[0]}</td>
                  <td className="p-3">
                    {(() => {
                      const words = grievance.description.split(" ");
                      return words.length > 3
                        ? words.slice(0, 3).join(" ") + "..."
                        : grievance.description;
                    })()}
                  </td>
                  <td className="p-3 font-semibold">{grievance.currentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-5 flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Prev
          </button>
          <p className="text-gray-700">
            Page {currentPage} of {Math.max(1, Math.ceil(grievances.length / entriesPerPage))}
          </p>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(grievances.length / entriesPerPage)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              currentPage === Math.ceil(grievances.length / entriesPerPage)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
