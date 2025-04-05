import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // For notifications


const GrievanceForm = () => {
  const { department } = useParams();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store selected file
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Step 1: Check if the description is spam
      const spamResponse = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const spamResult = await spamResponse.json();

      if (spamResult.spam) {
        toast.error("Spam detected! Cannot submit grievance.", {
          style: { backgroundColor: "#ff4d4d", color: "white" },
        });
        return;
      }

      // Step 2: If not spam, submit the grievance
      const response = await fetch("https://aspire-hackathon.onrender.com/grievance", {
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

      if (response.status === 201) {
        toast.success("Grievance submitted successfully!");
      } else {
        toast.error("Failed to submit grievance");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit grievance");
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
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <Toaster />

      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bgg.jpg')" }}
      ></div>

      {/* Right Side - Animated Form */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="w-1/2 flex items-center justify-start p-12"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl p-6 bg-white shadow-2xl rounded-xl transition-all duration-300 ease-in-out"
          style={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)" }}
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
              disabled={!category}
            >
              <option value="" disabled>
                {category ? "Select a subcategory" : "Select a main category first"}
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
              placeholder="Describe your issue..."
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
              className=" w-[23vw] bg-gradient-to-r from-[#ffb703] to-[#fb8500] text-white px-6 py-3 text-white py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-300"
            >
              Submit Grievance
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default GrievanceForm;
