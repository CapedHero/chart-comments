import { ScaleBand, ScaleLinear } from "d3";
import { ChartDataPoint } from "domain/types";

interface BarProps {
  axisXScale: ScaleBand<string>;
  axisYScale: ScaleLinear<number, number>;
  dataPoint: ChartDataPoint;
  isActive: boolean;
}

function Bar(props: BarProps) {
  const { axisXScale, axisYScale, dataPoint, isActive } = props;

  return (
    <rect
      ry="5"
      className={isActive ? "fill-blue-600" : "fill-blue-400"}
      height={axisYScale(0) - axisYScale(dataPoint.y)}
      width={axisXScale.bandwidth()}
      x={axisXScale(dataPoint.x)}
      y={axisYScale(dataPoint.y)}
    />
  );
}

export default Bar;
