// src/pages/candidate/OAPrep.jsx
import { useState, useMemo } from "react";
import { oaData, filterTabs, difficultyFilters } from "../../data/oaData";

// ── Helpers ────────────────────────────────────────────────────────────────────

const DIFFICULTY_STYLES = {
    Easy:   { pill: "bg-green-500/10 text-green-400 border border-green-500/20",  dot: "bg-green-400" },
    Medium: { pill: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20", dot: "bg-yellow-400" },
    Hard:   { pill: "bg-red-500/10 text-red-400 border border-red-500/20",       dot: "bg-red-400" },
};

const TOPIC_COLORS = [
    "bg-blue-500/10 text-blue-300",
    "bg-purple-500/10 text-purple-300",
    "bg-cyan-500/10 text-cyan-300",
    "bg-indigo-500/10 text-indigo-300",
    "bg-teal-500/10 text-teal-300",
];

function topicColor(topic) {
    let hash = 0;
    for (let c of topic) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
    return TOPIC_COLORS[hash % TOPIC_COLORS.length];
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function DifficultyPill({ difficulty }) {
    const s = DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.Medium;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.pill}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {difficulty}
        </span>
    );
}

function QuestionCard({ question, companyColor }) {
    const lcUrl = `https://leetcode.com/problems/${question.slug}/`;

    return (
        <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-black/30">

            {/* Top row */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {question.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">OA {question.year}</p>
                </div>
                <DifficultyPill difficulty={question.difficulty} />
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {question.topics.map((t) => (
                    <span key={t} className={`rounded-md px-2 py-0.5 text-xs font-medium ${topicColor(t)}`}>
                        {t}
                    </span>
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-500 font-mono">#{question.id}</span>
                <a
                    href={lcUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-all hover:bg-amber-500/20 hover:text-amber-300"
                >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                    </svg>
                    Solve on LeetCode
                </a>
            </div>
        </div>
    );
}

function CompanySection({ company, questions }) {
    const totalQ = questions.length;
    const hardCount = questions.filter((q) => q.difficulty === "Hard").length;
    const medCount  = questions.filter((q) => q.difficulty === "Medium").length;
    const easyCount = questions.filter((q) => q.difficulty === "Easy").length;

    return (
        <section className="mb-10">
            {/* Company header */}
            <div className={`mb-5 flex items-center justify-between rounded-xl border ${company.color.border} bg-gradient-to-r ${company.color.bg} px-5 py-3`}>
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black ${company.color.icon}`}>
                        {company.shortName}
                    </div>
                    <div>
                        <p className="text-base font-bold text-white">{company.company}</p>
                        <p className="text-xs text-slate-400">{totalQ} question{totalQ !== 1 ? "s" : ""}</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-xs">
                    {easyCount > 0 && <span className="text-green-400 font-semibold">{easyCount} Easy</span>}
                    {medCount  > 0 && <span className="text-yellow-400 font-semibold">{medCount} Med</span>}
                    {hardCount > 0 && <span className="text-red-400 font-semibold">{hardCount} Hard</span>}
                </div>
            </div>

            {/* Cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {questions.map((q) => (
                    <QuestionCard key={q.id} question={q} companyColor={company.color} />
                ))}
            </div>
        </section>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

const OAPrep = () => {
    const [activeFilter, setActiveFilter]  = useState("all");
    const [diffFilter,   setDiffFilter]    = useState("All");
    const [search,       setSearch]        = useState("");

    const filteredData = useMemo(() => {
        return oaData
            .filter((co) => activeFilter === "all" || co.tag === activeFilter)
            .map((co) => ({
                ...co,
                questions: co.questions.filter((q) => {
                    const matchDiff  = diffFilter === "All" || q.difficulty === diffFilter;
                    const matchSearch =
                        search.trim() === "" ||
                        q.title.toLowerCase().includes(search.toLowerCase()) ||
                        q.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
                    return matchDiff && matchSearch;
                }),
            }))
            .filter((co) => co.questions.length > 0);
    }, [activeFilter, diffFilter, search]);

    const totalQCount = filteredData.reduce((s, c) => s + c.questions.length, 0);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* ── Hero Header ── */}
            <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-8 py-10">
                <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-amber-700 opacity-10 blur-3xl" />
                <div className="absolute -bottom-10 right-20 h-40 w-64 rounded-full bg-orange-700 opacity-10 blur-3xl" />

                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-amber-400 mb-1 tracking-wider uppercase">
                            OA Prep Portal
                        </p>
                        <h1 className="text-4xl font-bold text-white">Company OA Questions</h1>
                        <p className="mt-2 text-slate-400 max-w-lg">
                            Curated LeetCode problems from real Online Assessments. Filter by company, difficulty, or topic and start solving.
                        </p>
                    </div>

                    {/* Stats pill */}
                    <div className="hidden md:flex flex-col items-center rounded-2xl border border-slate-700 bg-slate-800/50 px-8 py-4 backdrop-blur shrink-0">
                        <span className="text-3xl font-bold text-amber-400">{oaData.reduce((s, c) => s + c.questions.length, 0)}</span>
                        <span className="text-xs text-slate-400 mt-1">Total Questions</span>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8">

                {/* ── Filter Bar ── */}
                <div className="mb-8 space-y-4">

                    {/* Company type tabs */}
                    <div className="flex flex-wrap gap-2">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveFilter(tab.key)}
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                                    activeFilter === tab.key
                                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search + difficulty row */}
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search questions or topics…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition"
                            />
                        </div>

                        {/* Difficulty filter */}
                        <div className="flex gap-2 flex-wrap">
                            {difficultyFilters.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDiffFilter(d)}
                                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                                        diffFilter === d
                                            ? d === "Easy"   ? "bg-green-500/20 text-green-400 border border-green-500/40"
                                            : d === "Medium" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                                            : d === "Hard"   ? "bg-red-500/20 text-red-400 border border-red-500/40"
                                            :                  "bg-slate-600 text-white border border-slate-500"
                                            : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white"
                                    }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>

                        {/* Result count */}
                        <div className="ml-auto flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-xs text-slate-400 shrink-0">
                            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                            {filteredData.length} compan{filteredData.length !== 1 ? "ies" : "y"} · {totalQCount} question{totalQCount !== 1 ? "s" : ""}
                        </div>
                    </div>
                </div>

                {/* ── Empty state ── */}
                {filteredData.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-14 text-center">
                        <div className="text-5xl mb-4">🔍</div>
                        <h2 className="text-xl font-bold text-white">No questions found</h2>
                        <p className="mt-2 text-slate-400 text-sm">Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setSearch(""); setActiveFilter("all"); setDiffFilter("All"); }}
                            className="mt-5 rounded-xl bg-slate-700 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-600 transition"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* ── Company sections ── */}
                {filteredData.map((co) => (
                    <CompanySection key={co.company} company={co} questions={co.questions} />
                ))}

                {/* ── Footer tip ── */}
                {filteredData.length > 0 && (
                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 px-5 py-4 flex items-start gap-3 text-sm text-slate-400">
                        <span className="text-lg shrink-0">💡</span>
                        <p>
                            Questions are sourced from community reports and may vary by batch. Always check the company's official OA portal for the most current set. Click{" "}
                            <span className="text-amber-400 font-semibold">Solve on LeetCode</span> to open the problem directly.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default OAPrep;