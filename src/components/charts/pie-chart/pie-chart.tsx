import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

export interface PieChartItem {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartItem[];
}

export const ChartPie: React.FC<PieChartProps> = ({ data }) => {
  const renderLegend = (props: any) => {
    const { payload } = props;

    return (
      <div>
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
                display: 'flex',
                marginRight: '10px',
                color: entry.color,
                verticalAlign: 'middle',
                justifyContent: 'space-between',
              }}
              key={`item-${entry.value}`}
            >
              <span>
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
                {entry.value}
              </span>
              <span style={{ color: '#fff' }}>
                {entry.payload.percent * 100}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const COLORS = ['#E33F84', '#8F40DD', '#5D75E9', '#81CEEE'];

  const RADIAN = Math.PI / 180;

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      className="classes.rechart"
      style={{
        border: '2px solid #393838',
        borderRadius: '8px',
        display: 'inline-block',
        padding: '10px 15px',
      }}
    >
      <span
        style={{
          color: '#969696',
          fontSize: '14px',
        }}
      >
        Average council size
      </span>
      <PieChart width={246} height={260}>
        <Legend
          verticalAlign="top"
          layout="vertical"
          width={246}
          iconType="circle"
          content={renderLegend}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          innerRadius={30}
        >
          {data.map((entry: { value: number }, index: number) => (
            <Cell
              key={`cell-${entry.value}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ChartPie;