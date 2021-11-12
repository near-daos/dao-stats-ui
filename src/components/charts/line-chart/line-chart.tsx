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
import { PeriodButton } from '../helper/periodButton';
import s from '../helper/charts.module.scss';

type LineChartProps = {
  data: any;
};

type linePayload = {
  payload: {
    fill: string;
  };
  value: string;
  color: string;
};

const datas = (period: string, data: any) => {
  if (period === '1y' || period === 'All') {
    return data.monthlyData;
  }

  if (period === '6m') {
    return data.last6Months;
  }

  if (period === '3m') {
    return data.last3Months;
  }

  if (period === '1m') {
    return data.last30days;
  }

  if (period === '7d') {
    return data.last7days;
  }

  return undefined;
};

export const ChartLine: React.FC<LineChartProps> = ({ data }) => {
  const [period, setPeriod] = useState('1y');

  const rechartsData = datas(period, data);

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className={s.legendWrapper}>
        <ul className={s.legendList}>
          {payload.map((entry: linePayload) => (
            <li
              className={s.legendListBar}
              style={{ color: entry.color }}
              key={`item-${entry.value}`}
            >
              <svg
                className="recharts-surface"
                width="14"
                height="14"
                viewBox="0 0 32 32"
                version="1.1"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginRight: '4px',
                }}
              >
                <path
                  fill={entry.color}
                  cx="16"
                  cy="16"
                  type="circle"
                  className="recharts-symbols"
                  transform="translate(16, 16)"
                  d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                />
              </svg>
              <span>{entry.value}</span>
            </li>
          ))}
        </ul>
        <PeriodButton period={period} setPeriod={setPeriod} />
      </div>
    );
  };

  const LineСhartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={s.tooltipWrapper}>
          <p className={s.tooltipLabel}>{label}</p>
          {payload.map((el: any) => (
            <div
              style={{ color: el.color }}
              key={`item-${el.dataKey}-${el.value}`}
            >
              <span className={s.tooltipElementName}>
                <svg
                  className="recharts-surface"
                  width="14"
                  height="14"
                  viewBox="0 0 32 32"
                  version="1.1"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: '4px',
                  }}
                >
                  <path
                    fill={el.color}
                    cx="16"
                    cy="16"
                    type="circle"
                    className="recharts-symbols"
                    transform="translate(16, 16)"
                    d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                  />
                </svg>
                {el.name}:
              </span>
              <span className={s.pieLegendValue}>${el.value}</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <LineChart width={1100} height={400} data={rechartsData}>
      <Legend
        align="left"
        verticalAlign="top"
        height={50}
        iconType="circle"
        content={renderLegend}
      />
      <Line dot={false} dataKey="Total In" stroke="#E33F84" key="Total In" />
      <Line dot={false} dataKey="Total Out" stroke="#8F40DD" key="Total Out" />
      <CartesianGrid stroke="#393838" vertical={false} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<LineСhartTooltip />} />
    </LineChart>
  );
};

export default ChartLine;
