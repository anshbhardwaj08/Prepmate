const Achievements = ({ results }) => {

    const achievements = [];

    if (results.length >= 1)
        achievements.push({
            title: "First Interview",
            icon: "🎯",
            color: "from-blue-500 to-cyan-500",
        });

    if (results.length >= 5)
        achievements.push({
            title: "Consistency",
            icon: "🔥",
            color: "from-orange-500 to-red-500",
        });

    if (results.some(r => r.score >= 90))
        achievements.push({
            title: "90+ Club",
            icon: "⭐",
            color: "from-yellow-500 to-orange-500",
        });

    if (results.some(r => r.communication >= 95))
        achievements.push({
            title: "Excellent Speaker",
            icon: "🎤",
            color: "from-purple-500 to-pink-500",
        });

    return (
        <div className="mt-12">

            <h2 className="mb-6 text-2xl font-bold">
                Achievements
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                {achievements.map((item, index) => (

                    <div
                        key={index}
                        className={`rounded-2xl bg-gradient-to-r ${item.color} p-6 shadow-xl`}
                    >

                        <div className="text-5xl">
                            {item.icon}
                        </div>

                        <h3 className="mt-5 text-xl font-bold">
                            {item.title}
                        </h3>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Achievements;