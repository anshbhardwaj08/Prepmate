import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

import databaseService from "../../appwrite/database";
import RecentUsers from "../../components/admin/RecentUsers";
import TopPerformers from "../../components/admin/TopPerformers";

const COLORS = ["#378ADD", "#1D9E75", "#7F77DD", "#E9A920"];

const STAT_CARDS = [
    { key: "users",      label: "Users",      accent: "bg-blue-500" },
    { key: "categories", label: "Categories", accent: "bg-purple-500" },
    { key: "questions",  label: "Questions",  accent: "bg-amber-500" },
    { key: "interviews", label: "Interviews", accent: "bg-teal-500" },
    { key: "average",    label: "Avg score",  accent: "bg-emerald-500", suffix: "%" },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm shadow-lg">
                <p className="text-slate-400">Interview {label}</p>
                <p className="font-medium text-white">{payload[0].value}%</p>
            </div>
        );
    }
    return null;
};

const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm shadow-lg">
                <p className="text-slate-400">{payload[0].name}</p>
                <p className="font-medium text-white">{payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const Dashboard = () => {

    const [stats, setStats] = useState({
        users: 0,
        categories: 0,
        questions: 0,
        interviews: 0,
        average: 0,
    });

    const [results, setResults] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const load = async () => {

            const [
                users,
                categories,
                questions,
                interviews,
                average,
                allResults,
            ] = await Promise.all([
                databaseService.getUsers(),
                databaseService.getTotalCategories(),
                databaseService.getTotalQuestions(),
                databaseService.getTotalResults(),
                databaseService.getAverageScore(),
                databaseService.getResults(),
            ]);

            setStats({
                users: users.length,
                categories,
                questions,
                interviews,
                average,
            });
            setUsers(users);
            setResults(allResults);
        };

        load();

    }, []);

    const pieData = [
        { name: "Interviews", value: stats.interviews },
        { name: "Users",      value: stats.users },
        { name: "Questions",  value: stats.questions },
        { name: "Categories", value: stats.categories },
    ];

    const lineData = results.map((item, index) => ({
        interview: index + 1,
        score: Number(item.score),
    }));

    return (

        <div className="min-h-screen bg-slate-950 p-8 text-white">

            {/* Header */}
            <div className="mb-10">
                <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                    Overview
                </p>
                <h1 className="text-3xl font-medium text-white">
                    Admin dashboard
                </h1>
            </div>

            {/* Stat cards */}
            <div className="mb-8 grid gap-4 md:grid-cols-5">
                {STAT_CARDS.map(({ key, label, accent, suffix }) => (
                    <Card
                        key={key}
                        title={label}
                        value={
                            key === "average"
                                ? `${stats[key]}${suffix}`
                                : stats[key].toLocaleString()
                        }
                        accentClass={accent}
                    />
                ))}
            </div>

            {/* Charts */}
            <div className="mb-8 grid gap-6 lg:grid-cols-2">

                {/* Line chart */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                        Performance
                    </p>
                    <h2 className="mb-6 text-lg font-medium text-white">
                        Interview scores
                    </h2>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={lineData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                            <defs>
                                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%"  stopColor="#378ADD" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#378ADD" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="4 4"
                                stroke="#1e293b"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="interview"
                                tick={{ fill: "#64748b", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#64748b", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                domain={[0, 100]}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#378ADD"
                                strokeWidth={2.5}
                                fill="url(#scoreGradient)"
                                dot={{ fill: "#378ADD", r: 3, strokeWidth: 0 }}
                                activeDot={{ r: 5, fill: "#378ADD", strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">
                        Distribution
                    </p>
                    <h2 className="mb-6 text-lg font-medium text-white">
                        Platform overview
                    </h2>
                    <div className="flex items-center gap-8">
                        <ResponsiveContainer width={180} height={180}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={55}
                                    outerRadius={85}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {pieData.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="flex flex-col gap-3">
                            {pieData.map((item, index) => (
                                <div key={item.name} className="flex items-center gap-3">
                                    <span
                                        className="h-2 w-2 shrink-0 rounded-full"
                                        style={{ backgroundColor: COLORS[index] }}
                                    />
                                    <span className="text-sm text-slate-400">{item.name}</span>
                                    <span className="ml-auto pl-4 text-sm font-medium text-white">
                                        {item.value.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom tables */}
            <div className="grid gap-6 lg:grid-cols-2">
                <RecentUsers users={users} />
                <TopPerformers results={results} />
            </div>

        </div>

    );

};

const Card = ({ title, value, accentClass }) => (

    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-widest text-slate-500">
            {title}
        </p>
        <h2 className="mt-3 text-3xl font-medium text-white">
            {value}
        </h2>
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${accentClass}`} />
    </div>

);

export default Dashboard;