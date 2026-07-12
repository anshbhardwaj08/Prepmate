const AVATAR_COLORS = [
    { bg: "bg-blue-900/50",   text: "text-blue-300",   ring: "ring-blue-800"   },
    { bg: "bg-purple-900/50", text: "text-purple-300", ring: "ring-purple-800" },
    { bg: "bg-emerald-900/50",text: "text-emerald-300",ring: "ring-emerald-800"},
    { bg: "bg-amber-900/50",  text: "text-amber-300",  ring: "ring-amber-800"  },
    { bg: "bg-rose-900/50",   text: "text-rose-300",   ring: "ring-rose-800"   },
];

const getInitials = (name) => {
    if (!name) return "??";
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const RecentUsers = ({ users }) => {

    const recent = users.slice(0, 5);

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                Activity
            </p>
            <h2 className="mb-6 text-lg font-medium text-white">
                Recent users
            </h2>

            {recent.length === 0 ? (
                <p className="text-sm text-slate-500">No users yet.</p>
            ) : (
                <div className="space-y-1">
                    {recent.map((user, index) => {

                        const color = AVATAR_COLORS[index % AVATAR_COLORS.length];

                        return (
                            <div
                                key={user.$id}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-800/60"
                            >
                                {/* Avatar */}
                                <div
                                    className={`
                                        flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-full ring-1
                                        ${color.bg} ${color.text} ${color.ring}
                                        text-xs font-medium
                                    `}
                                >
                                    {getInitials(user.name)}
                                </div>

                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-white">
                                        {user.name || "Unknown user"}
                                    </p>
                                    <p className="text-xs text-slate-500 capitalize">
                                        {user.role || "—"}
                                    </p>
                                </div>

                                {/* Date */}
                                <span className="shrink-0 text-xs text-slate-600">
                                    {formatDate(user.$createdAt)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>

    );

};

export default RecentUsers;