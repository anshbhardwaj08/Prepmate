const ProgressCard = ({ results }) => {

    const average =
        results.length
            ? Math.round(
                results.reduce((a, b) => a + b.score, 0) /
                results.length
            )
            : 0;

    return (

        <div className="mt-10 rounded-2xl bg-slate-900 p-8">

            <h2 className="text-2xl font-bold">
                AI Recommendation
            </h2>

            <p className="mt-4 text-slate-300 leading-8">

                {
                    average >= 90
                        ? "Excellent! You're interview-ready. Keep practicing to stay sharp."
                        : average >= 75
                        ? "You're doing well. Focus on technical depth and confidence."
                        : average >= 60
                        ? "Practice consistently. Review concepts and improve communication."
                        : "You're just getting started. Keep practicing and you'll improve quickly."
                }

            </p>

        </div>

    );

};

export default ProgressCard;