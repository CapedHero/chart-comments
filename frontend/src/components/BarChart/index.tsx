import { Chart } from "domain/types";

import { createAxisXScale, createAxisYScale } from "./chart_scales";
import { CHART_SIZES } from "./chart_sizes";
import AxisX from "./subcomponents/AxisX";
import Bars from "./subcomponents/Bars";

interface BarChartProps {
  chart: Chart;
}

function BarChart(props: BarChartProps) {
  const { chart } = props;

  const axisXValues = chart.dataPoints.map((dataPoint) => dataPoint.x);
  const axisYValues = chart.dataPoints.map((dataPoint) => dataPoint.y);

  const axisXScale = createAxisXScale(axisXValues, CHART_SIZES);
  const axisYScale = createAxisYScale(axisYValues, CHART_SIZES);

  return (
    <svg
      className="rounded-lg bg-slate-200"
      viewBox={`0 0 ${CHART_SIZES.width} ${CHART_SIZES.height}`}
    >
      <AxisX axisXScale={axisXScale} chartSizes={CHART_SIZES} />
      <Bars axisXScale={axisXScale} axisYScale={axisYScale} chart={chart} />
    </svg>
  );
}

export default BarChart;
