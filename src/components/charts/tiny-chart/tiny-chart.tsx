import React from 'react';
import { LineChart, Line } from 'recharts';
import { LeaderboarDataItem } from '../../leaderboard/leaderboardData';

type LineChartProps = {
  data: LeaderboarDataItem[];
  negativeGrowth?: boolean;
  width?: number;
  height?: number;
};

export const ChartTiny: React.FC<LineChartProps> = ({
  data,
  negativeGrowth,
  width = 156,
  height = 44,
}) => (
  <LineChart
    width={width}
    height={height}
    data={data}
    style={{ marginLeft: 'auto' }}
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
