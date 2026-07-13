import { useSelector } from "react-redux";

const AdminHeader = ({ onMenuOpen }) => {
  const user = useSelector((state) => state.auth.userData);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "A";

  return (
    <header className="fixed left-0 right-0 top-0 z-10 md:left-60 bg-[#0c0e14] border-b border-white/[0.07]">
      <div className="flex items-center justify-between px-4 md:px-8 py-3.5">

        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuOpen}
          className="md:hidden w-8 h-8 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-slate-400 hover:text-slate-300 transition-all flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Left: greeting */}
        <div className="flex-1 min-w-0 ml-3 md:ml-0">
          <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-[0.08em] mb-0.5 hidden sm:block">
            Overview
          </p>
          <h2 className="text-sm md:text-base font-semibold text-white tracking-tight leading-none truncate">
            {getGreeting()},{" "}
            <span className="text-white">{user?.name ?? "Admin"}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
            Manage your AI Interview Platform
          </p>
        </div>

        {/* Right: status + actions */}
        <div className="flex items-center gap-2">
          {/* Live status badge — hidden on small screens */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-[10px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>

          {/* Notification bell */}
          <button className="w-8 h-8 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-slate-400 hover:text-slate-300 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
            {initials}
          </div>
        </div>

      </div>
    </header>
  );
};

export default AdminHeader;