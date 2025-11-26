import React, { useEffect, useRef, useState } from "react";

export default function VoiceChat({ onSendText }) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      recognitionRef.current = null;
      return;
    }
    const r = new SpeechRecognition();
    r.lang = "en-US";
    r.interimResults = true;
    r.onresult = (ev) => {
      let final = "";
      let interimText = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const res = ev.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interimText += res[0].transcript;
      }
      if (final) {
        setInterim("");
        setListening(false);
        onSendText(final.trim());
      } else {
        setInterim(interimText);
      }
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    recognitionRef.current = r;
    return () => recognitionRef.current?.stop();
  }, [onSendText]);

  function toggle() {
    const r = recognitionRef.current;
    if (!r) {
      alert("SpeechRecognition not supported in this browser");
      return;
    }
    if (listening) {
      r.stop();
      setListening(false);
      return;
    }
    try {
      r.start();
      setInterim("");
      setListening(true);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={toggle}
        className={`px-3 py-2 rounded ${listening ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
      >
        {listening ? "Stop Mic" : "Start Mic"}
      </button>
      <div className="text-sm text-gray-600">{listening ? `Listening… ${interim}` : "Tap mic and speak"}</div>
    </div>
  );
}
