import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { PopulationResponse } from "../types/population.types";

type Props = {
    data: PopulationResponse;
};

export const ColumnChart = ({ data }: Props) => {
    const options: Highcharts.Options = {
        chart: {
            type: "column",
            backgroundColor: "transparent",
            style: { fontFamily: "inherit" },
            height: "100%",
            spacing: [30, 10, 60, 10], // top, right, bottom, left (massive bottom spacing)
        },
        title: {
            text: "Population Comparison",
            style: { color: "#f8fafc", fontSize: "15px", fontWeight: "700", letterSpacing: "0.5px" },
            align: "left",
            margin: 15,
            y: 10
        },
        xAxis: {
            categories: data.series.map(s => s.name),
            labels: {
                style: {
                    color: "#94a3b8",
                    fontWeight: "600",
                    fontSize: "10px",
                    textOverflow: "ellipsis"
                },
                rotation: -45,
                autoRotationLimit: 40,
                // Removed 'step: 1' so Highcharts can auto-hide overlapping labels intelligently
            },
            lineColor: "#334155",
            tickColor: "#334155",
        },
        yAxis: {
            title: { text: "Population", style: { color: "#64748b", fontWeight: "600", fontSize: "11px", letterSpacing: "0.5px" }, margin: 10 },
            labels: {
                style: { color: "#94a3b8", fontWeight: "600", fontSize: "10px" },
                formatter: function () {
                    return Number(this.value) >= 1000000
                        ? (Number(this.value) / 1000000).toFixed(1) + "M"
                        : Number(this.value) >= 1000
                            ? (Number(this.value) / 1000).toFixed(1) + "K"
                            : String(this.value);
                },
            },
            gridLineColor: "#1e293b",
            gridLineDashStyle: "Dash",
        },
        tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderColor: "#334155",
            borderRadius: 12,
            style: { color: "#f8fafc" },
            headerFormat: '<span style="font-size: 13px; font-weight: 600; color: #94a3b8; padding-bottom: 4px; display: block;">{point.key}</span>',
            formatter: function () {
                const val = Number(this.y);
                const formattedValue = val >= 1000000
                    ? (val / 1000000).toFixed(1) + "M"
                    : val >= 1000
                        ? (val / 1000).toFixed(1) + "K"
                        : String(val);

                return `<span style="font-size: 13px; font-weight: 600; color: #94a3b8; padding-bottom: 4px; display: block;">${this.key}</span>` +
                    `<span style="color:${this.color}; font-size: 16px;">\u25CF</span> <span style="color:#cbd5e1">Population:</span> ` +
                    `<b style="font-size: 14px;">${formattedValue}</b> ` +
                    `<span style="color:#64748b; font-size: 11px;">(${this.y?.toLocaleString()})</span>`;
            }
        },
        plotOptions: {
            column: {
                borderRadius: 4,
                borderWidth: 0,
                colorByPoint: true,
                colors: [
                    "#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e",
                    "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4"
                ],
                maxPointWidth: 50,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        const val = Number(this.y);
                        return val >= 1000000
                            ? (val / 1000000).toFixed(1) + "M"
                            : val >= 1000
                                ? (val / 1000).toFixed(1) + "K"
                                : String(val);
                    },
                    style: {
                        color: "#f1f5f9",
                        fontSize: "10px",
                        fontWeight: "600",
                        textOutline: "none",
                        letterSpacing: "0.2px"
                    },
                    verticalAlign: 'bottom',
                    y: -10 // shift label just above the column
                }
            },
        },
        legend: { enabled: false },
        credits: { enabled: false },
        series: [{
            name: "Population",
            type: "column",
            data: data.series.map(s => s.data[s.data.length - 1])
        }]
    };

    return (
        <div className="absolute inset-x-2 inset-y-2">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: "100%", width: "100%" } }}
            />
        </div>
    );
};