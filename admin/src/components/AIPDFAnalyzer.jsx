import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const genAI = new GoogleGenerativeAI("AIzaSyCHK_9m7dwti-kYYWmr-ciR-Kp9_QTgvOc"); // Replace with your API key

export default function AIPDFAnalyzer() {
  const [pdfText, setPdfText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item) => item.str).join(" ") + " ";
      }
      setPdfText(text);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = await model.generateContent({ prompt: `${pdfText}\n\nQuestion: ${question}` });
      setAnswer(response.candidates[0].content);
    } catch (error) {
      console.error("Error generating response:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 max-w-3xl mx-auto">
      <div className="w-full p-4 border rounded-md shadow">
        <h2 className="text-xl font-semibold">AI PDF Analyzer</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="mt-4 border p-2 rounded-md w-full"
        />
      </div>
      {pdfText && (
        <div className="w-full p-4 border rounded-md shadow">
          <h3 className="text-lg font-medium">Ask a Question</h3>
          <div className="flex mt-2 space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 p-2 border rounded-md"
            />
            <button onClick={handleQuestionSubmit} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-md">
              {loading ? "Thinking..." : <FaPaperPlane />}
            </button>
          </div>
        </div>
      )}
      {answer && (
        <div className="w-full p-4 border rounded-md shadow">
          <h3 className="text-lg font-medium">Answer</h3>
          <div className="mt-2 p-3 border rounded-md bg-gray-100">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}
