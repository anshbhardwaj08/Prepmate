import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import databaseService from "../../appwrite/database";
import { Button, Input } from "../common";

const QuestionForm = ({
    onSubmit,
    defaultValues = {},
    buttonText = "Add Question",
}) => {
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues });
    const questionType = watch("type");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await databaseService.getCategories();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        loadCategories();
    }, []);

    const isEditing = buttonText.toLowerCase().includes("update");

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

            {/* Form header */}
            <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                    isEditing ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"
                }`}>
                    {isEditing ? "✏️" : "➕"}
                </div>
                <div>
                    <h2 className="font-semibold text-white">
                        {isEditing ? "Edit question" : "Add a question"}
                    </h2>
                    <p className="text-xs text-slate-500">
                        {isEditing ? "Update the fields below and save" : "Fill in the details to create a new question"}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

                {/* Title + Description side by side on lg */}
                <div className="grid gap-5 lg:grid-cols-2">

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Question Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            placeholder="e.g. Explain Virtual DOM"
                            {...register("title", { required: true })}
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Description <span className="text-slate-600">(optional)</span>
                        </label>
                        <input
                            placeholder="Additional context or hints"
                            {...register("description")}
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                </div>

                {/* Category + Difficulty + Type */}
                <div className="grid gap-5 sm:grid-cols-3">

                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Category
                        </label>
                        <select
                            {...register("categoryId")}
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.$id} value={cat.$id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Difficulty
                        </label>
                        <select
                            {...register("difficulty")}
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    {/* Type */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Type
                        </label>
                        <select
                            {...register("type")}
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="descriptive">Descriptive</option>
                            <option value="mcq">MCQ</option>
                            <option value="coding">Coding</option>
                        </select>
                    </div>

                </div>

                {/* MCQ Options — shown only when type is mcq */}
                {questionType === "mcq" && (
                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-violet-400 text-sm">☑️</span>
                            <h3 className="text-sm font-semibold text-white">MCQ Options</h3>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {["A", "B", "C", "D"].map((label, index) => (
                                <div key={index} className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-slate-400">
                                        Option {label}
                                    </label>
                                    <input
                                        placeholder={`Option ${label}`}
                                        {...register(`options.${index}`, { required: true })}
                                        className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Correct Answer
                            </label>
                            <select
                                {...register("correctAnswer", { required: true })}
                                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20"
                            >
                                <option value="">Select correct option</option>
                                <option value="0">Option A</option>
                                <option value="1">Option B</option>
                                <option value="2">Option C</option>
                                <option value="3">Option D</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Expected answer for descriptive */}
                {questionType === "descriptive" && (
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Expected Answer <span className="text-slate-600">(optional)</span>
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Ideal answer for this question..."
                            {...register("expectedAnswer")}
                            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 resize-none"
                        />
                    </div>
                )}

                {/* Submit */}
                <div className="pt-1">
                    <button
                        type="submit"
                        className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition-all ${
                            isEditing
                                ? "bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-900/30"
                                : "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/30"
                        }`}
                    >
                        {buttonText}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default QuestionForm;