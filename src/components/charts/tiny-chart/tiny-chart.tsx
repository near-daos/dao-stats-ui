import React from 'react';
import { LineChart, Line } from 'recharts';

import { MetricItem } from 'src/api';

export type LineChartProps = {
  data: MetricItem[];
  width?: number;
  height?: number;
  rightAlign?: boolean;
  growth?: number;
};

export const ChartTiny: React.FC<LineChartProps> = ({
  data,
  width = 156,
  height = 44,
  rightAlign,
  growth = 0,
}) => (
  <LineChart
    width={width}
    height={height}
    data={data}
    style={{ marginLeft: rightAlign ? 'auto' : 0 }}
  >
    <Line
      isAnimationActive={false} // low perfomanse because of animation
      dot={false}
      dataKey="count"
      stroke={growth < 0 ? '#FF3333' : '#61FF00'}
      key="count"
    />
  </LineChart>
);

export default ChartTiny;
