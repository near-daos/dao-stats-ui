import React from 'react';
import { LineChart, Line } from 'recharts';
import { LeaderboarDataItem } from '../../leaderboard/leaderboardData';

type LineChartProps = {
  data: LeaderboarDataItem[];
  negativeGrowth?: boolean;
};

export const ChartTiny: React.FC<LineChartProps> = ({
  data,
  negativeGrowth,
}) => (
  <LineChart width={156} height={44} data={data} style={{ marginLeft: 'auto' }}>
    <Line
      dot={false}
      dataKey="Total In"
      stroke={negativeGrowth ? '#FF3333' : '#61FF00'}
      key="Total In"
    />
  </LineChart>
);

export default ChartTiny;
