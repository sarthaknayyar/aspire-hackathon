import React, { useState } from "react";

const API_BASE_URL ="https://aspire-hackathon.onrender.com";

const AIAnalyzer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setPdfFile(event.target.files[0]);
    }
  };

  const initializeLLM = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF first!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("pdf_files", pdfFile);
      console.log("Initializing with file:", pdfFile.name);

      const resp = await fetch(`https://aspire-hackathon.onrender.com/init_rag`, {
        method: "POST",
        body: formData,
      });
      const data = await resp.json();
      if (resp.ok) {
        setIsInitialized(true);
        alert(`Initialized and indexed ${data.inserted} chunks`);
      } else {
        alert(data.error || "Initialization failed");
      }
    } catch (err) {
      console.error("Init error:", err);
      alert("Initialization failed");
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!isInitialized) {
      alert("Initialize the AI first!");
      return;
    }
    if (!question.trim()) {
      alert("Enter a question!");
      return;
    }
    setLoading(true);
    setAnswer("");
    try {
      const resp = await fetch(`${API_BASE_URL}/ask_question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setAnswer(data.answer || "No answer returned");
      } else {
        alert(data.error || "Failed to get answer");
      }
    } catch (err) {
      console.error("Ask error:", err);
      alert("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20,  background: "#f6f3f4",  border: "1px solid #000", borderRadius: 4 }}>
      <h2 style={{ textAlign: "center" }}>AI PDF Analyzer</h2>

      <input 
  type="file" 
  accept="application/pdf" 
  onChange={handleFileChange} 
  className="w-full mb-2 file:border file:border-black file:px-4 file:py-2 file:rounded file:bg-gray-100 file:cursor-pointer hover:file:bg-gray-200"
/>

      <button
        onClick={initializeLLM}
        disabled={isInitialized || loading}
        style={{ width: "100%", padding: 10, backgroundColor: isInitialized ? "gray" : "#007BFF", color: "#fff", border: "none", borderRadius: 6, marginBottom: 10 }}
      >
        {isInitialized ? "Initialized ✅" : "Initialize AI"}
      </button>

      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question..." style={{ width: "100%", minHeight: 80, marginBottom: 10, border: "1px solid #000", padding: 3}} />

      <button onClick={askQuestion} disabled={loading || !isInitialized} style={{ width: "100%", padding: 10, backgroundColor: "#28A745", color: "#fff", border: "none", borderRadius: 6 }}>
        {loading ? "Processing..." : "Ask Question"}
      </button>

      {answer && (
        <div style={{ marginTop: 12, padding: 10, background: "#F8F9FA", borderRadius: 6 }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AIAnalyzer;