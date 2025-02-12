import { useState, useRef } from "react";
import axios from "axios";
import { Mic, MicOff } from "lucide-react";
import DOMPurify from "dompurify";


const ASSEMBLYAI_API_KEY = import.meta.env.VITE_ASSEMBLY_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


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
      // Upload the audio file to AssemblyAI
      const uploadResponse = await fetch("https://api.assemblyai.com/v2/upload", {
        method: "POST",
        headers: {
          Authorization: ASSEMBLYAI_API_KEY,
        },
        body: audioBlob,
      });

      const uploadData = await uploadResponse.json();
      const audioUrl = uploadData.upload_url;

      // Request Transcription
      const transcriptResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ASSEMBLYAI_API_KEY,
        },
        body: JSON.stringify({
          audio_url: audioUrl,
          language_code: "hi", // Hindi Speech-to-Text
        }),
      });

      const transcriptData = await transcriptResponse.json();
      const transcriptId = transcriptData.id;

      // Polling to check if transcription is completed
      let transcriptText = "";
      while (!transcriptText) {
        const checkResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          headers: { Authorization: ASSEMBLYAI_API_KEY },
        });

        const checkData = await checkResponse.json();
        if (checkData.status === "completed") {
          transcriptText = checkData.text;
          setQuestion((prev) => prev + " " + transcriptText);
        } else if (checkData.status === "failed") {
          console.error("Transcription failed.");
          setQuestion("Transcription failed. Try again.");
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Poll every 3 seconds
      }
    } catch (error) {
      console.error("AssemblyAI error:", error);
      setQuestion("Speech recognition error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  async function fetchGrievanceResponse() {
    setAnswer("");
    setLoading(true);
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Classify and provide a response on how a citizen can file a government grievance in India for the following issue: ${question}`,
                },
              ],
            },
          ],
        },
      });
      setAnswer(formatResponse(response.data.candidates[0].content.parts[0].text));
    } catch (error) {
      setAnswer("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
