import { useSelector } from "react-redux";

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
};

const getInitials = (name = "") =>
    name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "?";

const CandidateHeader = () => {
    const user = useSelector((state) => state.auth.userData);
    const greeting = getGreeting();

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800/60 bg-[#080c14]/80 px-8 py-4 backdrop-blur-md">

            {/* Left: greeting */}
            <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                    {greeting}
                </p>
                <h2 className="mt-0.5 text-xl font-bold text-white">
                    {user?.name ?? "Candidate"}
                </h2>
            </div>

            {/* Right: status pill + avatar */}
            <div className="flex items-center gap-4">

                {/* Session status */}
                <div className="hidden items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/40 px-3.5 py-2 sm:flex">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-slate-400">Ready to practice</span>
                </div>

                {/* Notification bell */}
                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/40 text-slate-400 transition hover:border-slate-600 hover:text-slate-200">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button>

                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-xs font-bold text-blue-400 select-none">
                    {getInitials(user?.name)}
                </div>

            </div>
        </header>
    );
};

export default CandidateHeader;