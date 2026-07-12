import { useNavigate } from "react-router-dom";

const scoreMeta = (score) => {
    if (score >= 90) return { label: "Outstanding", emoji: "🏆", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", bar: "bg-amber-400" };
    if (score >= 75) return { label: "Excellent",   emoji: "⭐", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", bar: "bg-emerald-400" };
    if (score >= 60) return { label: "Good",        emoji: "👍", color: "text-blue-400",    bg: "bg-blue-500/10 border-blue-500/20",       bar: "bg-blue-400" };
    return             { label: "Keep Practicing", emoji: "📚", color: "text-slate-400",   bg: "bg-slate-500/10 border-slate-500/20",     bar: "bg-slate-400" };
};

const HistoryCard = ({ interview, onDelete }) => {
    const navigate = useNavigate();
    const meta = scoreMeta(interview.score);

    const dateStr = new Date(interview.$createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
    const timeStr = new Date(interview.$createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit",
    });

    return (
        <div className="group relative overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/50 p-5 backdrop-blur-sm transition-all duration-200 hover:border-slate-700/60 hover:bg-slate-800/50 hover:shadow-xl hover:shadow-black/20">

            {/* Top row — title + score */}
            <div className="flex items-start justify-between gap-4">

                {/* Left */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${meta.bg} ${meta.color}`}>
                            {meta.emoji} {meta.label}
                        </span>
                    </div>
                    <h2 className="truncate text-lg font-semibold text-white leading-snug">
                        {interview.category || "AI Interview"}
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {dateStr} · {timeStr}
                    </p>
                </div>

                {/* Score */}
                <div className="shrink-0 text-right">
                    <p className={`text-4xl font-bold tabular-nums ${meta.color}`}>
                        {interview.score}
                        <span className="text-xl font-semibold">%</span>
                    </p>
                </div>
            </div>

            {/* Score bar */}
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${meta.bar}`}
                    style={{ width: `${Math.min(interview.score, 100)}%` }}
                />
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-slate-800/60" />

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(`/dashboard/results/${interview.$id}`)}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 active:scale-95"
                >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Report
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white active:scale-95"
                >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Take Another
                </button>

                <button
                    onClick={() => onDelete(interview.$id)}
                    className="group/del ml-auto flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-95"
                >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default HistoryCard;