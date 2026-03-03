import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { PopulationResponse } from "../types/population.types";
import { formatPopulation } from "../utils/formatPopulation";

type Props = {
    data: PopulationResponse;
};

export const MiniGaugeChart = ({ data }: Props) => {
    // Calculate Top 1 Dominance
    if (!data.series || data.series.length === 0) return null;

    const sortedData = [...data.series].sort(
        (a, b) => b.data[b.data.length - 1] - a.data[a.data.length - 1]
    );

    const top1 = sortedData[0];
    const topValue = top1.data[top1.data.length - 1];

    let othersValue = 0;
    for (let i = 1; i < sortedData.length; i++) {
        othersValue += sortedData[i].data[sortedData[i].data.length - 1];
    }

    const total = topValue + othersValue;
    const percentage = ((topValue / total) * 100).toFixed(1);

    const options: Highcharts.Options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            style: { fontFamily: "inherit" },
            height: "100%",
            spacing: [10, 10, 10, 10],
        },
        title: {
            text: "Top 1 Dominance",
            style: { color: "#94a3b8", fontSize: "12px", fontWeight: "600", letterSpacing: "0.5px" },
            align: "center",
            y: 15
        },
        subtitle: {
            text: `<div style="text-align:center"><span style="font-size:24px; color:#f8fafc; font-weight:bold">${percentage}%</span><br><span style="font-size:10px; color:#64748b">${top1.name}</span></div>`,
            align: 'center',
            verticalAlign: 'bottom',
            y: -10,
            useHTML: true
        },
        tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            borderColor: "#334155",
            borderRadius: 12,
            style: { color: "#f8fafc" },
            formatter: function () {
                return `<b style="font-size:13px">${this.key}</b><br/>` +
                    `<span style="color:#cbd5e1">Population:</span> <b style="font-size: 14px;">${formatPopulation(Number(this.y))}</b>`;
            }
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '85%'],
                size: '150%',
                innerSize: '75%',
                dataLabels: {
                    enabled: false
                },
                borderWidth: 0,
                states: {
                    hover: { halo: { size: 0 } }
                }
            }
        },
        colors: ["#8b5cf6", "#1e293b"], // Purple for Top 1, dark slate for Others
        credits: { enabled: false },
        series: [{
            name: "Dominance",
            type: "pie",
            data: [
                { name: top1.name, y: topValue },
                { name: "Others", y: othersValue }
            ]
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
