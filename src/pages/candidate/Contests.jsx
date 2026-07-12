import { useEffect, useState, useMemo } from "react";
import contestService from "../../services/contestService";
import ContestCard from "../../components/contests/ContestCard";

const PLATFORMS = ["All", "Codeforces", "LeetCode", "CodeChef", "AtCoder", "HackerEarth", "HackerRank", "TopCoder", "GFG"];

const getPlatformLabel = (site = "") => {
    const map = {
        "codeforces.com": "Codeforces",
        "leetcode.com": "LeetCode",
        "codechef.com": "CodeChef",
        "atcoder.jp": "AtCoder",
        "hackerearth.com": "HackerEarth",
        "hackerrank.com": "HackerRank",
        "topcoder.com": "TopCoder",
        "geeksforgeeks.org": "GFG",
    };
    const key = Object.keys(map).find((k) => site.toLowerCase().includes(k));
    return key ? map[key] : null;
};

const Contests = () => {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [activePlatform, setActivePlatform] = useState("All");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await contestService.getContests();
                setContests(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load contests. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filtered = useMemo(() => {
        return contests.filter((c) => {
            const matchesPlatform =
                activePlatform === "All" ||
                getPlatformLabel(c.site) === activePlatform;
            const matchesSearch =
                search === "" ||
                c.name?.toLowerCase().includes(search.toLowerCase()) ||
                c.site?.toLowerCase().includes(search.toLowerCase());
            return matchesPlatform && matchesSearch;
        });
    }, [contests, activePlatform, search]);

    // Which platforms actually have contests in the data
    const activePlatforms = useMemo(() => {
        const found = new Set(contests.map((c) => getPlatformLabel(c.site)).filter(Boolean));
        return ["All", ...PLATFORMS.slice(1).filter((p) => found.has(p))];
    }, [contests]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080c14]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Fetching contests
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080c14]">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">⚠️</div>
                    <p className="text-white font-semibold">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm text-slate-300 hover:bg-slate-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080c14] text-white">
            {/* Top gradient wash */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-950/20 to-transparent" />

            <div className="relative mx-auto max-w-5xl px-6 py-14">

                {/* Header */}
                <div className="mb-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Live Feed
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                Coding Contests
                            </h1>
                            <p className="mt-2 text-slate-400">
                                Upcoming competitions across all major platforms.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/40 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm shrink-0">
                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            {contests.length} upcoming
                        </div>
                    </div>
                </div>

                {/* Search + filters */}
                <div className="mb-6 flex flex-col gap-4">

                    {/* Search */}
                    <div className="relative max-w-md">
                        <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search contests..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 backdrop-blur-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-slate-300 transition"
                            >✕</button>
                        )}
                    </div>

                    {/* Platform filter pills */}
                    <div className="flex flex-wrap gap-2">
                        {activePlatforms.map((p) => (
                            <button
                                key={p}
                                onClick={() => setActivePlatform(p)}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                                    activePlatform === p
                                        ? "border-blue-500/40 bg-blue-600/15 text-blue-400"
                                        : "border-slate-700/50 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-800/20 px-6 py-24 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl">🔍</div>
                        <h2 className="text-xl font-bold text-white">No contests found</h2>
                        <p className="mt-2 text-slate-400">
                            Try a different platform or clear the search.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setActivePlatform("All"); }}
                            className="mt-5 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2 text-sm text-slate-300 hover:bg-slate-700 transition"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {filtered.map((contest) => (
                                <ContestCard key={`${contest.name}-${contest.start_time}`} contest={contest} />
                            ))}
                        </div>
                        {search || activePlatform !== "All" ? (
                            <p className="mt-6 text-center text-xs text-slate-600">
                                Showing {filtered.length} of {contests.length} contests
                            </p>
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
};

export default Contests;