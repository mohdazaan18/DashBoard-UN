import Highcharts from "highcharts";

export const buildBarChartConfig = (
  series: { name: string; data: number[] }[],
  latestYear: number
): Highcharts.Options => {
  return {
    chart: {
      type: "column",
      backgroundColor: "#1e293b",
    },
    title: {
      text: `Population Comparison (${latestYear})`,
      style: { color: "#e2e8f0" },
    },
    xAxis: {
      categories: series.map((s) => s.name),
      labels: { style: { color: "#e2e8f0" } },
    },
    yAxis: {
      title: { text: "Population" },
      labels: { style: { color: "#e2e8f0" } },
    },
    series: [
      {
        name: "Population",
        type: "column",
        data: series.map((s) => s.data[s.data.length - 1]),
      },
    ],
  };
};