import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/database";

const GUIDELINES = [
    {
        id: "environment",
        icon: "🔇",
        title: "Quiet environment",
        desc: "Make sure you're in a quiet place with no distractions or background noise.",
    },
    {
        id: "camera",
        icon: "📷",
        title: "Camera & microphone ready",
        desc: "Allow browser access to your webcam and microphone before starting.",
    },
    {
        id: "time",
        icon: "⏱️",
        title: "You have 30 minutes",
        desc: "The interview is timed. Once started, the timer cannot be paused.",
    },
    {
        id: "tabs",
        icon: "🚫",
        title: "No switching tabs",
        desc: "Stay on this tab throughout the interview. Leaving may affect your result.",
    },
    {
        id: "honest",
        icon: "🧠",
        title: "Answer honestly",
        desc: "Your responses are evaluated by AI. Answer in your own words for best results.",
    },
    {
        id: "submit",
        icon: "✅",
        title: "Submit before time runs out",
        desc: "The interview auto-submits when the timer ends, even if questions are unanswered.",
    },
];

const InterviewGuidelines = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");
    const [questionCount, setQuestionCount] = useState(0);
    const [checked, setChecked] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [categories, questions] = await Promise.all([
                    databaseService.getCategories(),
                    databaseService.getQuestionsByCategory(categoryId),
                ]);
                const found = categories.find((c) => c.$id === categoryId);
                if (found) setCategoryName(found.name);
                setQuestionCount(questions.length);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [categoryId]);

    const toggleCheck = (id) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const allChecked = GUIDELINES.every((g) => checked[g.id]);
    const checkedCount = GUIDELINES.filter((g) => checked[g.id]).length;

    const handleStart = () => {
        navigate(`/dashboard/interview/${categoryId}`);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Top gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-950/30 to-transparent" />

            <div className="relative mx-auto max-w-2xl px-6 py-14">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                    <span>←</span> Back to categories
                </button>

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-3xl ring-1 ring-blue-500/30">
                        🎯
                    </div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
                        Ready to begin?
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {categoryName} Interview
                    </h1>
                    <p className="mt-3 text-slate-400">
                        Review the guidelines below before you start.
                    </p>

                    {/* Meta pills */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-1.5 text-xs font-medium text-slate-300">
                            📋 {questionCount} questions
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-1.5 text-xs font-medium text-slate-300">
                            ⏱️ 30 minutes
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-1.5 text-xs font-medium text-slate-300">
                            🤖 AI evaluated
                        </span>
                    </div>
                </div>

                {/* Guidelines checklist */}
                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                    {/* Card header */}
                    <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                        <div>
                            <h2 className="font-semibold text-white">Before you start</h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Check all boxes to enable the start button
                            </p>
                        </div>
                        {/* Progress pill */}
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                            allChecked
                                ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
                                : "bg-slate-800 text-slate-400"
                        }`}>
                            {checkedCount}/{GUIDELINES.length}
                        </span>
                    </div>

                    {/* Checkboxes */}
                    <div className="divide-y divide-slate-800/60">
                        {GUIDELINES.map((g) => (
                            <label
                                key={g.id}
                                className={`flex cursor-pointer items-start gap-4 px-6 py-4 transition-colors ${
                                    checked[g.id]
                                        ? "bg-emerald-500/5"
                                        : "hover:bg-slate-800/40"
                                }`}
                            >
                                {/* Custom checkbox */}
                                <div className="mt-0.5 shrink-0">
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={!!checked[g.id]}
                                        onChange={() => toggleCheck(g.id)}
                                    />
                                    <div className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
                                        checked[g.id]
                                            ? "border-emerald-500 bg-emerald-500"
                                            : "border-slate-600 bg-slate-800"
                                    }`}>
                                        {checked[g.id] && (
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Icon */}
                                <span className="mt-0.5 shrink-0 text-lg">{g.icon}</span>

                                {/* Text */}
                                <div className="flex-1">
                                    <p className={`text-sm font-medium transition-colors ${
                                        checked[g.id] ? "text-emerald-300" : "text-white"
                                    }`}>
                                        {g.title}
                                    </p>
                                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                                        {g.desc}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="px-6 py-4 border-t border-slate-800">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                            <div
                                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                style={{ width: `${(checkedCount / GUIDELINES.length) * 100}%` }}
                            />
                        </div>
                    </div>

                </div>

                {/* Start button */}
                <button
                    onClick={handleStart}
                    disabled={!allChecked}
                    className={`w-full rounded-xl py-4 text-base font-bold transition-all duration-300 ${
                        allChecked
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-900/60 hover:-translate-y-0.5"
                            : "cursor-not-allowed bg-slate-800 text-slate-500"
                    }`}
                >
                    {allChecked ? "🚀 Start Interview" : `Check all ${GUIDELINES.length} boxes to continue`}
                </button>

                {/* Disclaimer */}
                <p className="mt-4 text-center text-xs text-slate-600">
                    By starting, you agree to complete the interview honestly and independently.
                </p>

            </div>
        </div>
    );
};

export default InterviewGuidelines;