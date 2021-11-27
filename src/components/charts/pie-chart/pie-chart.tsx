import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

import { Dot } from '../svg/dot';
import { COLORS } from '../constants';

import styles from './pie-chart.module.scss';

export interface PieChartItem {
  name: string;
  value: number;
}

interface PieChartProps {
  title?: string;
  data: PieChartItem[];
  width?: number;
  height?: number;
}

export const ChartPie: React.FC<PieChartProps> = ({
  title = 'Average council size',
  data,
  width = 200,
  height = 293,
}) => {
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
                {entry?.payload?.percent * 100}%
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

    const updatedPercent = parseInt((percent * 100).toFixed(0), 10);

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
      <Legend verticalAlign="top" content={renderCustomLegend} />
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderLabel}
        outerRadius={74.5}
        dataKey="value"
        innerRadius={26}
        strokeWidth={0}
      >
        {data.map((entry: { value: number }, index: number) => (
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
