import * as d3 from "d3";
import { ScaleBand, ScaleLinear } from "d3";

import { CHART_SIZES } from "./chart_sizes";
import { AxisXValues, AxisYValues } from "./types";

function createAxisXScale(
  axisXValues: AxisXValues,
  chartSizes: typeof CHART_SIZES
): ScaleBand<string> {
  const domain = axisXValues;
  const range = [
    chartSizes.marginLeft, // X Axis Start
    chartSizes.width - chartSizes.marginRight, // X Axis End
  ];
  const barsPaddingPct = 0.5;
  return d3.scaleBand(domain, range).padding(barsPaddingPct);
}

function createAxisYScale(
  axisYValues: AxisYValues,
  chartSizes: typeof CHART_SIZES
): ScaleLinear<number, number> {
  const domain = [0, Math.max(...axisYValues)];
  const range = [
    chartSizes.height - chartSizes.marginBottom, // Y Axis Bottom
    chartSizes.marginTop, // Y Axis Top
  ];
  return d3.scaleLinear(domain, range);
}

export { createAxisXScale, createAxisYScale };
