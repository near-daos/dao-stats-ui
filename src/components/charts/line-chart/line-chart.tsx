import React, { useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

import { CustomLegend } from '../custom-legend';
import { ChartTooltip } from '../chart-tooltip';
import { COLORS, tickStyles } from '../constants';
import { filterDataByRange, yTickFormatter } from '../helpers';

type LineChartProps = {
  width?: number;
  height?: number;
  data: any;
};

export const ChartLine: React.FC<LineChartProps> = ({
  data,
  width = 685,
  height = 500,
}) => {
  const [period, setPeriod] = useState('1y');

  const rechartsData = filterDataByRange(period, data);
  const lines = Object.keys(rechartsData[0]).filter(
    (el) => el !== 'name' && el !== 'id',
  );
  const [activeLines, setActiveLines] = useState<string[]>(lines);

  const renderActiveDot = ({
    cx,
    cy,
    fill,
  }: {
    cx: number;
    cy: number;
    fill: string;
  }) => (
    <g>
      <line
        x1={65}
        y1={cy}
        x2={width}
        y2={cy}
        stroke="#686767"
        strokeWidth="0.5"
        strokeDasharray="5,5"
      />
      <circle
        cx={cx}
        cy={cy}
        r={4}
        strokeWidth={8}
        fill={fill}
        stroke={fill}
        strokeOpacity={0.5}
      />
    </g>
  );

  return (
    <LineChart width={width} height={height} data={rechartsData}>
      <CartesianGrid stroke="#393838" vertical={false} />
      <Legend
        align="left"
        verticalAlign="top"
        height={50}
        iconType="circle"
        content={
          <CustomLegend
            period={period}
            setPeriod={setPeriod}
            onFilterSelect={(active) => setActiveLines(active)}
          />
        }
      />
      <XAxis
        stroke="#393838"
        tickMargin={12}
        tickLine={false}
        dataKey="name"
        style={tickStyles}
      />
      <YAxis
        stroke="#393838"
        tickFormatter={yTickFormatter}
        tickMargin={1} // base margin is 5px, added 1px by according to design
        style={tickStyles}
        tickLine={false}
      />
      {lines.map((line, lineIndex) => (
        <Line
          strokeWidth={2}
          dot={false}
          dataKey={line}
          stroke={
            activeLines.includes(line) ? COLORS[lineIndex] : 'transparent'
          }
          key={line}
          activeDot={renderActiveDot}
        />
      ))}
      <Tooltip
        content={ChartTooltip}
        cursor={{
          stroke: '#686767',
          strokeWidth: '0.5',
          strokeDasharray: '5,5',
        }}
      />
    </LineChart>
  );
};

export default ChartLine;
