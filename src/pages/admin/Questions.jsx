import { useEffect, useState } from "react";
import databaseService from "../../appwrite/database";
import QuestionForm from "../../components/admin/QuestionForm";
import QuestionCard from "../../components/admin/QuestionCard";

const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

const Questions = () => {
    const [questions, setQuestions]           = useState([]);
    const [categories, setCategories]         = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [loading, setLoading]               = useState(true);

    const loadData = async () => {
        try {
            const [questionData, categoryData] = await Promise.all([
                databaseService.getQuestions(),
                databaseService.getCategories(),
            ]);
            setQuestions(questionData);
            setCategories(categoryData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const addQuestion = async (data) => {
        try {
            await databaseService.createQuestion(data);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuestion = async (data) => {
        try {
            await databaseService.updateQuestion(selectedQuestion.$id, data);
            setSelectedQuestion(null);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteQuestion = async (id) => {
        try {
            await databaseService.deleteQuestion(id);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    // Group questions by category
    const questionsByCategory = categories.map((category) => ({
        ...category,
        questions: questions.filter((q) => q.categoryId === category.$id),
    }));

    const uncategorized = questions.filter(
        (q) => !categories.find((c) => c.$id === q.categoryId)
    );

    const totalQuestions = questions.length;
    const easyCount   = questions.filter((q) => q.difficulty === "Easy").length;
    const mediumCount = questions.filter((q) => q.difficulty === "Medium").length;
    const hardCount   = questions.filter((q) => q.difficulty === "Hard").length;

    return (
        <div className="min-h-screen bg-slate-950 p-8">

            {/* ── Page header ── */}
            <div className="mb-8">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
                    Question Bank
                </p>
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <h1 className="text-3xl font-bold text-white">Questions</h1>
                    <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
                        {totalQuestions} total questions
                    </div>
                </div>
            </div>

            {/* ── Stats row ── */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatPill label="Total"  value={totalQuestions} color="text-white"        />
                <StatPill label="Easy"   value={easyCount}      color="text-emerald-400"  />
                <StatPill label="Medium" value={mediumCount}     color="text-amber-400"    />
                <StatPill label="Hard"   value={hardCount}       color="text-rose-400"     />
            </div>

            {/* ── Add / Edit form ── */}
            {selectedQuestion && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                    <span className="text-amber-400 text-sm">✏️</span>
                    <p className="text-sm text-amber-300">
                        Editing: <span className="font-semibold">{selectedQuestion.title}</span>
                    </p>
                    <button
                        onClick={() => setSelectedQuestion(null)}
                        className="ml-auto text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        Cancel edit ✕
                    </button>
                </div>
            )}

            <div className="mb-10">
                <QuestionForm
                    onSubmit={selectedQuestion ? updateQuestion : addQuestion}
                    defaultValues={selectedQuestion || {}}
                    buttonText={selectedQuestion ? "Update Question" : "Add Question"}
                />
            </div>

            {/* ── Questions by category ── */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
                </div>
            ) : (
                <div className="space-y-4">

                    {questionsByCategory.map((category) => (
                        <CategorySection
                            key={category.$id}
                            category={category}
                            isExpanded={expandedCategory === category.$id}
                            onToggle={() =>
                                setExpandedCategory(
                                    expandedCategory === category.$id ? null : category.$id
                                )
                            }
                            onEdit={(q) => {
                                setSelectedQuestion(q);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            onDelete={deleteQuestion}
                        />
                    ))}

                    {/* Uncategorized */}
                    {uncategorized.length > 0 && (
                        <CategorySection
                            category={{
                                $id: "uncategorized",
                                name: "Uncategorized",
                                questions: uncategorized,
                                isUncategorized: true,
                            }}
                            isExpanded={expandedCategory === "uncategorized"}
                            onToggle={() =>
                                setExpandedCategory(
                                    expandedCategory === "uncategorized" ? null : "uncategorized"
                                )
                            }
                            onEdit={setSelectedQuestion}
                            onDelete={deleteQuestion}
                        />
                    )}

                    {/* Empty state */}
                    {questions.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-20 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl">
                                📝
                            </div>
                            <h2 className="text-lg font-bold text-white">No questions yet</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Add your first question using the form above.
                            </p>
                        </div>
                    )}

                </div>
            )}

        </div>
    );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const StatPill = ({ label, value, color }) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
        <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
    </div>
);

const CategorySection = ({ category, isExpanded, onToggle, onEdit, onDelete }) => {
    const count = category.questions.length;

    return (
        <div className={`rounded-2xl border overflow-hidden transition-colors ${
            category.isUncategorized
                ? "border-amber-600/20 bg-slate-900"
                : "border-slate-800 bg-slate-900"
        }`}>

            {/* Header */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-800/60 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                        category.isUncategorized
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-blue-600/20 text-blue-400"
                    }`}>
                        {category.isUncategorized
                            ? "?"
                            : category.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                        <h2 className="font-semibold text-white">{category.name}</h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {count} question{count !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        category.isUncategorized
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-blue-600/20 text-blue-400"
                    }`}>
                        {count}
                    </span>
                    <span className={`text-slate-500 transition-transform duration-200 text-xs ${
                        isExpanded ? "rotate-180" : ""
                    }`}>
                        ▼
                    </span>
                </div>
            </button>

            {/* Questions grid */}
            {isExpanded && (
                <div className="border-t border-slate-800 p-5">
                    {count === 0 ? (
                        <div className="flex flex-col items-center py-10 text-center text-slate-500">
                            <p className="text-3xl mb-2">📭</p>
                            <p className="text-sm">No questions in this category yet.</p>
                            <p className="text-xs mt-1 text-slate-600">
                                Add one above and select "{category.name}"
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-2">
                            {category.questions.map((question) => (
                                <QuestionCard
                                    key={question.$id}
                                    question={question}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default Questions;