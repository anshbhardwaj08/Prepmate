import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StatsCards from "../../components/dashboard/StatsCards";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import Achievements from "../../components/dashboard/Achievements";
import ProgressCard from "../../components/dashboard/ProgressCard";
import databaseService from "../../appwrite/database";

const Dashboard = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

    const [categories, setCategories] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const categoryData = await databaseService.getCategories();
                const resultData = await databaseService.getUserResults(user.$id);
                setCategories(categoryData);
                setResults(resultData);
            } catch (error) {
                console.log(error);
            }
        };
        if (user) loadData();
    }, [user]);

    const totalInterviews = results.length;

    const averageScore =
        totalInterviews === 0
            ? 0
            : Math.round(
                results.reduce((sum, item) => sum + item.score, 0) / totalInterviews
            );

    const bestScore =
        totalInterviews === 0
            ? 0
            : Math.max(...results.map((item) => item.score));

    // Score color helper
    const scoreColor = (score) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    const scoreBg = (score) => {
        if (score >= 80) return "bg-green-500/10 border-green-500/20";
        if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
        return "bg-red-500/10 border-red-500/20";
    };

    // Category accent colors
    const categoryColors = [
        { bg: "from-blue-600/20 to-blue-900/10", border: "border-blue-600/20", btn: "bg-blue-600 hover:bg-blue-500", icon: "🔵" },
        { bg: "from-indigo-600/20 to-indigo-900/10", border: "border-indigo-600/20", btn: "bg-indigo-600 hover:bg-indigo-500", icon: "🟣" },
        { bg: "from-violet-600/20 to-violet-900/10", border: "border-violet-600/20", btn: "bg-violet-600 hover:bg-violet-500", icon: "💜" },
        { bg: "from-cyan-600/20 to-cyan-900/10", border: "border-cyan-600/20", btn: "bg-cyan-600 hover:bg-cyan-500", icon: "🔷" },
        { bg: "from-teal-600/20 to-teal-900/10", border: "border-teal-600/20", btn: "bg-teal-600 hover:bg-teal-500", icon: "🟢" },
        { bg: "from-purple-600/20 to-purple-900/10", border: "border-purple-600/20", btn: "bg-purple-600 hover:bg-purple-500", icon: "🔮" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* ── Hero Header ── */}
            <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-8 py-10">

                {/* Background glow blobs */}
                <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-blue-700 opacity-10 blur-3xl" />
                <div className="absolute -bottom-10 right-20 h-40 w-64 rounded-full bg-indigo-700 opacity-10 blur-3xl" />

                <div className="relative flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-400 mb-1 tracking-wider uppercase">
                            Welcome back
                        </p>
                        <h1 className="text-4xl font-bold text-white">
                            {user?.name} 👋
                        </h1>
                        <p className="mt-2 text-slate-400">
                            Ready to ace your next AI interview?
                        </p>
                    </div>

                    {/* Quick stat pill */}
                    {totalInterviews > 0 && (
                        <div className="hidden md:flex flex-col items-center rounded-2xl border border-slate-700 bg-slate-800/50 px-8 py-4 backdrop-blur">
                            <span className="text-3xl font-bold text-blue-400">{averageScore}%</span>
                            <span className="text-xs text-slate-400 mt-1">Avg Score</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8">

                {/* ── Stats Cards ── */}
                <div className="mb-10">
                    <StatsCards
                        interviews={results.length}
                        average={averageScore}
                        best={bestScore}
                        categories={categories.length}
                    />
                </div>

                {/* ── Charts & Achievements ── */}
                <div className="mb-10 space-y-6">
                    <PerformanceChart results={results} />
                    <Achievements results={results} />
                    <ProgressCard results={results} />
                </div>

                {/* ── Recent Results ── */}
                <div className="mb-10">

                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Recent Results</h2>
                        {results.length > 0 && (
                            <span className="text-xs text-slate-400">
                                Last {Math.min(results.length, 5)} interviews
                            </span>
                        )}
                    </div>

                    {results.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
                            <div className="text-6xl mb-4">🚀</div>
                            <h2 className="text-2xl font-bold text-white">No Interviews Yet</h2>
                            <p className="mt-3 text-slate-400 text-sm">
                                Start your first AI interview to see your progress here.
                            </p>
                            <button
                                onClick={() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold hover:bg-blue-500 transition"
                            >
                                Browse Categories ↓
                            </button>
                        </div>

                    ) : (

                        <div className="space-y-3">
                            {results.slice(0, 5).map((result, index) => (
                                <div
                                    key={result.$id}
                                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">

                                        {/* Index number */}
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-sm font-bold text-slate-400 group-hover:border-slate-600">
                                            {index + 1}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-white">
                                                {result.category || "AI Interview"}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {new Date(result.$createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                    </div>

                                    <div className={`rounded-xl border px-4 py-2 text-lg font-bold ${scoreBg(result.score)} ${scoreColor(result.score)}`}>
                                        {result.score}%
                                    </div>

                                </div>
                            ))}
                        </div>

                    )}

                </div>

                {/* ── Interview Categories ── */}
                <div id="categories-section">

                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Interview Categories</h2>
                        <span className="text-xs text-slate-400">
                            {categories.length} available
                        </span>
                    </div>

                    {categories.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center">
                            <div className="text-5xl mb-3">📂</div>
                            <p className="text-slate-400 text-sm">No categories available yet.</p>
                        </div>

                    ) : (

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {categories.map((category, index) => {
                                const accent = categoryColors[index % categoryColors.length];
                                return (
                                    <div
                                        key={category.$id}
                                        className={`group relative overflow-hidden rounded-2xl border ${accent.border} bg-gradient-to-br ${accent.bg} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30`}
                                    >

                                        {/* Glow on hover */}
                                        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-5" />

                                        {/* Category initial badge */}
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700 text-2xl font-black text-white">
                                                {category.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-400">
                                                Interview
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white">
                                            {category.name}
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
                                            {category.description || "Practice your skills with AI-powered questions."}
                                        </p>

                                        <button
                                            onClick={() => navigate(`/dashboard/interview/${category.$id}`)}
                                            className={`mt-5 w-full rounded-xl ${accent.btn} py-2.5 text-sm font-bold text-white transition-all duration-200 shadow-md`}
                                        >
                                            Start Interview →
                                        </button>

                                    </div>
                                );
                            })}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );

};

export default Dashboard;