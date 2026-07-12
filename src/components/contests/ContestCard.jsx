import { formatDistanceToNow, format, isPast } from "date-fns";

// Map site names to short platform labels + accent colors
const platformMeta = {
    "codeforces.com": { label: "Codeforces", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    "leetcode.com": { label: "LeetCode", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
    "codechef.com": { label: "CodeChef", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
    "atcoder.jp": { label: "AtCoder", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    "hackerearth.com": { label: "HackerEarth", color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
    "hackerrank.com": { label: "HackerRank", color: "text-green-400 bg-green-500/10 border-green-500/20" },
    "topcoder.com": { label: "TopCoder", color: "text-red-400 bg-red-500/10 border-red-500/20" },
    "geeksforgeeks.org": { label: "GFG", color: "text-lime-400 bg-lime-500/10 border-lime-500/20" },
};

const getPlatform = (site = "") => {
    const key = Object.keys(platformMeta).find((k) => site.toLowerCase().includes(k));
    return key
        ? platformMeta[key]
        : { label: site || "Unknown", color: "text-slate-400 bg-slate-500/10 border-slate-500/20" };
};

const formatDuration = (start, end) => {
    try {
        const ms = new Date(end) - new Date(start);
        if (isNaN(ms) || ms <= 0) return null;
        const totalMins = Math.round(ms / 60000);
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        if (h === 0) return `${m}m`;
        if (m === 0) return `${h}h`;
        return `${h}h ${m}m`;
    } catch {
        return null;
    }
};

const ContestCard = ({ contest }) => {
    const platform = getPlatform(contest.site);
    const startDate = new Date(contest.start_time);
    const isValid = !isNaN(startDate.getTime());
    const duration = formatDuration(contest.start_time, contest.end_time);

    const startsIn = isValid
        ? formatDistanceToNow(startDate, { addSuffix: true })
        : "Unknown";

    const formattedDate = isValid
        ? format(startDate, "MMM d, yyyy · h:mm a")
        : null;

    return (
        <div className="group relative overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/50 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700/60 hover:bg-slate-800/50 hover:shadow-xl hover:shadow-black/30">

            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h2 className="truncate text-base font-semibold text-white leading-snug">
                        {contest.name}
                    </h2>
                    {formattedDate && (
                        <p className="mt-1 text-xs text-slate-500">{formattedDate}</p>
                    )}
                </div>

                {/* Platform badge */}
                <span className={`shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium ${platform.color}`}>
                    {platform.label}
                </span>
            </div>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-3">

                {/* Starts in */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                    </svg>
                    <span className="text-emerald-400 font-medium">Starts {startsIn}</span>
                </div>

                {/* Duration */}
                {duration && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {duration}
                    </div>
                )}

                {/* Status badge if within 24h */}
                {isValid && startDate - new Date() < 86400000 && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                        Soon
                    </span>
                )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
                <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-600 hover:text-slate-400 transition-colors truncate max-w-[60%]"
                >
                    {contest.url?.replace(/^https?:\/\//, "").slice(0, 50)}
                </a>

                <button
                    onClick={() => window.open(contest.url, "_blank")}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-500 active:scale-95"
                >
                    Register
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ContestCard;