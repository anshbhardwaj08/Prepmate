import { useEffect, useState } from "react";
import databaseService from "../../appwrite/database";
import QuestionForm from "../../components/admin/QuestionForm";
import QuestionCard from "../../components/admin/QuestionCard";

const Questions = () => {

  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

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
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  // Group questions by categoryId
  const questionsByCategory = categories.map((category) => ({
    ...category,
    questions: questions.filter((q) => q.categoryId === category.$id),
  }));

  // Uncategorized questions (no matching category)
  const uncategorized = questions.filter(
    (q) => !categories.find((c) => c.$id === q.categoryId)
  );

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <h1 className="mb-8 text-4xl font-bold text-white">Questions</h1>

      {/* Question Form */}
      <QuestionForm
        onSubmit={selectedQuestion ? updateQuestion : addQuestion}
        defaultValues={selectedQuestion || {}}
        buttonText={selectedQuestion ? "Update Question" : "Add Question"}
      />

      {/* Questions grouped by category */}
      <div className="mt-10 space-y-6">

        {questionsByCategory.map((category) => (

          <div
            key={category.$id}
            className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
          >

            {/* Category Header — click to expand/collapse */}
            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.$id ? null : category.$id
                )
              }
              className="w-full flex items-center justify-between p-5 hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">

                {/* Category icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 font-bold text-lg">
                  {category.name?.charAt(0).toUpperCase()}
                </div>

                <div className="text-left">
                  <h2 className="text-lg font-bold text-white">
                    {category.name}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {category.questions.length} question{category.questions.length !== 1 ? "s" : ""}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                {/* Question count badge */}
                <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-400">
                  {category.questions.length}
                </span>

                {/* Expand arrow */}
                <span className={`text-slate-400 transition-transform duration-200 ${
                  expandedCategory === category.$id ? "rotate-180" : ""
                }`}>
                  ▼
                </span>

              </div>

            </button>

            {/* Questions list — shown when expanded */}
            {expandedCategory === category.$id && (

              <div className="border-t border-slate-800 p-5">

                {category.questions.length === 0 ? (

                  <div className="py-8 text-center text-slate-500">
                    <p className="text-3xl mb-2">📭</p>
                    <p className="text-sm">No questions in this category yet.</p>
                    <p className="text-xs mt-1">Add a question above and select "{category.name}"</p>
                  </div>

                ) : (

                  <div className="grid gap-4 lg:grid-cols-2">
                    {category.questions.map((question) => (
                      <QuestionCard
                        key={question.$id}
                        question={question}
                        onEdit={(q) => {
                          setSelectedQuestion(q);
                          // Scroll to form
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        onDelete={deleteQuestion}
                      />
                    ))}
                  </div>

                )}

              </div>

            )}

          </div>

        ))}

        {/* Uncategorized questions */}
        {uncategorized.length > 0 && (

          <div className="rounded-2xl bg-slate-900 border border-yellow-600/30 overflow-hidden">

            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === "uncategorized" ? null : "uncategorized"
                )
              }
              className="w-full flex items-center justify-between p-5 hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-600/20 text-yellow-400 font-bold text-lg">
                  ?
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-white">Uncategorized</h2>
                  <p className="text-xs text-slate-400">{uncategorized.length} question(s)</p>
                </div>
              </div>
              <span className={`text-slate-400 transition-transform duration-200 ${
                expandedCategory === "uncategorized" ? "rotate-180" : ""
              }`}>▼</span>
            </button>

            {expandedCategory === "uncategorized" && (
              <div className="border-t border-slate-800 p-5 grid gap-4 lg:grid-cols-2">
                {uncategorized.map((question) => (
                  <QuestionCard
                    key={question.$id}
                    question={question}
                    onEdit={setSelectedQuestion}
                    onDelete={deleteQuestion}
                  />
                ))}
              </div>
            )}

          </div>

        )}

        {/* Empty state */}
        {questions.length === 0 && (
          <div className="rounded-2xl bg-slate-900 p-12 text-center text-slate-400">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-xl font-bold text-white">No questions yet</p>
            <p className="mt-2 text-sm">Add your first question using the form above.</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Questions;