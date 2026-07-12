import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const PerformanceChart = ({ results }) => {

    const data = {
        labels: results.map((_, index) => `#${index + 1}`),

        datasets: [
            {
                label: "Interview Score",

                data: results.map((r) => r.score),

                borderColor: "#3b82f6",

                backgroundColor: "#3b82f6",

                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: "white",
                },
            },

            y: {
                beginAtZero: true,

                max: 100,

                ticks: {
                    color: "white",
                },
            },
        },
    };

    return (
        <div className="mt-12 rounded-2xl bg-slate-900 p-8">
            <h2 className="mb-6 text-2xl font-bold">
                Performance Trend
            </h2>

            <Line
                data={data}
                options={options}
            />
        </div>
    );
};

export default PerformanceChart;