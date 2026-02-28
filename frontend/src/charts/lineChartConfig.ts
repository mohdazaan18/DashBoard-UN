import Highcharts from "highcharts";

export const buildLineChartConfig = (
  years: number[],
  series: { name: string; data: number[] }[]
): Highcharts.Options => {
  return {
    chart: {
      type: "line",
      backgroundColor: "#1e293b",
    },
    title: {
      text: "Population Growth Trend",
      style: { color: "#e2e8f0" },
    },
    xAxis: {
      categories: years.map(String),
      labels: { style: { color: "#e2e8f0" } },
    },
    yAxis: {
      title: { text: "Population" },
      labels: { style: { color: "#e2e8f0" } },
    },
    series: series as Highcharts.SeriesOptionsType[],
  };
};