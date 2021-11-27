import React from 'react';
import { LineChart, Line } from 'recharts';

export type LineChartItem = {
  name: string;
  'Total In': number;
};

export type LineChartProps = {
  data: LineChartItem[];
  negativeGrowth?: boolean;
  width?: number;
  height?: number;
  rightAlign?: boolean;
};

export const ChartTiny: React.FC<LineChartProps> = ({
  data,
  negativeGrowth,
  width = 156,
  height = 44,
  rightAlign,
}) => (
  <LineChart
    width={width}
    height={height}
    data={data}
    style={{ marginLeft: rightAlign ? 'auto' : 0 }}
  >
    <Line
      dot={false}
      dataKey="Total In"
      stroke={negativeGrowth ? '#FF3333' : '#61FF00'}
      key="Total In"
    />
  </LineChart>
);

export default ChartTiny;
