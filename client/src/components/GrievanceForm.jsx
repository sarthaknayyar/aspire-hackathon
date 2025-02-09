import React, { useState } from "react";
import { useParams } from "react-router-dom";

const GrievanceForm = () => {
  const { department } = useParams();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const formData = new FormData();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("Form data", formData);

    try {
      const response = await fetch("http://localhost:5000/grievance", {
        method: "POST",
        body: JSON.stringify({
          department,
          category,
          subcategory,
          description,
          remarks,
          file,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(file);
      if (response.status === 201) {
        alert("Grievance submitted successfully!");
      } else {
        alert("Failed to submit grievance");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit grievance");
    }
  }
  const mainCategories = [
    { value: "billing", label: "Billing Issues" },
    { value: "technical", label: "Technical Problems" },
    { value: "customer_service", label: "Customer Service" },
    { value: "general", label: "General Inquiry" },
  ];

  const subcategories = {
    billing: [
      { value: "payment_failed", label: "Payment Failed" },
      { value: "refund", label: "Refund Request" },
    ],
    technical: [
      { value: "login_issue", label: "Login Issue" },
      { value: "app_crash", label: "App Crashing" },
    ],
    customer_service: [
      { value: "response_delay", label: "Delayed Response" },
      { value: "miscommunication", label: "Miscommunication" },
    ],
    general: [
      { value: "feedback", label: "Feedback" },
      { value: "other", label: "Other" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Submit Your Grievance
        </h1>

        {/* Department Name (Read-only) */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Department Name
          </label>
          <div className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-3 text-gray-800">
            {department}
          </div>
        </div>

        {/* Main Category Dropdown */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Main Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {mainCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Subcategory
          </label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!category} // Disable if no main category is selected
          >
            <option value="" disabled>
              {category
                ? "Select a subcategory"
                : "Select a main category first"}
            </option>
            {category &&
              subcategories[category]?.map((subcat) => (
                <option key={subcat.value} value={subcat.value}>
                  {subcat.label}
                </option>
              ))}
          </select>
        </div>

        {/* Complaint */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Complaint
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your description..."
            rows="4"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remarks */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Remarks
          </label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Any additional remarks"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload PDF */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Upload Supporting Document (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Grievance
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrievanceForm;
