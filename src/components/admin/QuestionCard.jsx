const DIFFICULTY_STYLES = {
    Easy:   { pill: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30", dot: "bg-emerald-400" },
    Medium: { pill: "bg-amber-500/10   text-amber-400   ring-1 ring-amber-500/30",   dot: "bg-amber-400"   },
    Hard:   { pill: "bg-rose-500/10    text-rose-400    ring-1 ring-rose-500/30",     dot: "bg-rose-400"    },
};

const TYPE_STYLES = {
    descriptive: { pill: "bg-blue-500/10   text-blue-400   ring-1 ring-blue-500/30",   icon: "📝" },
    mcq:         { pill: "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/30", icon: "☑️" },
    coding:      { pill: "bg-cyan-500/10   text-cyan-400   ring-1 ring-cyan-500/30",   icon: "💻" },
};

const OPTION_LABELS = ["A", "B", "C", "D"];

const QuestionCard = ({ question, onEdit, onDelete }) => {
    const difficulty = DIFFICULTY_STYLES[question.difficulty] ?? DIFFICULTY_STYLES.Medium;
    const type       = TYPE_STYLES[question.type]             ?? TYPE_STYLES.descriptive;

    return (
        <div className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden transition-all duration-200 hover:border-slate-700 hover:shadow-xl hover:shadow-black/30">

            {/* Top accent line — color by difficulty */}
            <div className={`h-0.5 w-full ${
                question.difficulty === "Easy"   ? "bg-emerald-500" :
                question.difficulty === "Hard"   ? "bg-rose-500"    : "bg-amber-500"
            }`} />

            {/* Card body */}
            <div className="flex flex-1 flex-col p-5">

                {/* Badges row */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    {/* Type badge */}
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${type.pill}`}>
                        <span>{type.icon}</span>
                        {question.type?.charAt(0).toUpperCase() + question.type?.slice(1)}
                    </span>

                    {/* Difficulty badge */}
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${difficulty.pill}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${difficulty.dot}`} />
                        {question.difficulty}
                    </span>
                </div>

                {/* Title */}
                <h2 className="mb-1.5 text-base font-semibold leading-snug text-white">
                    {question.title}
                </h2>

                {/* Description */}
                {question.description && (
                    <p className="mb-4 text-sm leading-relaxed text-slate-400 line-clamp-2">
                        {question.description}
                    </p>
                )}

                {/* MCQ Options */}
                {question.type === "mcq" && question.options?.length > 0 && (
                    <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                            Options
                        </p>
                        <div className="space-y-2">
                            {question.options.map((option, index) => {
                                const isCorrect = Number(question.correctAnswer) === index;
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                            isCorrect
                                                ? "bg-emerald-500/10 ring-1 ring-emerald-500/30"
                                                : "bg-slate-800/40"
                                        }`}
                                    >
                                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                            isCorrect
                                                ? "bg-emerald-500 text-white"
                                                : "bg-slate-700 text-slate-400"
                                        }`}>
                                            {OPTION_LABELS[index]}
                                        </span>
                                        <span className={isCorrect ? "text-emerald-300" : "text-slate-300"}>
                                            {option}
                                        </span>
                                        {isCorrect && (
                                            <span className="ml-auto shrink-0 text-xs font-medium text-emerald-400">
                                                ✓ Correct
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Expected answer for descriptive */}
                {question.type === "descriptive" && question.expectedAnswer && (
                    <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                            Expected Answer
                        </p>
                        <p className="text-sm leading-relaxed text-slate-300 line-clamp-3">
                            {question.expectedAnswer}
                        </p>
                    </div>
                )}

                {/* Spacer to push actions to bottom */}
                <div className="flex-1" />

                {/* Action buttons */}
                <div className="mt-4 flex gap-2 border-t border-slate-800/60 pt-4">
                    <button
                        onClick={() => onEdit(question)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                        <EditIcon />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(question.$id)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                        <TrashIcon />
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
};

const EditIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const TrashIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4h6v2" />
    </svg>
);

export default QuestionCard;