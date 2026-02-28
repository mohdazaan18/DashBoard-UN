import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartCardProps {
  options: Highcharts.Options;
}

const ChartCard = ({ options }: ChartCardProps) => {
  return (
    <div className="bg-slate-800 rounded-xl p-4 shadow-md">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartCard;