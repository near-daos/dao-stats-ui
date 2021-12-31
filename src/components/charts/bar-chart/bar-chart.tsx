/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { CustomLegend } from 'src/components/charts/custom-legend';
import { ChartTooltip } from '../chart-tooltip';

import { tickStyles } from '../constants';

import { tickXFormatter } from '../helpers';
import { LineItem } from '../types';

type ChartBarProps = {
  data: any | null;
  lines?: LineItem[];
  period: string;
  setPeriod: (period: string) => void;
  width?: number;
  height?: number;
  filter?: 'incoming' | 'outgoing';
};

export const ChartBar: React.FC<ChartBarProps> = ({
  lines = [],
  data = { metrics: [] },
  width = 685,
  height = 500,
  period,
  setPeriod,
  filter,
}) => {
  const [focusBar, setFocusBar] = useState(null);
  let bars: any;

  if (data.metrics.length > 1) {
    bars = Object.keys(data?.metrics[0]).filter(
      (el) => el === 'incoming' || el === 'outgoing',
    );
  }

  const changeBarColors = (focus: number | null, index: number) => {
    if (focus === index || focus === null) {
      return 'none';
    }

    return 'grayscale(100%)';
  };

  const [activeBars, setActiveBars] = useState<string[]>();

  return (
    <ResponsiveContainer debounce={1}>
      <BarChart
        width={width}
        height={height}
        data={data?.metrics}
        onMouseMove={(state: {
          isTooltipActive: boolean;
          activeTooltipIndex: React.SetStateAction<null>;
        }) => {
          if (state.isTooltipActive) {
            setFocusBar(state.activeTooltipIndex);
          } else {
            setFocusBar(null);
          }
        }}
      >
        <Legend
          align="left"
          verticalAlign="top"
          height={50}
          iconType="circle"
          content={
            <CustomLegend
              lines={lines}
              period={period}
              setPeriod={setPeriod}
              onFilterSelect={(active) => setActiveBars(active)}
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
          width={50}
        />
        <XAxis
          stroke="#393838"
          dataKey="timestamp"
          tickMargin={12}
          tickCount={6}
          tickLine={false}
          tickFormatter={(value) => tickXFormatter(value, period)}
          style={tickStyles}
          minTickGap={50}
        />

        {bars?.map((bar: any) => {
          if (!activeBars && !filter) {
            return (
              <Bar
                key={bar}
                dataKey={bar}
                fill={bar === 'incoming' ? '#FFC300' : '#9D58E1'}
                barSize={8}
              >
                {data?.metrics.map((entry: any, index: number) => (
                  <Cell
                    style={{
                      cursor: 'pointer',
                      filter: changeBarColors(focusBar, index),
                    }}
                  />
                ))}
              </Bar>
            );
          }

          if (filter && filter === bar) {
            return (
              <Bar
                key={bar}
                dataKey={bar}
                fill={bar === 'incoming' ? '#FFC300' : '#9D58E1'}
                barSize={8}
              >
                {data?.metrics.map((entry: any, index: number) => (
                  <Cell
                    style={{
                      cursor: 'pointer',
                      filter: changeBarColors(focusBar, index),
                    }}
                  />
                ))}
              </Bar>
            );
          }

          if (activeBars && activeBars?.includes(bar)) {
            return (
              <Bar
                key={bar}
                dataKey={bar}
                fill={bar === 'incoming' ? '#FFC300' : '#9D58E1'}
                barSize={8}
              >
                {data?.metrics.map((entry: any, index: number) => (
                  <Cell
                    style={{
                      cursor: 'pointer',
                      filter: changeBarColors(focusBar, index),
                    }}
                  />
                ))}
              </Bar>
            );
          }

          return null;
        })}
        <Tooltip
          offset={25}
          content={<ChartTooltip showArrow />}
          cursor={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartBar;
