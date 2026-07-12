import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { logout } from "../../features/auth/authSlice";

const navItems = [
  {
    to: "/admin",
    end: true,
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    to: "/admin/categories",
    label: "Categories",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7a2 2 0 012-2h4a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM13 7a2 2 0 012-2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2V7zM3 16a2 2 0 012-2h4a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1zM13 16a2 2 0 012-2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1z" />
      </svg>
    ),
  },
  {
    to: "/admin/questions",
    label: "Questions",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 21a9 9 0 110-18 9 9 0 010 18zm0-4h.01" />
      </svg>
    ),
  },
  {
    to: "/admin/users",
    label: "Users",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const AdminSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
        : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-[#0c0e14] border-r border-white/[0.07]">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none tracking-tight">PrepMate</p>
            <p className="text-[10px] text-slate-500 mt-0.5 tracking-wide">Admin Console</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] font-semibold text-slate-600 uppercase tracking-[0.08em] px-3 mb-2">
          Main menu
        </p>
        {navItems.map(({ to, end, label, icon }) => (
          <NavLink key={to} to={to} end={end} className={navClass}>
            {({ isActive }) => (
              <>
                <span className={isActive ? "text-indigo-400" : "text-slate-500"}>
                  {icon}
                </span>
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-white/[0.07] pt-3 space-y-1">
        {/* User info row */}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-300 truncate">Administrator</p>
            <p className="text-[10px] text-slate-600 truncate">prepmate.admin</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 border border-red-500/15 bg-red-500/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/25 transition-all duration-150"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;