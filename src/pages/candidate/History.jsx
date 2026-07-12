import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import databaseService from "../../appwrite/database";
import HistoryCard from "../../components/history/HistoryCard";

const SORT_OPTIONS = [
    { value: "latest",  label: "Newest first" },
    { value: "oldest",  label: "Oldest first" },
    { value: "highest", label: "Highest score" },
    { value: "lowest",  label: "Lowest score" },
];

const SCORE_OPTIONS = [
    { value: "all", label: "All scores" },
    { value: "90",  label: "90 + " },
    { value: "75",  label: "75 + " },
    { value: "60",  label: "60 + " },
];

const History = () => {
    const user = useSelector((state) => state.auth.userData);

    const [results,     setResults]     = useState([]);
    const [search,      setSearch]      = useState("");
    const [sort,        setSort]        = useState("latest");
    const [scoreFilter, setScoreFilter] = useState("all");
    const [loading,     setLoading]     = useState(true);

    useEffect(() => {
        if (!user) return;
        const load = async () => {
            try {
                const data = await databaseService.getUserResults(user.$id);
                setResults(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [user]);

    const filteredResults = useMemo(() => {
        return [...results]
            .filter((item) =>
                scoreFilter === "all" ? true : item.score >= Number(scoreFilter)
            )
            .filter((item) => {
                if (!search) return true;
                const q = search.toLowerCase();
                return (
                    item.category?.toLowerCase().includes(q) ||
                    new Date(item.$createdAt).toLocaleDateString().includes(q)
                );
            })
            .sort((a, b) => {
                if (sort === "latest")  return new Date(b.$createdAt) - new Date(a.$createdAt);
                if (sort === "oldest")  return new Date(a.$createdAt) - new Date(b.$createdAt);
                if (sort === "highest") return b.score - a.score;
                if (sort === "lowest")  return a.score - b.score;
                return 0;
            });
    }, [results, search, sort, scoreFilter]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this interview?")) return;
        try {
            await databaseService.deleteResult(id);
            setResults((prev) => prev.filter((item) => item.$id !== id));
            toast.success("Interview deleted");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        }
    };

    const avgScore = results.length
        ? Math.round(results.reduce((s, r) => s + (r.score ?? 0), 0) / results.length)
        : null;

    const best = results.length
        ? Math.max(...results.map((r) => r.score ?? 0))
        : null;

    // ── Loading ──────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080c14]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Loading history
                    </p>
                </div>
            </div>
        );
    }

    // ── Empty (no interviews at all) ─────────────────────────────
    if (results.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080c14]">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                        📋
                    </div>
                    <h2 className="text-2xl font-bold text-white">No interviews yet</h2>
                    <p className="text-slate-400">Complete your first interview to see results here.</p>
                </div>
            </div>
        );
    }

    // ── Main ─────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#080c14] text-white">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-950/20 to-transparent" />

            <div className="relative mx-auto max-w-5xl px-6 py-14">

                {/* Header */}
                <div className="mb-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Your progress
                    </p>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                Interview History
                            </h1>
                            <p className="mt-2 text-slate-400">
                                Track your performance across all sessions.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/40 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm shrink-0">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
                            {results.length} session{results.length !== 1 ? "s" : ""}
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-700/40 bg-slate-800/30 p-4 backdrop-blur-sm">
                        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Total</p>
                        <p className="mt-1 text-3xl font-bold text-white">{results.length}</p>
                        <p className="text-xs text-slate-500">interviews</p>
                    </div>
                    <div className="rounded-xl border border-slate-700/40 bg-slate-800/30 p-4 backdrop-blur-sm">
                        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Avg score</p>
                        <p className={`mt-1 text-3xl font-bold ${avgScore >= 75 ? "text-emerald-400" : avgScore >= 60 ? "text-amber-400" : "text-red-400"}`}>
                            {avgScore ?? "—"}
                        </p>
                        <p className="text-xs text-slate-500">out of 100</p>
                    </div>
                    <div className="col-span-2 rounded-xl border border-slate-700/40 bg-slate-800/30 p-4 backdrop-blur-sm sm:col-span-1">
                        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Best score</p>
                        <p className="mt-1 text-3xl font-bold text-blue-400">{best ?? "—"}</p>
                        <p className="text-xs text-slate-500">personal best</p>
                    </div>
                </div>

                {/* Search + filters */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row">

                    {/* Search */}
                    <div className="relative flex-1">
                        <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by category or date..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        />
                        {search && (
                            <button onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-slate-300 transition">
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 7h18M6 12h12M9 17h6" />
                        </svg>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="appearance-none rounded-xl border border-slate-700/60 bg-slate-800/50 py-3 pl-9 pr-8 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        >
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Score filter */}
                    <div className="relative">
                        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <select
                            value={scoreFilter}
                            onChange={(e) => setScoreFilter(e.target.value)}
                            className="appearance-none rounded-xl border border-slate-700/60 bg-slate-800/50 py-3 pl-9 pr-8 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        >
                            {SCORE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* No results from filter */}
                {filteredResults.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-800/20 px-6 py-24 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl">🔍</div>
                        <h2 className="text-xl font-bold text-white">No matches</h2>
                        <p className="mt-2 text-slate-400">Try adjusting your filters or search term.</p>
                        <button
                            onClick={() => { setSearch(""); setScoreFilter("all"); }}
                            className="mt-5 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2 text-sm text-slate-300 hover:bg-slate-700 transition"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4">
                            {filteredResults.map((result) => (
                                <HistoryCard
                                    key={result.$id}
                                    interview={result}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {(search || scoreFilter !== "all") && (
                            <p className="mt-6 text-center text-xs text-slate-600">
                                Showing {filteredResults.length} of {results.length} sessions
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default History;