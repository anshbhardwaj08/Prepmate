const RANK_STYLES = [
    {
        badge: "bg-amber-900/40 ring-amber-700 text-amber-300",
        label: "Gold",
    },
    {
        badge: "bg-slate-700/60 ring-slate-600 text-slate-300",
        label: "Silver",
    },
    {
        badge: "bg-orange-900/40 ring-orange-800 text-orange-400",
        label: "Bronze",
    },
];

const getScoreColor = (score) => {
    if (score >= 90) return { bar: "bg-emerald-500", text: "text-emerald-400" };
    if (score >= 75) return { bar: "bg-blue-500",    text: "text-blue-400"    };
    if (score >= 60) return { bar: "bg-amber-500",   text: "text-amber-400"   };
    return              { bar: "bg-rose-500",     text: "text-rose-400"    };
};

const TopPerformers = ({ results }) => {

    const sorted = [...results]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    return (

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                Leaderboard
            </p>
            <h2 className="mb-6 text-lg font-medium text-white">
                Top performers
            </h2>

            {sorted.length === 0 ? (
                <p className="text-sm text-slate-500">No results yet.</p>
            ) : (
                <div className="space-y-1">
                    {sorted.map((item, index) => {

                        const rankStyle  = RANK_STYLES[index] ?? null;
                        const scoreColor = getScoreColor(Number(item.score));
                        const score      = Number(item.score);

                        return (
                            <div
                                key={item.$id}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-800/60"
                            >
                                {/* Rank badge */}
                                <div
                                    className={`
                                        flex h-7 w-7 shrink-0 items-center justify-center
                                        rounded-full text-xs font-medium ring-1
                                        ${rankStyle
                                            ? rankStyle.badge
                                            : "bg-slate-800 ring-slate-700 text-slate-400"
                                        }
                                    `}
                                    title={rankStyle?.label ?? `Rank ${index + 1}`}
                                >
                                    {index + 1}
                                </div>

                                {/* User ID */}
                                <span className="w-24 shrink-0 truncate font-mono text-xs text-slate-400">
                                    {item.userId.slice(0, 10)}
                                </span>

                                {/* Score bar */}
                                <div className="flex-1">
                                    <div className="h-1 overflow-hidden rounded-full bg-slate-800">
                                        <div
                                            className={`h-full rounded-full transition-all ${scoreColor.bar}`}
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Score label */}
                                <span
                                    className={`w-10 shrink-0 text-right text-sm font-medium ${scoreColor.text}`}
                                >
                                    {score}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>

    );

};

export default TopPerformers;