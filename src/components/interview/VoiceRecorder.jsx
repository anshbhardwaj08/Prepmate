import { useState, useEffect, useRef } from "react";

const VoiceRecorder = ({ onTranscript }) => {

    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [error, setError] = useState("");
    const [animFrame, setAnimFrame] = useState(0);
    const recognitionRef = useRef(null);
    const animRef = useRef(null);

    // Animate waveform bars while recording
    useEffect(() => {
        if (listening) {
            animRef.current = setInterval(() => {
                setAnimFrame((f) => f + 1);
            }, 120);
        } else {
            clearInterval(animRef.current);
        }
        return () => clearInterval(animRef.current);
    }, [listening]);

    const startListening = () => {
        setError("");

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError("Speech recognition not supported in this browser. Use Chrome.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let final = "";
            let interim = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const text = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += text + " ";
                } else {
                    interim += text;
                }
            }

            const combined = (transcript + final).trimStart();
            setTranscript(combined + interim);

            if (final) {
                const updated = (transcript + final).trimStart();
                setTranscript(updated);
                onTranscript(updated);
            }
        };

        recognition.onerror = (e) => {
            setError("Mic error: " + e.error);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setListening(true);
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setListening(false);
    };

    const clearTranscript = () => {
        setTranscript("");
        onTranscript("");
    };

    // Generate random-ish bar heights for waveform animation
    const bars = [3, 7, 5, 9, 4, 8, 6, 10, 5, 7, 3, 8, 6, 4, 9];

    return (
        <div className="flex flex-col gap-3">

            {/* Waveform / Status */}
            <div className="flex items-center justify-center rounded-xl bg-slate-800 py-4 min-h-[64px]">
                {listening ? (
                    <div className="flex items-end gap-[3px] h-10">
                        {bars.map((base, i) => {
                            const height = listening
                                ? Math.max(4, (base + ((animFrame + i) % 7)) * 3)
                                : 4;
                            return (
                                <div
                                    key={i}
                                    style={{ height: `${height}px` }}
                                    className="w-1 rounded-full bg-red-500 transition-all duration-100"
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <span className="text-xl">🎙️</span>
                        {transcript ? "Recording stopped" : "Press Start to speak"}
                    </div>
                )}
            </div>

            {/* Recording indicator */}
            {listening && (
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-red-400">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Recording...
                </div>
            )}

            {/* Start / Stop buttons */}
            <div className="flex gap-2">
                <button
                    onClick={startListening}
                    disabled={listening}
                    className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-40 transition"
                >
                    ▶ Start
                </button>
                <button
                    onClick={stopListening}
                    disabled={!listening}
                    className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40 transition"
                >
                    ■ Stop
                </button>
            </div>

            {/* Transcript preview */}
            {transcript && (
                <div className="relative rounded-xl border border-slate-700 bg-slate-800 p-3">
                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Transcript</p>
                    <p className="text-sm text-white leading-relaxed line-clamp-3">{transcript}</p>
                    <button
                        onClick={clearTranscript}
                        className="mt-2 text-xs text-red-400 hover:text-red-300"
                    >
                        Clear
                    </button>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-xs text-red-400 text-center">{error}</p>
            )}

        </div>
    );
};

export default VoiceRecorder;