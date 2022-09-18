import { ScaleBand, ScaleLinear } from "d3";
import { ChartDataPoint } from "domain/types";

interface CommentsCounterProps {
  axisXScale: ScaleBand<string>;
  axisYScale: ScaleLinear<number, number>;
  dataPoint: ChartDataPoint;
}

function CommentsCounter(props: CommentsCounterProps) {
  const { axisXScale, axisYScale, dataPoint } = props;

  if (dataPoint.comments.length === 0) {
    return null;
  } else {
    return (
      <g>
        <circle
          cx={axisXScale(dataPoint.x)! + axisXScale.bandwidth() - 3}
          cy={axisYScale(dataPoint.y) + 3}
          r="10"
        />
        <text
          x={axisXScale(dataPoint.x)! + axisXScale.bandwidth() - 3}
          y={axisYScale(dataPoint.y) + 3}
          className="fill-white text-xs"
          textAnchor="middle"
          dy="0.35em"
        >
          {dataPoint.comments.length}
        </text>
      </g>
    );
  }
}

export default CommentsCounter;
