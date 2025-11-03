import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // For notifications
import { useNavigate } from "react-router-dom";

const GrievanceForm = () => {
  const { department } = useParams();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // <-- add these two states
  const [showSpamModal, setShowSpamModal] = useState(false);
  const [spamInfo, setSpamInfo] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store selected file
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Quick client validation
    if (!description || description.trim().length < 5) {
      toast.error("Please enter a meaningful description.");
      return;
    }

    try {
      // 1) call spam-check endpoint
      const spamResp = await fetch("https://aspire-hackathon.onrender.com/grievance/spam-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ text: description }),
      });

      let spamResult = { spam: false };
      if (spamResp.ok) {
        // spam-check should return { spam: true/false } — extra fields ignored
        spamResult = await spamResp.json();
      } else {
        // If spam check fails, allow submission but warn user
        const err = await spamResp.json().catch(() => ({ message: spamResp.statusText }));
        toast.error("Spam-check temporarily unavailable: " + (err.message || spamResp.status));
        // continue submitting with isSpam=false
      }

      // If spam, show popup/inform the user but still proceed to save in DB
      if (spamResult.spam) {
        console.log("Grievance flagged as spam:", spamResult);
        setSpamInfo(spamResult);
        setShowSpamModal(true);
        // keep going to submit — user will see popup (you could also wait for confirmation)
      }

      // 2) Upload file if present
      let uploadedFilename = null;
      if (file) {
        const form = new FormData();
        form.append("file", file);

        const uploadResp = await fetch("https://aspire-hackathon.onrender.com/upload", {
          method: "POST",
          body: form,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (!uploadResp.ok) {
          const err = await uploadResp.json().catch(() => ({ message: uploadResp.statusText }));
          toast.error("File upload failed: " + (err.message || uploadResp.status));
          return;
        }
        const uploadData = await uploadResp.json();
        uploadedFilename = uploadData.filename;
      }

      // 3) Submit grievance with spam metadata
      const payload = {
        department,
        category,
        subcategory,
        description,
        remarks,
        fileName: uploadedFilename,
        isSpam: !!spamResult.spam
      };
      console.log("Submitting grievance payload:", payload);

      const response = await fetch("https://aspire-hackathon.onrender.com/grievance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        toast.success(spamResult.spam ? "Submitted — flagged as likely spam and will be reviewed." : "Grievance submitted successfully!");
        // optional: if spam popup not shown yet, show it
        if (spamResult.spam && !showSpamModal) {
          setSpamInfo(spamResult);
          setShowSpamModal(true);
        }
        setTimeout(() => navigate("/homepage"), 1300);
      } else {
        const err = await response.json().catch(() => ({ message: response.statusText }));
        toast.error("Failed to submit grievance: " + (err.message || response.status));
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

      {/* Spam Modal (minimal) */}
      {showSpamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowSpamModal(false)} />
          <div className="bg-white rounded-lg p-6 z-60 max-w-lg mx-4 shadow-xl">
            <h3 className="text-xl font-semibold text-red-600 mb-2">⚠️ Possible Spam Detected</h3>
            <p className="text-gray-700 mb-3">
              Our automated system has flagged this grievance as likely spam.
              It has still been saved and will be reviewed by a human officer.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowSpamModal(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceForm;
