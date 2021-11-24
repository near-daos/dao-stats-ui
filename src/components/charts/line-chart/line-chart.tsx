import React, { useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LegendProps,
} from 'recharts';

import { RangeFilter } from '../range-filter';
import { ChartTooltip } from '../chart-tooltip';
import { tickStyles } from '../constants';
import { filterDataByRange, yTickFormatter } from '../helpers';
import { Dot } from '../svg/dot';

import styles from '../charts.module.scss';

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

  const CustomLegend = ({ payload }: LegendProps) => (
    <div className={styles.legend}>
      <ul className={styles.legendList}>
        {payload?.map((entry) => (
          <li className={styles.legendListBar} key={`item-${entry.value}`}>
            <Dot color={entry.color || ''} className={styles.legendListSvg} />
            <span className={styles.legendListValue}>{entry.value}</span>
          </li>
        ))}
      </ul>
      <RangeFilter
        period={period}
        setPeriod={setPeriod}
        periods={['7d', '1m', '3m', '6m', '1y', 'All']}
      />
    </div>
  );

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
        content={<CustomLegend />}
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
      <Line
        strokeWidth={2}
        dot={false}
        dataKey="Total In"
        stroke="#E33F84"
        key="Total In"
        activeDot={renderActiveDot}
      />
      <Line
        strokeWidth={2}
        dot={false}
        dataKey="Total Out"
        stroke="#8F40DD"
        key="Total Out"
        activeDot={renderActiveDot}
      />
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
