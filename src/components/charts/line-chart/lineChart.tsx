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
import clsx from 'clsx';
import s from '../../search/search.module.scss';

export interface LineChartProps {
  data: any;
}

export const ChartLine: React.FC<LineChartProps> = ({ data }) => {
  const [period, setPeriod] = useState('1y');

  const datas = () => {
    if (period === '1y' || period === 'All') {
      return data().monthlyData;
    }

    if (period === '6m') {
      return data().last6Months;
    }

    if (period === '3m') {
      return data().last3Months;
    }

    if (period === '1m') {
      return data().last30days;
    }

    if (period === '7d') {
      return data().last7days;
    }

    return undefined;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'left',
          }}
          className="recharts-default-legend"
        >
          {payload.map((entry: any, index: number) => (
            <li
              className={`recharts-legend-item legend-item-${index + 1}`}
              style={{
                display: 'inline-block',
                marginRight: '10px',
                color: entry.color,
                verticalAlign: 'middle',
              }}
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
        <div style={{ display: 'flex' }}>
          <button
            type="button"
            className={clsx(s.inputControlItem, {
              [s.active]: period === '7d',
            })}
            onClick={() => setPeriod('7d')}
          >
            7d
          </button>
          <button
            type="button"
            className={clsx(s.inputControlItem, {
              [s.active]: period === '1m',
            })}
            onClick={() => setPeriod('1m')}
          >
            1m
          </button>
          <button
            type="button"
            className={clsx(s.inputControlItem, {
              [s.active]: period === '3m',
            })}
            onClick={() => setPeriod('3m')}
          >
            3m
          </button>
          <button
            type="button"
            className={clsx(s.inputControlItem, {
              [s.active]: period === '6m',
            })}
            onClick={() => setPeriod('6m')}
          >
            6m
          </button>
          <button
            type="button"
            className={clsx(s.inputControlItem, {
              [s.active]: period === '1y',
            })}
            onClick={() => setPeriod('1y')}
          >
            1y
          </button>
          <button
            type="button"
            className={clsx(s.inputControlItem, {
              [s.active]: period === 'All',
            })}
            onClick={() => setPeriod('All')}
          >
            All
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="classes.rechartsWrap">
      <div className="classes.rechart">
        <LineChart width={1100} height={400} data={datas()}>
          <Legend
            align="left"
            verticalAlign="top"
            height={50}
            iconType="circle"
            content={renderLegend}
          />
          <Line
            dot={false}
            dataKey="Total In"
            stroke="#E33F84"
            key="Total In"
          />
          <Line
            dot={false}
            dataKey="Total Out"
            stroke="#8F40DD"
            key="Total Out"
          />
          <CartesianGrid stroke="#393838" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default ChartLine;
