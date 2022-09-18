import * as d3 from "d3";
import { ScaleBand } from "d3";
import { useEffect, useRef } from "react";

import { CHART_SIZES } from "../chart_sizes";

interface AxisXProps {
  axisXScale: ScaleBand<string>;
  chartSizes: typeof CHART_SIZES;
}

function AxisX(props: AxisXProps) {
  const { axisXScale, chartSizes } = props;

  const axisXEl = useRef(null);

  const axisGenerator = d3.axisBottom(axisXScale).tickSizeOuter(0);

  useEffect(() => {
    d3.select(axisXEl.current! as SVGGElement)
      .call(axisGenerator)
      .attr("font-size", "0.9rem"); // Override D3 default font size.
  }, []);

  return (
    <g ref={axisXEl} transform={`translate(0, ${chartSizes.height - chartSizes.marginBottom})`}>
      {/* D3 logic called in useEffect creates the actual innerHTML. */}
    </g>
  );
}

export default AxisX;
