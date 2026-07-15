import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/database";

const categoryColors = [
    {
        glow: "hover:shadow-blue-500/20",
        accent: "from-blue-500/10 to-blue-600/5",
        border: "hover:border-blue-500/40",
        icon: "bg-blue-500/15 text-blue-400",
        badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        btn: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
        dot: "bg-blue-400",
    },
    {
        glow: "hover:shadow-violet-500/20",
        accent: "from-violet-500/10 to-violet-600/5",
        border: "hover:border-violet-500/40",
        icon: "bg-violet-500/15 text-violet-400",
        badge: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
        btn: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/25",
        dot: "bg-violet-400",
    },
    {
        glow: "hover:shadow-emerald-500/20",
        accent: "from-emerald-500/10 to-emerald-600/5",
        border: "hover:border-emerald-500/40",
        icon: "bg-emerald-500/15 text-emerald-400",
        badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        btn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
        dot: "bg-emerald-400",
    },
    {
        glow: "hover:shadow-amber-500/20",
        accent: "from-amber-500/10 to-amber-600/5",
        border: "hover:border-amber-500/40",
        icon: "bg-amber-500/15 text-amber-400",
        badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        btn: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/25",
        dot: "bg-amber-400",
    },
    {
        glow: "hover:shadow-rose-500/20",
        accent: "from-rose-500/10 to-rose-600/5",
        border: "hover:border-rose-500/40",
        icon: "bg-rose-500/15 text-rose-400",
        badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
        btn: "bg-rose-600 hover:bg-rose-500 shadow-rose-500/25",
        dot: "bg-rose-400",
    },
    {
        glow: "hover:shadow-cyan-500/20",
        accent: "from-cyan-500/10 to-cyan-600/5",
        border: "hover:border-cyan-500/40",
        icon: "bg-cyan-500/15 text-cyan-400",
        badge: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
        btn: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/25",
        dot: "bg-cyan-400",
    },
];

const categoryInitials = (name) => {
    if (!name) return "?";
    return name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
};

const CandidateCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await databaseService.getCategories();
                setCategories(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const filtered = categories.filter(
        (c) =>
            c.name?.toLowerCase().includes(search.toLowerCase()) ||
            c.description?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#080c14]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
                    <p className="text-sm text-slate-500 tracking-widest uppercase">
                        Loading categories
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080c14] text-white">
            {/* Subtle top gradient wash */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-950/30 to-transparent" />

            <div className="relative mx-auto max-w-7xl px-6 py-14">

                {/* Header */}
                <div className="mb-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Practice Portal
                    </p>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                Interview Categories
                            </h1>
                            <p className="mt-2 text-slate-400">
                                Pick a domain and start practicing with AI-powered mock interviews.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/40 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm">
                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            {categories.length} available
                        </div>
                    </div>
                </div>

                {/* Search bar */}
                <div className="relative mb-8 max-w-md">
                    <svg
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-700/60 bg-slate-800/50 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 backdrop-blur-sm outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-300 transition"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Empty: no categories at all */}
                {categories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-800/20 px-6 py-24 text-center backdrop-blur-sm">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                            📂
                        </div>
                        <h2 className="text-2xl font-bold text-white">No categories yet</h2>
                        <p className="mt-2 max-w-sm text-slate-400">
                            Ask your admin to create interview categories to get started.
                        </p>
                    </div>
                ) : filtered.length === 0 ? (
                    /* Empty: search returned nothing */
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-800/20 px-6 py-24 text-center backdrop-blur-sm">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                            🔍
                        </div>
                        <h2 className="text-2xl font-bold text-white">No results</h2>
                        <p className="mt-2 text-slate-400">
                            No categories match{" "}
                            <span className="text-white">"{search}"</span>. Try a different keyword.
                        </p>
                        <button
                            onClick={() => setSearch("")}
                            className="mt-5 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2 text-sm text-slate-300 hover:bg-slate-700 transition"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    /* Grid */
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((category, index) => {
                            const c = categoryColors[index % categoryColors.length];
                            return (
                                <div
                                    key={category.$id}
                                    className={`group relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br ${c.accent} bg-slate-800/30 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${c.glow} ${c.border}`}
                                >
                                    {/* Subtle corner glow */}
                                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-current opacity-[0.04] blur-2xl" />

                                    {/* Top row */}
                                    <div className="mb-5 flex items-start justify-between">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold tracking-tight ${c.icon}`}
                                        >
                                            {categoryInitials(category.name)}
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${c.badge}`}>
                                            Interview
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h2 className="text-xl font-bold leading-snug text-white">
                                        {category.name}
                                    </h2>
                                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                                        {category.description}
                                    </p>

                                    {/* Divider */}
                                    <div className="my-5 h-px w-full bg-slate-700/40" />

                                    {/* CTA */}
                                    <button
                                        onClick={() =>
                                            navigate(`/dashboard/interview/guidelines/${category.$id}`)
                                        }
                                        className={`flex w-full items-center justify-center gap-2 rounded-xl ${c.btn} py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98]`}
                                    >
                                        Start Interview
                                        <svg
                                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Footer count when search is active */}
                {search && filtered.length > 0 && (
                    <p className="mt-6 text-center text-sm text-slate-500">
                        Showing {filtered.length} of {categories.length} categories
                    </p>
                )}
            </div>
        </div>
    );
};

export default CandidateCategories;