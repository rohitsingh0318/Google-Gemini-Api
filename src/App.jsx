import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import "./App.css";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "<b style='color:blue;'>Hii , I am Rohit Singh AI Assistence. How can I help you? </b>" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // User message add karo
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash", 
        contents: `Please answer the following question in a clear, systematic, step-by-step format with numbered points or bullet points:\n\n${input}`,
      });

      
      const botReply = (response.text || " No response received.")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") 
        .replace(/\n/g, "<br/>"); 

      setMessages([...newMessages, { role: "assistant", text: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", text: " Error: Could not fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="chat-title">🤖 GPT Chatbot 🤖</h1>

      <div className="main-chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            <span
              className="block"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            ></span>
          </div>
        ))}
        {loading && <p className="text-gray-500">Typing...</p>}

        <div className="input-box">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
