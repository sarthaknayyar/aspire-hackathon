import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const GrievanceForm = () => {
  const { department } = useParams(); 
  const [category, setCategory] = useState('');
  const [complaint, setComplaint] = useState('');
  const [remarks, setRemarks] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send the data to an API or backend.
    const formData = new FormData();
    formData.append('department', department);
    formData.append('category', category);
    formData.append('complaint', complaint);
    formData.append('remarks', remarks);
    formData.append('file', file);

    // Example: log to the console (replace with your own submission logic)
    console.log('Form data to be submitted:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md mt-10 p-6 bg-white shadow-md rounded-lg">
  {/* Department Name (Read-only) */}
  <div className="mb-4">
    <label className="block text-lg font-bold mb-1">Department Name</label>
    <div className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2">
      {department}
    </div>
  </div>

  {/* Main Category */}
  <div className="mb-4">
    <label className="block text-lg font-bold mb-1">Main Category</label>
    <input
      type="text"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      placeholder="Enter main category"
      required
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Complaint */}
  <div className="mb-4">
    <label className="block text-lg font-bold mb-1">Complaint</label>
    <textarea
      value={complaint}
      onChange={(e) => setComplaint(e.target.value)}
      placeholder="Describe your complaint..."
      rows="4"
      required
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Remarks */}
  <div className="mb-4">
    <label className="block text-lg font-bold mb-1">Remarks</label>
    <input
      type="text"
      value={remarks}
      onChange={(e) => setRemarks(e.target.value)}
      placeholder="Any additional remarks"
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Upload PDF */}
  <div className="mb-6">
    <label className="block text-lg font-bold mb-1">Upload PDF</label>
    <input
      type="file"
      accept="application/pdf"
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Submit Button */}
  <div className="flex justify-center">
    <button
      type="submit"
      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </div>
</form>

  );
};

export default GrievanceForm;
