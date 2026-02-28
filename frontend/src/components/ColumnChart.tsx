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
            marginTop: 60
        },
        title: {
            text: "Population Comparison",
            style: { color: "#f8fafc", fontSize: "18px", fontWeight: "700" },
            align: "left",
            margin: 30
        },
        xAxis: {
            categories: data.series.map(s => s.name),
            labels: {
                style: { color: "#94a3b8", fontWeight: "500", fontSize: "12px" },
                rotation: -45,
            },
            lineColor: "#334155",
            tickColor: "#334155",
        },
        yAxis: {
            title: { text: "Population", style: { color: "#64748b", fontWeight: "600" } },
            labels: {
                style: { color: "#94a3b8", fontWeight: "500" },
                formatter: function () {
                    return Number(this.value) >= 1000000
                        ? (Number(this.value) / 1000000).toString() + "M"
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
            pointFormat: '<span style="color:{point.color}; font-size: 16px;">\u25CF</span> {series.name}: <b style="font-size: 14px;">{point.y}</b> people'
        },
        plotOptions: {
            column: {
                borderRadius: 6,
                borderWidth: 0,
                colorByPoint: true,
                colors: [
                    "#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#f43f5e",
                    "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4"
                ]
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
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};