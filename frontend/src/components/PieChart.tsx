import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { PopulationResponse } from "../types/population.types";

type Props = {
    data: PopulationResponse;
};

export const PieChart = ({ data }: Props) => {
    const options: Highcharts.Options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            style: { fontFamily: "inherit" },
        },
        title: {
            text: "Top Countries Ratio",
            style: { color: "#f8fafc", fontSize: "18px", fontWeight: "700" },
            align: "left",
            margin: 30
        },
        tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderColor: "#334155",
            borderRadius: 12,
            style: { color: "#f8fafc" },
            headerFormat: "",
            pointFormat: '<span style="color:{point.color}; font-size: 16px;">\u25CF</span> <b>{point.name}</b><br/><span style="color:#cbd5e1">Population:</span> <b>{point.y}</b><br/><span style="color:#cbd5e1">Share:</span> <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br/>{point.percentage:.1f} %',
                    style: {
                        color: "#e2e8f0",
                        fontSize: "12px",
                        fontWeight: "600",
                        textOutline: "none" // removes the default white stroke
                    },
                    connectorColor: "#475569"
                },
                borderColor: "transparent", // remove white border
                borderWidth: 0,
                states: {
                    hover: {
                        halo: {
                            size: 9,
                            attributes: {
                                fill: 'rgba(255, 255, 255, 0.1)'
                            }
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
            innerSize: '65%', // High-end donut chart look
            data: data.series.map(s => ({
                name: s.name,
                y: s.data[s.data.length - 1]
            }))
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};