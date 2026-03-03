import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { PopulationResponse } from "../types/population.types";
import { formatPopulation, formatExactPopulation } from "../utils/formatPopulation";

type Props = {
    data: PopulationResponse;
};

export const PieChart = ({ data }: Props) => {
    const options: Highcharts.Options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            style: { fontFamily: "inherit" },
            height: "100%",
            spacing: [10, 10, 10, 10], // top, right, bottom, left
        },
        title: {
            text: "Top Countries Ratio",
            style: { color: "#f8fafc", fontSize: "15px", fontWeight: "700", letterSpacing: "0.5px" },
            align: "center",
            margin: 10,
            y: 20
        },
        tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderColor: "#334155",
            borderRadius: 12,
            style: { color: "#f8fafc" },
            headerFormat: "",
            useHTML: true,
            formatter: function () {
                const raw = Number(this.y);
                return `<span style="color:${this.color}; font-size: 16px;">\u25CF</span> <b>${this.key}</b><br/>` +
                    `<span style="color:#cbd5e1">Population:</span> <b style="font-size: 14px;">${formatPopulation(raw)}</b> ` +
                    `<span style="color:#64748b; font-size: 11px;">(${formatExactPopulation(raw)})</span><br/>` +
                    `<span style="color:#cbd5e1">Share:</span> <b>${this.percentage?.toFixed(1)}%</b>`;
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                shadow: false, // removed glitchy shadow effect
                center: ['50%', '50%'],
                size: '80%',
                dataLabels: {
                    enabled: true,
                    distance: 10,
                    formatter: function () {
                        return `<b>${this.key}</b><br/>${formatPopulation(Number(this.y))} (${this.percentage?.toFixed(1)}%)`;
                    },
                    style: {
                        color: "#f1f5f9",
                        fontSize: "10px",
                        fontWeight: "600",
                        textOutline: "none",
                        letterSpacing: "0.2px"
                    },
                    connectorColor: "#64748b",
                    connectorWidth: 1
                },
                borderColor: "#0f172a", // add dark borders between slices to match bg
                borderWidth: 2,
                states: {
                    hover: {
                        halo: {
                            size: 10,
                            attributes: { fill: 'rgba(255, 255, 255, 0.15)' }
                        }
                    }
                }
            }
        },
        colors: [
            "#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e",
            "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4"
        ],
        credits: { enabled: false },
        series: [{
            name: "Population",
            type: "pie",
            innerSize: '50%',
            size: '75%', // Shrink slightly to avoid label clipping again
            center: ['50%', '50%'], // Reset center now that MiniGauge takes the bottom space
            data: data.series.map(s => ({
                name: s.name,
                y: s.data[s.data.length - 1]
            }))
        }]
    };

    return (
        <div className="absolute inset-x-2 inset-y-2 flex items-center justify-center">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: "100%", width: "100%" } }}
            />
        </div>
    );
};