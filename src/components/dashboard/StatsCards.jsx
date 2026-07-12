const Card = ({ title, value, color }) => (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
        <p className="text-slate-400">{title}</p>

        <h2 className={`mt-3 text-4xl font-bold ${color}`}>
            {value}
        </h2>
    </div>
);

const StatsCards = ({
    interviews,
    average,
    best,
    categories,
}) => {
    return (
        <div className="grid gap-6 md:grid-cols-4">
            <Card
                title="Interviews"
                value={interviews}
                color="text-blue-400"
            />

            <Card
                title="Average Score"
                value={average}
                color="text-green-400"
            />

            <Card
                title="Best Score"
                value={best}
                color="text-yellow-400"
            />

            <Card
                title="Categories"
                value={categories}
                color="text-purple-400"
            />
        </div>
    );
};

export default StatsCards;