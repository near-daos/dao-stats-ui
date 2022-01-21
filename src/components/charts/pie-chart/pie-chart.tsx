/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { ONE_HUNDRED } from 'src/constants';

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
}

const updatePercent = (percentages: number) =>
  parseInt((percentages * ONE_HUNDRED).toFixed(0), 10);

export const ChartPie: React.FC<PieChartProps> = ({
  title = 'Average council size',
  data,
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
    const STRAIGHT_ANGLE = 180;
    const K = 0.5;
    const SHIFT = 15;
    const MAX_NUMBER = 9;
    const FONT_WEIGHT = 500;
    const RADIAN = Math.PI / STRAIGHT_ANGLE;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const radius = innerRadius + (outerRadius - innerRadius) * K;
    const x = cx + radius * cos;
    const y = cy + radius * sin;
    const sx = cx + (outerRadius + SHIFT) * cos;
    const sy = cy + (outerRadius + SHIFT) * sin;

    const updatedPercent = updatePercent(percent);

    return (
      <text
        x={updatedPercent >= MAX_NUMBER ? x : sx}
        y={updatedPercent >= MAX_NUMBER ? y : sy}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontWeight: FONT_WEIGHT, fontSize: '12px' }}
      >
        {`${updatedPercent}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer debounce={1} height={293} width="100%">
      <PieChart>
        <Legend align="left" verticalAlign="top" content={renderCustomLegend} />
        <Pie
          isAnimationActive={false}
          data={chartData}
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
    </ResponsiveContainer>
  );
};

export default ChartPie;
