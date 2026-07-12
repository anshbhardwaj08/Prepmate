import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { evaluateInterview } from "../../gemini/gemini";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/database";
import { toast } from "react-hot-toast";
import WebcamBox from "../../components/interview/WebcamBox";
import VoiceRecorder from "../../components/interview/VoiceRecorder";

const Interview = () => {

    const user = useSelector((state) => state.auth.userData);
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [visited, setVisited] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [categoryName, setCategoryName] = useState("");
    const hasAutoSubmitted = useRef(false);

    // ── Load questions + category name ──
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await databaseService.getQuestionsByCategory(categoryId);
                setQuestions(data);
                setVisited(new Set([0]));

                const categories = await databaseService.getCategories();
                const found = categories.find(c => c.$id === categoryId);
                if (found) setCategoryName(found.name);

            } catch (error) {
                console.log(error);
            }
        };
        loadQuestions();
    }, [categoryId]);

    // ── Timer ──
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // ── Auto submit when timer hits 0 ──
    useEffect(() => {
        if (timeLeft === 0 && !hasAutoSubmitted.current && questions.length > 0) {
            hasAutoSubmitted.current = true;
            toast("⏰ Time's up! Submitting automatically...", { icon: "🕐" });
            handleSubmitInterview();
        }
    }, [timeLeft, questions]);

    // ── Submit handler ──
    const handleSubmitInterview = async () => {

        const answered = Object.values(answers).filter(
            (ans) => ans && ans.trim() !== ""
        );

        if (answered.length === 0) {
            toast.error("Please answer at least one question before submitting.");
            return;
        }

        try {
            setSubmitting(true);

            const evaluation = await evaluateInterview(categoryId, questions, answers);

            const result = await databaseService.createResult({
                interviewId: crypto.randomUUID(),
                userId: user.$id,
                score: evaluation.overallScore,
                communication: evaluation.communication,
                technicalKnowledge: evaluation.technicalKnowledge,
                problemSolving: evaluation.problemSolving,
                feedback: evaluation.feedback,
                strengths: evaluation.strengths.join("\n"),
                weaknesses: evaluation.weaknesses.join("\n"),
                suggestions: evaluation.suggestions,
                category: categoryName,
            });

            navigate(`/dashboard/results/${result.$id}`);

        } catch (error) {
            console.log(error);
            toast.error("Failed to submit interview. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const goToQuestion = (index) => {
        setCurrentQuestion(index);
        setVisited((prev) => {
            const updated = new Set(prev);
            updated.add(index);
            return updated;
        });
    };

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="text-5xl mb-4">⏳</div>
                    <p className="text-xl">Loading Questions...</p>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];
    const currentAnswer = answers[question.$id] || "";
    const answeredCount = Object.values(answers).filter((a) => a && a.trim() !== "").length;

    // Parse options safely — handles both array and JSON string
    const getOptions = (q) => {
        if (!q.options) return [];
        if (Array.isArray(q.options)) return q.options;
        try { return JSON.parse(q.options); } catch { return []; }
    };

    const isMCQ = question.type === "mcq" && getOptions(question).length > 0;

    const timerColor =
        timeLeft <= 60
            ? "bg-red-700 animate-pulse"
            : timeLeft <= 5 * 60
            ? "bg-orange-600"
            : "bg-red-600";

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white">

            {/* ── Top Bar ── */}
            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        {categoryName || "Interview"}
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        {answeredCount} of {questions.length} answered
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold">
                        {questions.length} Questions
                    </span>
                    <span className={`rounded-lg px-4 py-2 font-bold text-lg tabular-nums ${timerColor}`}>
                        {Math.floor(timeLeft / 60)}:
                        {(timeLeft % 60).toString().padStart(2, "0")}
                    </span>
                </div>

            </div>

            {/* ── 3-Column Layout ── */}
            <div className="grid gap-5 lg:grid-cols-[220px_1fr_280px]">

                {/* ── Col 1: Question Palette ── */}
                <div className="rounded-2xl bg-slate-900 p-5 h-fit">

                    <h3 className="mb-4 text-base font-semibold">Question Palette</h3>

                    <div className="mb-4 flex flex-col gap-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded bg-blue-600"></div> Current
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded bg-green-600"></div> Answered
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded bg-yellow-500"></div> Visited
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded bg-slate-700"></div> Not Visited
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {questions.map((q, index) => {
                            let color = "bg-slate-700";
                            if (answers[q.$id]?.trim()) {
                                color = "bg-green-600";
                            } else if (index === currentQuestion) {
                                color = "bg-blue-600";
                            } else if (visited.has(index)) {
                                color = "bg-yellow-500";
                            }
                            return (
                                <button
                                    key={q.$id}
                                    onClick={() => goToQuestion(index)}
                                    className={`h-10 w-10 rounded-full text-sm font-bold text-white ${color} hover:opacity-80 transition`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-5">
                        <div className="mb-1 flex justify-between text-xs text-slate-400">
                            <span>Progress</span>
                            <span>{Math.round((answeredCount / questions.length) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-700">
                            <div
                                className="h-1.5 rounded-full bg-green-500 transition-all duration-500"
                                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                </div>

                {/* ── Col 2: Question + Answer ── */}
                <div className="rounded-2xl bg-slate-900 p-6 flex flex-col">

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                            Question {currentQuestion + 1} of {questions.length}
                        </p>
                        {/* Question type badge */}
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            isMCQ
                                ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                                : "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                        }`}>
                            {isMCQ ? "MCQ" : "Theory"}
                        </span>
                    </div>

                    <h2 className="mt-3 text-2xl font-bold leading-snug">
                        {question.title}
                    </h2>

                    {question.description && (
                        <p className="mt-2 text-slate-300 leading-relaxed text-sm">
                            {question.description}
                        </p>
                    )}

                    {/* ── Answer Area: MCQ or Textarea ── */}
                    <div className="mt-5 flex-1">

                        {isMCQ ? (

                            // ── MCQ Options ──
                            <div className="space-y-3">
                                {getOptions(question).map((option, index) => {

                                    const optionLabels = ["A", "B", "C", "D"];
                                    const isSelected = answers[question.$id] === String(index);

                                    return (
                                        <label
                                            key={index}
                                            className={`flex items-center gap-4 rounded-xl p-4 cursor-pointer border transition ${
                                                isSelected
                                                    ? "bg-blue-600/20 border-blue-500 text-white"
                                                    : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-750"
                                            }`}
                                        >
                                            {/* Option label circle */}
                                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold border ${
                                                isSelected
                                                    ? "bg-blue-600 border-blue-500 text-white"
                                                    : "border-slate-600 text-slate-400"
                                            }`}>
                                                {optionLabels[index] || index + 1}
                                            </div>

                                            {/* Hidden radio input */}
                                            <input
                                                type="radio"
                                                name={question.$id}
                                                value={String(index)}
                                                checked={isSelected}
                                                onChange={(e) =>
                                                    setAnswers(prev => ({
                                                        ...prev,
                                                        [question.$id]: e.target.value,
                                                    }))
                                                }
                                                className="hidden"
                                            />

                                            {/* Option text */}
                                            <span className="text-sm leading-relaxed">
                                                {option}
                                            </span>

                                        </label>
                                    );
                                })}

                                {/* Selected answer indicator */}
                                {answers[question.$id] !== undefined && (
                                    <p className="text-xs text-green-400 mt-2">
                                        ✅ Option {["A","B","C","D"][Number(answers[question.$id])]} selected
                                    </p>
                                )}
                            </div>

                        ) : (

                            // ── Theory Textarea ──
                            <div className="relative h-full">
                                <textarea
                                    rows="10"
                                    value={currentAnswer}
                                    onChange={(e) =>
                                        setAnswers((prev) => ({
                                            ...prev,
                                            [question.$id]: e.target.value,
                                        }))
                                    }
                                    placeholder="Write your answer here, or use the voice recorder →"
                                    className="w-full min-h-[220px] rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none resize-none focus:border-blue-500 transition text-sm leading-relaxed"
                                />
                                <span className="absolute bottom-3 right-3 text-xs text-slate-500">
                                    {currentAnswer.length} chars
                                </span>
                            </div>

                        )}

                    </div>

                    {/* ── Prev / Next / Submit ── */}
                    <div className="mt-5 flex justify-between">

                        <button
                            disabled={currentQuestion === 0}
                            onClick={() => goToQuestion(currentQuestion - 1)}
                            className="rounded-lg bg-slate-700 px-6 py-2.5 text-sm font-semibold disabled:opacity-40 hover:bg-slate-600 transition"
                        >
                            ← Previous
                        </button>

                        {currentQuestion === questions.length - 1 ? (
                            <button
                                onClick={handleSubmitInterview}
                                disabled={submitting}
                                className="rounded-lg bg-green-600 px-8 py-2.5 text-sm font-semibold disabled:opacity-50 hover:bg-green-700 transition"
                            >
                                {submitting ? "⏳ Evaluating..." : "✅ Submit Interview"}
                            </button>
                        ) : (
                            <button
                                onClick={() => goToQuestion(currentQuestion + 1)}
                                className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold hover:bg-blue-700 transition"
                            >
                                Next →
                            </button>
                        )}

                    </div>

                </div>

                {/* ── Col 3: Webcam + Voice ── */}
                <div className="flex flex-col gap-4">

                    <div className="rounded-2xl bg-slate-900 p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Camera
                        </p>
                        <WebcamBox />
                    </div>

                    {/* Only show voice recorder for theory questions */}
                    {!isMCQ && (
                        <div className="rounded-2xl bg-slate-900 p-4">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Voice Answer
                            </p>
                            <VoiceRecorder
                                onTranscript={(text) =>
                                    setAnswers((prev) => ({
                                        ...prev,
                                        [question.$id]: text,
                                    }))
                                }
                            />
                        </div>
                    )}

                </div>

            </div>

        </div>
    );

};

export default Interview;