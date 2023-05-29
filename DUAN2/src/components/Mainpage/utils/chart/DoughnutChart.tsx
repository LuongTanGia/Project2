import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./chart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ["", ""],
    datasets: [
        {
            label: "# of Votes",
            data: [45, 55],
            backgroundColor: ["rgba(79, 117, 255, 1)", "rgba(255, 138, 72, 1)"],
            borderColor: ["rgba(79, 117, 255, 1)", "rgba(255, 138, 72, 1)"],
            borderWidth: 1,
        },
    ],
};

export const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

function doughnut() {
    return (
        <>
            <div className="DougChartBox">
                <Doughnut data={data} options={options} className="DougChart" />
                <div className="DougChart_On">56024 </div>
                <div className="DougChart_Off">13568</div>
            </div>
        </>
    );
}
export default doughnut;
