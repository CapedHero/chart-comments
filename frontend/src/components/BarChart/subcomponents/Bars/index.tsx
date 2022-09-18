import { commentsDrawerActions } from "components/CommentsDrawer/slice";
import { ScaleBand, ScaleLinear } from "d3";
import { Chart, ChartDataPoint } from "domain/types";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import Bar from "./subcomponents/Bar";
import CommentsCounter from "./subcomponents/CommentsCounter";

interface BarsProps {
  axisXScale: ScaleBand<string>;
  axisYScale: ScaleLinear<number, number>;
  chart: Chart;
}

function Bars(props: BarsProps) {
  const { axisXScale, axisYScale, chart } = props;

  const isCommentsDrawerShown = useAppSelector((state) => state.commentsDrawer.isShown);

  const [barsState, setBarsState] = useState(chart.dataPoints.map(() => ({ isActive: false })));

  useEffect(() => {
    if (!isCommentsDrawerShown) {
      setBarsState(chart.dataPoints.map(() => ({ isActive: false })));
    }
  }, [isCommentsDrawerShown]);

  const dispatch = useAppDispatch();

  const handleBarClick = useCallback(
    (barIndex: number, dataPoint: ChartDataPoint) => {
      const clickedBarState = barsState[barIndex];
      const newBarsState = barsState.map(() => ({ isActive: false }));

      if (clickedBarState.isActive) {
        newBarsState[barIndex].isActive = false;
        dispatch(commentsDrawerActions.hide());
        dispatch(commentsDrawerActions.setComments([]));
      } else {
        newBarsState[barIndex].isActive = true;
        dispatch(commentsDrawerActions.setDataPointLabel(dataPoint.x));
        dispatch(commentsDrawerActions.setComments(dataPoint.comments));
        dispatch(commentsDrawerActions.show());
      }

      setBarsState(newBarsState);
    },
    [barsState]
  );

  return (
    <g>
      {chart.dataPoints.map((dataPoint, barIndex) => (
        <g
          className="cursor-pointer"
          key={dataPoint.x}
          onClick={() => handleBarClick(barIndex, dataPoint)}
        >
          <Bar
            axisXScale={axisXScale}
            axisYScale={axisYScale}
            dataPoint={dataPoint}
            isActive={barsState[barIndex].isActive}
          />
          <CommentsCounter axisXScale={axisXScale} axisYScale={axisYScale} dataPoint={dataPoint} />
        </g>
      ))}
    </g>
  );
}

export default Bars;
