/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

import startCase from 'lodash/startCase';

import { Dot } from '../svg/dot';
import { COLORS } from '../constants';

import styles from './pie-chart.module.scss';

type PieChartData = {
  [key: string]: number;
};

interface PieChartProps {
  title?: string;
  data?: PieChartData | null;
  width?: number;
  height?: number;
}

const updatePercent = (percentages: number) =>
  parseInt((percentages * 100).toFixed(0), 10);

export const ChartPie: React.FC<PieChartProps> = ({
  title = 'Average council size',
  data,
  width = 200,
  height = 293,
}) => {
  const chartData = useMemo(
    () =>
      data
        ? Object.keys(data).map((key) => ({
            name: startCase(key),
            value: data[key],
          }))
        : [],
    [data],
  );

  const renderCustomLegend = ({ payload }: any) => (
    <div className={styles.legend}>
      <span className={styles.legendTitle}>{title}</span>
      <ul className={styles.legendList}>
        {payload?.map((entry: any) => (
          <li className={styles.legendItem} key={`item-${entry.value}`}>
            <div>
              <Dot color={entry.color || ''} className={styles.legendIcon} />
              <span className={styles.legendLabel}>{entry.value}</span>
            </div>
            <div>
              <span className={styles.legendValue}>
                {updatePercent(entry?.payload?.percent)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * cos;
    const y = cy + radius * sin;
    const sx = cx + (outerRadius + 15) * cos;
    const sy = cy + (outerRadius + 15) * sin;

    const updatedPercent = updatePercent(percent);

    return (
      <text
        x={updatedPercent >= 9 ? x : sx}
        y={updatedPercent >= 9 ? y : sy}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontWeight: 500, fontSize: '12px' }}
      >
        {`${updatedPercent}%`}
      </text>
    );
  };

  return (
    <PieChart width={width} height={height}>
      <Legend align="left" verticalAlign="top" content={renderCustomLegend} />
      <Pie
        isAnimationActive={false}
        data={chartData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderLabel}
        outerRadius={74.5}
        dataKey="value"
        innerRadius={26}
        strokeWidth={0}
      >
        {chartData.map((entry: { value: number }, index: number) => (
          <Cell
            key={`cell-${entry.value}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default ChartPie;
