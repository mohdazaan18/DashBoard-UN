import { useEffect, useState } from "react";
import { fetchPopulationData } from "../services/api";
import { buildLineChartConfig } from "../charts/lineChartConfig";
import { buildBarChartConfig } from "../charts/barChartConfig";
import ChartCard from "./ChartCard";

interface ApiResponse {
  years: number[];
  series: { name: string; data: number[] }[];
}

const Dashboard = () => {
  const [group, setGroup] = useState("ASEAN");
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetchPopulationData(group).then(setData);
  }, [group]);

  if (!data) return <div>Loading...</div>;

  const lineOptions = buildLineChartConfig(data.years, data.series);

  const latestYear = data.years[data.years.length - 1];

  const barOptions = buildBarChartConfig(data.series, latestYear);

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setGroup("ASEAN")}
          className={`px-4 py-2 rounded ${
            group === "ASEAN" ? "bg-sky-500" : "bg-slate-700"
          }`}
        >
          ASEAN
        </button>
        <button
          onClick={() => setGroup("SAARC")}
          className={`px-4 py-2 rounded ${
            group === "SAARC" ? "bg-sky-500" : "bg-slate-700"
          }`}
        >
          SAARC
        </button>
      </div>

      <ChartCard options={lineOptions} />
      <ChartCard options={barOptions} />
    </div>
  );
};

export default Dashboard;