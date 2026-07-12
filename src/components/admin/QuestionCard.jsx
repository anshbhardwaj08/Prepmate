const QuestionCard = ({
  question,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-xl bg-slate-900 p-6 text-white">

      <h2 className="text-xl font-bold">
        {question.title}
      </h2>

      <p className="mt-2 text-slate-400">
        {question.description}
      </p>

      <div className="mt-4 space-y-1 text-sm text-slate-300">

        <p>
          <strong>Difficulty:</strong> {question.difficulty}
        </p>

        <p>
          <strong>Type:</strong> {question.type}
        </p>

      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-300">

    <p>
        <strong>Difficulty:</strong> {question.difficulty}
    </p>

    <p>
        <strong>Type:</strong> {question.type}
    </p>

</div>

{/* Show MCQ Options */}

{question.type === "mcq" && (

    <div className="mt-5 rounded-lg bg-slate-800 p-4">

        <h3 className="mb-3 font-semibold text-white">
            Options
        </h3>

        {question.options?.map((option, index) => (

            <p
                key={index}
                className="mb-2 text-slate-300"
            >
                <span className="font-semibold">
                    {String.fromCharCode(65 + index)}.
                </span>{" "}
                {option}
            </p>

        ))}

        <p className="mt-4 text-green-400">

            <strong>Correct:</strong>{" "}

            {String.fromCharCode(
                65 + Number(question.correctAnswer)
            )}

        </p>

    </div>

)}

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onEdit(question)}
          className="rounded bg-blue-600 px-4 py-2"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(question.$id)}
          className="rounded bg-red-600 px-4 py-2"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default QuestionCard;