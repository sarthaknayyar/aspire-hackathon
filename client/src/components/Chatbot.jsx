import { useState, useRef } from "react";
import axios from "axios";
import { Mic, MicOff } from "lucide-react";
import DOMPurify from "dompurify";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://aspire-hackathon.onrender.com";


const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start and Stop Recording with Toggle Button
  const handleVoiceInput = async () => {
    if (!isRecording) {
      // Start Recording
      audioChunksRef.current = [];
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
      });
    } else {
      // Stop Recording and Process Audio
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await sendAudioToAssemblyAI(audioBlob);
      };
    }
  };

  // Send Audio to AssemblyAI for Speech-to-Text
  const sendAudioToAssemblyAI = async (audioBlob) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
  
      const response = await axios.post("https://aspire-hackathon.onrender.com/api/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const transcriptText = response.data.text;
      if (transcriptText) {
        setQuestion((prev) => prev + " " + transcriptText);
      } else {
        setQuestion("Transcription failed. Try again.");
      }
    } catch (error) {
      console.error("AssemblyAI proxy error:", error);
      setQuestion("Speech recognition error. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const fetchGrievanceResponse = async () => {
    if (!question || question.trim().length === 0) {
      setAnswer("Please describe your issue first (type or record).");
      return;
    }

    setAnswer("");
    setLoading(true);
    try {
      const prompt = `Classify and provide a response on how a citizen can file a government grievance in India for the following issue: ${question.trim()}`;

      const resp = await axios.post(
        `${API_BASE}/api/gemini/generate`,
        { prompt },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 60000,
        }
      );

      // Gemini returns various shapes; extract the best available text safely
      let text =
        resp?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        resp?.data?.output?.[0]?.content?.text ||
        resp?.data?.candidates?.[0]?.content?.[0]?.text ||
        null;

      if (!text) {
        // If the response shape is different, try a generous fallback
        const asString = JSON.stringify(resp.data).slice(0, 5000);
        console.warn("Unexpected Gemini response shape:", resp.data);
        text = `No readable text returned by model. Raw output (truncated): ${asString}`;
      }

      setAnswer(formatResponse(text));
    } catch (err) {
      console.error("Gemini proxy error:", err?.response?.data || err.message || err);
      const msg = err?.response?.data?.error?.details || err?.response?.data?.error || err?.message || "Request failed";
      setAnswer(`An error occurred: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  // Convert Markdown-style response to proper HTML
  const formatResponse = (text) => {
    return DOMPurify.sanitize(
      text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
        .replace(/\*(.*?)\*/g, "<em>$1</em>") // Convert *italic* to <em>
        .replace(/- (.*?)\n/g, "<li>$1</li>") // Convert "- " to <li> (for lists)
        .replace(/\n/g, "<br>") // Preserve line breaks
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-250 border-5">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          Government Grievance Chatbot
        </h1>
        <div className="flex items-center border border-gray-300 rounded-lg p-10">
          {/* Mic Button (Toggle Recording) */}
          <button
            onClick={handleVoiceInput}
            className={`mr-5 text-gray-600 transition duration-300 p-5 border rounded-2xl ${
              isRecording ? "text-red-500 animate-pulse" : "hover:text-blue-500"
            }`}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <textarea
            className="w-full p-2 border-none outline-none resize-none text-2xl mt-12"
            placeholder="Describe your issue (e.g., passport delay, electricity problem, etc.)"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
          ></textarea>
        </div>
        <button
          className="w-full h-15 mt-4 bg-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex justify-center items-center"
          onClick={fetchGrievanceResponse}
          disabled={loading}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "Get Help"
          )}
        </button>

        {/* Stylized Response Section */}
        <div className="mt-4 bg-gray-50 border border-gray-300 p-4 rounded-lg text-gray-800">
          {answer ? (
            <div
              className="whitespace-pre-wrap text-sm leading-6"
              dangerouslySetInnerHTML={{ __html: answer }} // Properly renders formatted text
            />
          ) : (
            <p className="text-gray-500">Your response will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
