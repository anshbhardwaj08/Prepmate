import { NavLink } from "react-router-dom";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const navItems = [
    {
        to: "/dashboard",
        end: true,
        label: "Dashboard",
        icon: (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15v-6h-6v6H3.75A.75.75 0 013 21V9.75z" />
            </svg>
        ),
    },
    {
        to: "/dashboard/categories",
        label: "Categories",
        icon: (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
    },
    {
        to: "/dashboard/contests",
        label: "Contests",
        icon: (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
        ),
    },
    {
        to: "/dashboard/history",
        label: "History",
        icon: (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
        ),
    },
    {
        to: "/dashboard/profile",
        label: "Profile",
        icon: (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
    },
];

const CandidateSidebar = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await authService.logout();
        dispatch(logout());
    };

    return (
        <aside className="fixed flex h-screen w-60 flex-col bg-[#080c14] border-r border-slate-800/60">

            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                </div>
                <span className="text-lg font-bold tracking-tight text-white">PrepMate</span>
            </div>

            {/* Section label */}
            <div className="px-5 pb-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Navigation
                </p>
            </div>

            {/* Nav links */}
            <nav className="flex-1 space-y-0.5 px-3">
                {navItems.map(({ to, end, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                                isActive
                                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span className={`transition-colors ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                                    {icon}
                                </span>
                                {label}
                                {isActive && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Divider */}
            <div className="mx-5 h-px bg-slate-800/60" />

            {/* Logout */}
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="group flex w-full items-center gap-3 rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                >
                    <svg className="h-4 w-4 transition-colors group-hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    Sign out
                </button>
            </div>

        </aside>
    );
};

export default CandidateSidebar;