import React, { useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import clsx from 'clsx';
import { PeriodButton } from '../helper/periodButton';
import s from '../helper/charts.module.scss';

type ChartBarProps = {
  data: any;
};

type barPayload = {
  payload: {
    fill: string;
  };
  value: string;
};

export const ChartBar: React.FC<ChartBarProps> = ({ data }) => {
  const [period, setPeriod] = useState('1y');

  const datas = () => {
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

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div className={clsx(s.legendWrapper)}>
        <ul className={clsx(s.legendList)}>
          {payload.map((entry: barPayload) => (
            <li
              className={clsx(s.legendListBar)}
              style={{ color: entry.payload.fill }}
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
                  fill={entry.payload.fill}
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

  return (
    <BarChart width={1100} height={400} data={datas()}>
      <CartesianGrid stroke="#393838" vertical={false} />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend
        align="left"
        verticalAlign="top"
        height={50}
        iconType="circle"
        content={renderLegend}
      />
      <Bar dataKey="Total In" fill="#E33F84" />
      <Bar dataKey="Total Out" fill="#8F40DD" />
    </BarChart>
  );
};

export default ChartBar;
