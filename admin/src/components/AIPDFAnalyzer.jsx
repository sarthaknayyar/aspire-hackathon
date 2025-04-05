import React, { useState } from "react";


const AIAnalyzer = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = "http://127.0.0.1:8001";  // Update this if deployed

    /** 📌 Handle PDF Upload */
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setPdfFile(event.target.files[0]);
        }
    };

    /** 📌 Initialize LLM with PDF */
    const initializeLLM = async () => { 
        if (!pdfFile) {
            alert("Please upload a PDF first!");
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("pdf_files", pdfFile);

            const response = await fetch(`${API_BASE_URL}/init_rag`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Initialization Response:", result);

            if (response.ok) {
                setIsInitialized(true);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Initialization Error:", error);
            alert("Failed to initialize AI. Please check the backend.");
        } finally {
            setLoading(false);
        }
    };

    /** 📌 Ask a Question */
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

  try {
      const response = await fetch(`${API_BASE_URL}/ask_question`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json", // ✅ Ensure JSON is sent
          },
          body: JSON.stringify({ query: question }), // ✅ Send a proper JSON object
      });

      const result = await response.json();
      console.log("AI Response:", result);

      if (response.ok) {
          setAnswer(result.answer);
      } else {
          alert(result.detail || "Error processing request");
      }
  } catch (error) {
      console.error("Question Error:", error);
      alert("Failed to get an answer. Please try again.");
  } finally {
      setLoading(false);
  }
};


    return (
        <div style={{ maxWidth: "650px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ textAlign: "center" }}>AI PDF Analyzer</h2>

            {/* 📌 File Upload */}
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: "block", width: "100%", marginBottom: "10px", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
            />

            {/* 📌 Initialize Button */}
            <button
                onClick={initializeLLM}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: isInitialized ? "gray" : "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: isInitialized ? "not-allowed" : "pointer",
                    marginBottom: "10px"
                }}
                disabled={isInitialized || loading}
            >
                {isInitialized ? "Initialized ✅" : "Initialize AI"}
            </button>

            {/* 📌 Question Input */}
            <textarea
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px", marginBottom: "10px", minHeight: "50px" }}
            />

            {/* 📌 Ask Question Button */}
            <button
                onClick={askQuestion}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#28A745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: loading ? "not-allowed" : "pointer",
                    marginBottom: "10px"
                }}
                disabled={loading || !isInitialized}
            >
                {loading ? "Processing..." : "Ask Question"}
            </button>

            {/* 📌 Answer Box */}
            {answer && (
                <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#F8F9FA", marginTop: "10px" }}>
                    <strong>Answer:</strong> <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default AIAnalyzer;
