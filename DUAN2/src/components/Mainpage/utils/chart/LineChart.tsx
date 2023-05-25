import React from "react";
import "./chart.css";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
);

const lineChar: React.FC = () => {
    const data = {
        labels: [
            "",
            "Thứ 2",
            "",
            "Thứ 3",
            "",
            "Thứ 4",
            "",
            "Thứ 5",
            "",
            "Thứ 6",
            "",
            "Thứ 7",
            "",
            "CN",
            "",
        ],
        datasets: [
            {
                label: "",
                data: [
                    140,
                    180,
                    140,
                    150,
                    200,
                    230,
                    220,
                    200,
                    250,
                    230,
                    230,
                    230,
                    220,
                    230,
                    230,
                    { min: 100, max: 260 },
                ],
                backgroundColor: "transparent",
                background: "#FF8A48",
                borderColor: "rgba(255, 138, 72, 1)",
                pointBorderColor: "transparent",
                // pointBorderWidth: 20,
                tension: 0.4,
                fill: {
                    target: "origin",
                    above: "rgba(250, 160, 95, 0.26)",
                },
                fontFamily: "Montserrat",
                fontSize: "14px",
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                backgroundColor: "#FF8A48",
            },
        },
        scales: {
            // x: {
            //     title: {
            //         display: true,
            //         text: "Month",
            //     },
            // },
            y: {
                // beginAtZero: true,
                suggestedMin: 100,
            },
        },
        interaction: {
            intersect: false,
        },
    };

    return <Line data={data} options={options} className="ChartLine" key={1} />;
};

export default lineChar;
