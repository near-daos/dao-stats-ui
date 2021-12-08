import React from 'react';
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
import { tickStyles } from '../constants';
import { Metrics } from '../../../api';
import {
  getYTicks,
  getYDomain,
  tickXFormatter,
  getXInterval,
} from '../helpers';

type LineItem = {
  name: string;
  color: string;
  dataKey: string;
};

type LineChartProps = {
  width?: number;
  height?: number;
  lines?: LineItem[];
  data: Metrics | null;
  period: string;
  setPeriod: (period: string) => void;
};

export const ChartLine: React.FC<LineChartProps> = ({
  lines = [],
  data = { metrics: [] },
  width = 685,
  height = 500,
  period,
  setPeriod,
}) => {
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
    <LineChart width={width} height={height} data={data?.metrics as any}>
      <CartesianGrid stroke="#393838" vertical={false} />
      <Legend
        align="left"
        verticalAlign="top"
        height={50}
        iconType="circle"
        content={
          <CustomLegend
            lines={lines.map((line) => line.name)}
            period={period}
            setPeriod={(periodType) => setPeriod(periodType)}
          />
        }
      />
      <YAxis
        type="number"
        stroke="#393838"
        dataKey="count"
        tickMargin={1}
        interval={0}
        tickLine={false}
        style={tickStyles}
        ticks={getYTicks(data?.metrics || [])}
        domain={getYDomain(data?.metrics || [])}
      />
      <XAxis
        interval={getXInterval(data?.metrics || [], period)}
        stroke="#393838"
        dataKey="timestamp"
        tickMargin={12}
        tickCount={6}
        tickLine={false}
        tickFormatter={(value) => tickXFormatter(value, period)}
        style={tickStyles}
      />
      {lines.map((line) => (
        <Line
          strokeWidth={2}
          dot={false}
          dataKey={line.dataKey}
          stroke={line.color}
          key={line.name}
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
