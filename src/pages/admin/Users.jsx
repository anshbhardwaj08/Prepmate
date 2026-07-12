import { useEffect, useMemo, useState } from "react";
import databaseService from "../../appwrite/database";

// ─── helpers ────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
    { bg: "bg-purple-600/20", text: "text-purple-400" },
    { bg: "bg-blue-600/20",   text: "text-blue-400"   },
    { bg: "bg-emerald-600/20",text: "text-emerald-400"},
    { bg: "bg-amber-600/20",  text: "text-amber-400"  },
    { bg: "bg-rose-600/20",   text: "text-rose-400"   },
];

const getInitials = (user) => {
    if (user.role === "admin") return "AD";
    if (user.name && typeof user.name === "string") {
        return user.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }
    return (user.userId ?? "??").slice(0, 2).toUpperCase();
};

const getAvatarColor = (index, role) => {
    if (role === "admin") return { bg: "bg-purple-600/20", text: "text-purple-400" };
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
};

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

// ─── sub-components ──────────────────────────────────────────────────────────

const StatCard = ({ title, value, sub, accent = "text-white" }) => (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
        <p className="text-xs uppercase tracking-wider text-slate-500">{title}</p>
        <h2 className={`mt-3 text-4xl font-bold ${accent}`}>{value}</h2>
        <p className="mt-1 text-xs text-slate-600">{sub}</p>
    </div>
);

const DrawerRow = ({ label, value, mono = false }) => (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-slate-800/60 last:border-0">
        <span className="text-xs text-slate-500 flex-shrink-0 w-24">{label}</span>
        <span className={`text-xs text-right break-all ${mono ? "font-mono text-slate-300" : "text-slate-300"}`}>
            {value || "—"}
        </span>
    </div>
);

const EyeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const TrashIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4h6v2" />
    </svg>
);

// ─── main component ───────────────────────────────────────────────────────────

const Users = () => {
    const [users, setUsers]               = useState([]);
    const [loading, setLoading]           = useState(true);
    const [search, setSearch]             = useState("");
    const [filter, setFilter]             = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [toast, setToast]               = useState({ msg: "", type: "success" });

    // ── load users ──────────────────────────────────────────────────────────
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await databaseService.getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
                showToast("Failed to load users", "error");
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    // ── filter ───────────────────────────────────────────────────────────────
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const q = search.toLowerCase();
            const matchesSearch =
                !search ||
                user.name?.toLowerCase().includes(q) ||
                user.email?.toLowerCase().includes(q) ||
                user.college?.toLowerCase().includes(q) ||
                user.userId?.toLowerCase().includes(q);
            const matchesRole =
                filter === "all" || user.role === filter;
            return matchesSearch && matchesRole;
        });
    }, [users, search, filter]);

    // ── toast ────────────────────────────────────────────────────────────────
    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast({ msg: "", type: "success" }), 2500);
    };

    // ── delete ───────────────────────────────────────────────────────────────
    const handleDelete = async (user) => {
        try {
            await databaseService.deleteUser(user.$id);
            setUsers((prev) => prev.filter((u) => u.$id !== user.$id));
            setConfirmDelete(null);
            setSelectedUser(null);
            showToast("User deleted successfully", "success");
        } catch (error) {
            console.error(error);
            showToast("Failed to delete user", "error");
        }
    };

    // ── render ───────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white relative">

            {/* ── Toast ── */}
            {toast.msg && (
                <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-sm font-medium px-5 py-3 rounded-xl shadow-lg transition-all ${
                    toast.type === "error"
                        ? "bg-red-500/10 border border-red-500/30 text-red-400"
                        : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                }`}>
                    {toast.msg}
                </div>
            )}

            {/* ── Delete Confirmation Modal ── */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-80 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                                <TrashIcon />
                            </div>
                            <h3 className="text-base font-semibold">Delete user?</h3>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-5">
                            This will permanently remove{" "}
                            <span className="text-white font-medium">
                                {confirmDelete.name || confirmDelete.userId?.slice(0, 14) + "…"}
                            </span>{" "}
                            from the platform. This action can't be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-sm hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(confirmDelete)}
                                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-medium transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Profile Drawer ── */}
            {selectedUser && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex justify-end"
                    onClick={() => setSelectedUser(null)}
                >
                    <div
                        className="bg-slate-900 border-l border-slate-800 w-84 h-full overflow-y-auto"
                        style={{ width: "340px" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                            <h2 className="text-base font-semibold">User profile</h2>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-slate-400 hover:text-white transition-colors text-lg leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div className="p-6">
                            {/* Avatar + name */}
                            <div className="flex flex-col items-center mb-6">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold mb-3 ring-2 ring-slate-700 ${
                                    getAvatarColor(0, selectedUser.role).bg
                                } ${getAvatarColor(0, selectedUser.role).text}`}>
                                    {selectedUser.profileImage ? (
                                        <img
                                            src={databaseService.getFileView(selectedUser.profileImage).toString()}
                                            className="w-16 h-16 rounded-full object-cover"
                                            alt="Profile"
                                        />
                                    ) : (
                                        getInitials(selectedUser)
                                    )}
                                </div>

                                {/* Name */}
                                <p className="text-base font-semibold text-white mb-1">
                                    {selectedUser.name || "Unknown User"}
                                </p>

                                {/* Email */}
                                {selectedUser.email && (
                                    <p className="text-xs text-slate-500 mb-2">
                                        {selectedUser.email}
                                    </p>
                                )}

                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                    selectedUser.role === "admin"
                                        ? "bg-purple-600/20 text-purple-400"
                                        : "bg-blue-600/20 text-blue-400"
                                }`}>
                                    {selectedUser.role}
                                </span>
                            </div>

                            {/* Personal Info */}
                            <div className="mb-5">
                                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                                    Personal info
                                </p>
                                <div className="space-y-0">
                                    <DrawerRow label="Name"    value={selectedUser.name}  />
                                    <DrawerRow label="Email"   value={selectedUser.email} />
                                    <DrawerRow label="Joined"  value={formatDate(selectedUser.$createdAt)} />
                                </div>
                            </div>

                            {/* Account IDs */}
                            <div className="mb-5">
                                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                                    Account IDs
                                </p>
                                <div className="space-y-0">
                                    <DrawerRow label="User ID" value={selectedUser.userId} mono />
                                    <DrawerRow label="Doc ID"  value={selectedUser.$id}    mono />
                                </div>
                            </div>

                            {/* Profile */}
                            <div className="mb-6">
                                <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                                    Profile
                                </p>
                                <div className="space-y-0">
                                    <DrawerRow label="College"    value={selectedUser.college}        />
                                    <DrawerRow label="Skills"     value={selectedUser.skills}         />
                                    <DrawerRow label="Graduation" value={selectedUser.graduationYear} />
                                </div>
                            </div>

                            {/* Delete */}
                            <button
                                onClick={() => {
                                    setSelectedUser(null);
                                    setConfirmDelete(selectedUser);
                                }}
                                className="w-full py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <TrashIcon /> Delete this user
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Page Header ── */}
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Manage registered users
                    </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <input
                        placeholder="Search by name, email or college…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm outline-none focus:border-slate-600 transition-colors placeholder:text-slate-600 min-w-[220px]"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm outline-none focus:border-slate-600 transition-colors"
                    >
                        <option value="all">All roles</option>
                        <option value="candidate">Candidate</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="mb-8 grid gap-4 md:grid-cols-3">
                <StatCard title="Total Users"  value={users.length}                                    sub="registered accounts" />
                <StatCard title="Candidates"   value={users.filter((u) => u.role === "candidate").length} sub="active learners"    accent="text-blue-400" />
                <StatCard title="Admins"       value={users.filter((u) => u.role === "admin").length}     sub="platform managers"  accent="text-purple-400" />
            </div>

            {/* ── Table ── */}
            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-800/60 border-b border-slate-800">
                                <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">User</th>
                                <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Role</th>
                                <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">College</th>
                                <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Skills</th>
                                <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Graduation</th>
                                <th className="p-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Joined</th>
                                <th className="p-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-16 text-center text-slate-500 text-sm">
                                        No users match your filters
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user, index) => {
                                    const color = getAvatarColor(index, user.role);
                                    return (
                                        <tr
                                            key={user.$id}
                                            onClick={() => setSelectedUser(user)}
                                            className="border-t border-slate-800 hover:bg-slate-800/40 cursor-pointer transition-colors"
                                        >
                                            {/* User cell */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${color.bg} ${color.text}`}>
                                                        {user.profileImage ? (
                                                            <img
                                                                src={databaseService.getFileView(user.profileImage).toString()}
                                                                className="w-9 h-9 rounded-full object-cover"
                                                                alt=""
                                                            />
                                                        ) : (
                                                            getInitials(user)
                                                        )}
                                                    </div>
                                                    <div>
                                                        {/* ✅ Show name instead of userId */}
                                                        <p className="text-sm font-medium text-white">
                                                            {user.name || "Unknown User"}
                                                        </p>
                                                        {/* ✅ Show email below name */}
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {user.email || user.userId?.slice(0, 18) + "…"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Role */}
                                            <td className="p-4">
                                                <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                                                    user.role === "admin"
                                                        ? "bg-purple-600/20 text-purple-400"
                                                        : "bg-blue-600/20 text-blue-400"
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>

                                            {/* College */}
                                            <td className="p-4 text-sm text-slate-300">
                                                {user.college || <span className="text-slate-600">—</span>}
                                            </td>

                                            {/* Skills */}
                                            <td className="p-4 text-sm text-slate-300 max-w-[160px] truncate">
                                                {user.skills || <span className="text-slate-600">—</span>}
                                            </td>

                                            {/* Graduation */}
                                            <td className="p-4 text-sm text-slate-300">
                                                {user.graduationYear || <span className="text-slate-600">—</span>}
                                            </td>

                                            {/* Joined date */}
                                            <td className="p-4 text-sm text-slate-400">
                                                {formatDate(user.$createdAt)}
                                            </td>

                                            {/* Actions */}
                                            <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedUser(user)}
                                                        title="View profile"
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                                                    >
                                                        <EyeIcon />
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmDelete(user)}
                                                        title="Delete user"
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>

                    {/* Table footer */}
                    {filteredUsers.length > 0 && (
                        <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-600">
                            Showing {filteredUsers.length} of {users.length} users
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Users;