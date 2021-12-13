import React, { useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { CustomLegend } from 'src/components/charts/custom-legend';
import { ChartTooltip } from '../chart-tooltip';
import { tickStyles } from '../constants';
import { LineItem } from '../types';

import { tickXFormatter } from '../helpers';

type LineChartProps = {
  width?: number;
  lines?: LineItem[];
  data: any | null;
  period: string;
  setPeriod: (period: string) => void;
};

export const ChartLine: React.FC<LineChartProps> = ({
  lines = [],
  data = { metrics: [] },
  width = 685,
  period,
  setPeriod,
}) => {
  const [filterLines, setFilterLines] = useState(lines);

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
        x1={35}
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

  // waiting to fix bug - https://github.com/recharts/recharts/issues/2704
  React.useEffect(() => {
    // dispatch it once mounted
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <ResponsiveContainer>
      <LineChart data={data?.metrics}>
        <Legend
          align="left"
          verticalAlign="top"
          height={50}
          iconType="circle"
          content={
            <CustomLegend
              lines={lines}
              period={period}
              setPeriod={(periodType) => setPeriod(periodType)}
              onFilterSelect={(filteredNames) =>
                setFilterLines(
                  lines.filter((filterLine) =>
                    filteredNames.includes(filterLine.dataKey),
                  ),
                )
              }
            />
          }
        />
        <CartesianGrid stroke="#393838" vertical={false} />
        <YAxis
          type="number"
          stroke="#393838"
          tickMargin={1}
          interval={0}
          tickLine={false}
          style={tickStyles}
          width={30}
        />
        <XAxis
          stroke="#393838"
          dataKey="timestamp"
          tickMargin={12}
          tickCount={6}
          tickLine={false}
          tickFormatter={(value) => tickXFormatter(value, period)}
          style={tickStyles}
          minTickGap={15}
        />
        {filterLines.map((filterLine) => (
          <Line
            type="monotone"
            strokeWidth={2}
            dot={false}
            dataKey={filterLine.dataKey}
            stroke={filterLine.color}
            key={filterLine.name}
            activeDot={renderActiveDot}
          />
        ))}
        <Tooltip
          content={<ChartTooltip lines={lines} />}
          cursor={{
            stroke: '#686767',
            strokeWidth: '0.5',
            strokeDasharray: '5,5',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartLine;
