import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/database";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaCheckCircle, FaTimesCircle, FaComments, FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import generateReport from "../../utils/generateReport";

const Results = () => {

    const { resultId } = useParams();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const user = useSelector(state => state.auth.userData);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const loadResult = async () => {
            try {
                const data = await databaseService.getResult(resultId);
                setResult(data);
            } catch (error) {
                console.log(error);
            }
        };
        loadResult();
    }, [resultId]);

    if (!result) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white text-2xl">
                Loading Result...
            </div>
        );
    }

    // ── Parse suggestions safely (handles string, object array, or pipe-separated strings) ──
    const parseSuggestions = () => {
        try {
            if (!result.suggestions) return [];

            // If it's a JSON string → parse it
            if (typeof result.suggestions === "string") {
                const parsed = JSON.parse(result.suggestions);
                return Array.isArray(parsed) ? parsed : [];
            }

            // If it's already an array
            if (Array.isArray(result.suggestions)) {
                return result.suggestions;
            }

            return [];
        } catch {
            // If JSON.parse fails, it might be an array of pipe-separated strings
            if (Array.isArray(result.suggestions)) {
                return result.suggestions;
            }
            return [];
        }
    };

    const suggestions = parseSuggestions();

    const badge =
        result.score >= 90 ? { label: "Outstanding", emoji: "🏆", color: "bg-yellow-500" }
        : result.score >= 75 ? { label: "Excellent", emoji: "⭐", color: "bg-blue-500" }
        : result.score >= 60 ? { label: "Good", emoji: "👍", color: "bg-green-600" }
        : { label: "Needs Improvement", emoji: "📚", color: "bg-orange-500" };

    const scoreColor =
        result.score >= 75 ? "#10b981"
        : result.score >= 60 ? "#f59e0b"
        : "#ef4444";

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={result.score >= 60 ? 250 : 80}
            />

            {/* ── Hero Banner ── */}
            <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-12 text-center">
                <div className="absolute -top-10 left-1/4 h-40 w-40 rounded-full bg-blue-700 opacity-10 blur-3xl" />
                <div className="absolute -bottom-10 right-1/4 h-40 w-40 rounded-full bg-indigo-700 opacity-10 blur-3xl" />

                <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                    Interview Complete
                </p>
                <h1 className="mt-2 text-5xl font-bold">
                    🎉 Well Done!
                </h1>
                <p className="mt-3 text-slate-400">
                    {result.category ? `${result.category} Interview` : "AI Interview"} · AI Evaluation Report
                </p>
            </div>

            <div className="mx-auto max-w-5xl px-6 pb-16 pt-10">

                {/* ── Score + Badge ── */}
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                        Overall Score
                    </p>

                    <div className="mx-auto mt-6 h-60 w-60">
                        <CircularProgressbar
                            value={result.score}
                            text={`${result.score}%`}
                            styles={buildStyles({
                                textColor: "#fff",
                                textSize: "18px",
                                pathColor: scoreColor,
                                trailColor: "#1e293b",
                                pathTransitionDuration: 1.2,
                            })}
                        />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <span className={`rounded-full ${badge.color} px-6 py-2 text-base font-bold shadow-lg`}>
                            {badge.emoji} {badge.label}
                        </span>
                    </div>

                </div>

                {/* ── Metric Cards ── */}
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                    <MetricCard title="Communication" score={result.communication} color="bg-blue-500" glow="shadow-blue-900/30" />
                    <MetricCard title="Technical Knowledge" score={result.technicalKnowledge} color="bg-green-500" glow="shadow-green-900/30" />
                    <MetricCard title="Problem Solving" score={result.problemSolving} color="bg-purple-500" glow="shadow-purple-900/30" />
                </div>

                {/* ── Strengths ── */}
                <div className="mt-6 rounded-2xl border border-green-900/30 bg-slate-900 p-8">

                    <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-green-400">
                        <FaCheckCircle /> Strengths
                    </h2>

                    <div className="space-y-3">
                        {result.strengths?.split("\n").filter(Boolean).map((item, index) => (
                            <div key={index} className="flex items-start gap-3 rounded-xl bg-green-500/5 border border-green-500/10 p-3">
                                <FaCheckCircle className="mt-0.5 shrink-0 text-green-500" />
                                <p className="text-slate-300 leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* ── Weaknesses ── */}
                <div className="mt-6 rounded-2xl border border-red-900/30 bg-slate-900 p-8">

                    <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-red-400">
                        <FaTimesCircle /> Areas to Improve
                    </h2>

                    <div className="space-y-3">
                        {result.weaknesses?.split("\n").filter(Boolean).map((item, index) => (
                            <div key={index} className="flex items-start gap-3 rounded-xl bg-red-500/5 border border-red-500/10 p-3">
                                <FaTimesCircle className="mt-0.5 shrink-0 text-red-500" />
                                <p className="text-slate-300 leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* ── AI Feedback ── */}
                <div className="mt-6 rounded-2xl border border-blue-900/30 bg-slate-900 p-8">

                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">
                            <FaComments className="text-blue-400 text-lg" />
                        </div>
                        <h2 className="text-xl font-bold">AI Feedback</h2>
                    </div>

                    <p className="leading-8 text-slate-300">
                        {result.feedback}
                    </p>

                </div>

                {/* ── Recommended Next Steps ── */}
                <div className="mt-6 rounded-2xl border border-yellow-900/30 bg-slate-900 p-8">

                    <h2 className="mb-5 text-xl font-bold text-yellow-400">
                        🚀 Recommended Next Steps
                    </h2>

                    {suggestions.length === 0 ? (
                        <p className="text-slate-400 text-sm">No suggestions available.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {suggestions.map((item, index) => {

                                // Handle all formats: object {title,link}, pipe string "title|link", plain string
                                let title, link;

                                if (typeof item === "object" && item !== null) {
                                    title = item.title || "Resource";
                                    link  = item.link  || "#";
                                } else if (typeof item === "string" && item.includes("|")) {
                                    const parts = item.split("|");
                                    title = parts[0]?.trim() || item;
                                    link  = parts[1]?.trim() || "#";
                                } else {
                                    title = String(item);
                                    link  = "#";
                                }

                                return (
                                    <a
                                        key={index}
                                        href={link !== "#" ? link : undefined}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-yellow-600/40 hover:bg-slate-750 transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-xs font-bold text-yellow-400">
                                                {index + 1}
                                            </span>
                                            <h3 className="font-semibold text-white">{title}</h3>
                                        </div>
                                        {link !== "#" && (
                                            <span className="shrink-0 text-xs text-blue-400">
                                                Visit →
                                            </span>
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    )}

                </div>

                {/* ── Action Buttons ── */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">

                    <button
                        onClick={() => generateReport(result, user)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-base font-bold hover:bg-green-500 transition shadow-lg shadow-green-900/30"
                    >
                        📄 Download PDF Report
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/30"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </button>

                </div>

            </div>

        </div>
    );

};

const MetricCard = ({ title, score, color, glow }) => {

    const scoreLabel =
        score >= 80 ? "Excellent" :
        score >= 60 ? "Good" :
        "Needs Work";

    return (
        <div className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg ${glow}`}>

            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
                {title}
            </h3>

            <p className="mt-3 text-center text-4xl font-black text-white">
                {score}
                <span className="text-base font-normal text-slate-400">/100</span>
            </p>

            <p className="mt-1 text-center text-xs text-slate-500">{scoreLabel}</p>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div
                    className={`h-full rounded-full ${color} transition-all duration-1000`}
                    style={{ width: `${score}%` }}
                />
            </div>

        </div>
    );

};

export default Results;