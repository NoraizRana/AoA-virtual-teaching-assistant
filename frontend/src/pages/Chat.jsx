// frontend/src/pages/Chat.jsx
import React, { useState, useRef, useEffect } from "react";
import VoiceChat from "../components/VoiceChat";
import { sendMessageToServer } from "../services/chatService";

export default function Chat() {
  const [messages, setMessages] = useState([]); // {role: 'user'|'assistant', text}
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // scroll down when messages change
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSendText(text) {
    if (!text || !text.trim()) return;
    // show user message
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const reply = await sendMessageToServer(text);
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
      speakText(reply);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  function speakText(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    // choose first English voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) u.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
    window.speechSynthesis.speak(u);
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded p-4">
      <div className="text-xl font-semibold mb-3">AoA Virtual Teaching Assistant</div>

      <div ref={containerRef} className="h-80 overflow-auto space-y-3 mb-4 p-2 border rounded">
        {messages.length === 0 && <div className="text-gray-500">Start by asking a question — use the mic or type.</div>}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={`inline-block p-2 rounded ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <VoiceChat onSendText={handleSendText} />
      <div className="mt-3 flex gap-2">
  <input id="chatInput" type="text" placeholder="Type a question..." className="flex-1 p-2 border rounded" />
  <button onClick={() => {
    const v = document.getElementById("chatInput").value;
    document.getElementById("chatInput").value = "";
    handleSendText(v);
  }} className="bg-blue-600 text-white px-3 py-2 rounded">Send</button>
</div>



      <div className="mt-3">
        {loading ? <div className="text-sm text-gray-500">AI is typing…</div> : null}
      </div>
    </div>
  );
}
