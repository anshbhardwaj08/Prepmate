import { useEffect, useRef, useState } from "react";

const WebcamBox = () => {

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const [cameraOn, setCameraOn] = useState(true);
    const [micOn, setMicOn] = useState(true);
    const [recording, setRecording] = useState(true);

    useEffect(() => {
        startCamera();
        return () => stopStream();
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setCameraOn(true);
            setRecording(true);
        } catch (error) {
            console.log("Camera error:", error);
        }
    };

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
        }
    };

    const toggleCamera = () => {
        if (!streamRef.current) return;
        const videoTrack = streamRef.current.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            setCameraOn(videoTrack.enabled);
            setRecording(videoTrack.enabled);
        }
    };

    const toggleMic = () => {
        if (!streamRef.current) return;
        const audioTrack = streamRef.current.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setMicOn(audioTrack.enabled);
        }
    };

    return (
        <div className="flex flex-col gap-3">

            {/* Video Feed */}
            <div className="relative w-full overflow-hidden rounded-xl bg-slate-800 aspect-video">
                {cameraOn ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-xl"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center">
                            <div className="text-5xl mb-2">📷</div>
                            <p className="text-slate-400 text-sm">Camera is off</p>
                        </div>
                    </div>
                )}

                {/* Recording Badge */}
                {recording && (
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                        Live
                    </div>
                )}

                {/* Mic status badge */}
                <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur">
                    {micOn ? "🎙️ Mic On" : "🔇 Muted"}
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
                <button
                    onClick={toggleCamera}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                        cameraOn
                            ? "bg-slate-700 hover:bg-slate-600 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    {cameraOn ? "📷 Turn Off" : "📷 Turn On"}
                </button>

                <button
                    onClick={toggleMic}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                        micOn
                            ? "bg-slate-700 hover:bg-slate-600 text-white"
                            : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                >
                    {micOn ? "🎙️ Mute" : "🔇 Unmute"}
                </button>
            </div>

        </div>
    );
};

export default WebcamBox;