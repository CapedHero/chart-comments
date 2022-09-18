interface Chart {
  id: string;
  dataPoints: Array<ChartDataPoint>;
}

interface ChartDataPoint {
  x: string;
  y: number;
  comments: Array<ChartComment>;
}

interface ChartComment {
  author: string;
  id: string;
  text: string;
}

export { type Chart, type ChartComment, type ChartDataPoint };
