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
} from 'recharts';
import { CustomLegend } from '../custom-legend';
import { ChartTooltip } from '../chart-tooltip';

import { COLORS, tickStyles } from '../constants';
import { filterDataByRange, yTickFormatter } from '../helpers';

type ChartBarProps = {
  data: any;
  width?: number;
  height?: number;
};

export const ChartBar: React.FC<ChartBarProps> = ({
  data,
  width = 685,
  height = 500,
}) => {
  const [period, setPeriod] = useState('1y');
  const [focusBar, setFocusBar] = useState(null);

  const rechartsData = filterDataByRange(period, data);

  const bars = Object.keys(rechartsData[0]).filter(
    (el) => el !== 'name' && el !== 'id',
  );

  const [activeBars, setActiveBars] = useState<string[]>(bars);

  return (
    <BarChart
      width={width}
      height={height}
      data={rechartsData}
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
      <CartesianGrid stroke="#393838" vertical={false} />
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
      <Legend
        align="left"
        verticalAlign="top"
        height={50}
        iconType="circle"
        content={
          <CustomLegend
            period={period}
            setPeriod={setPeriod}
            onFilterSelect={(active) => setActiveBars(active)}
          />
        }
      />
      {bars.map((bar, i) => (
        <Bar
          key={bar}
          dataKey={bar}
          fill={activeBars.includes(bar) ? COLORS[i] : 'transparent'}
          barSize={8}
        >
          {rechartsData.map((entry: any, index: number) => (
            <Cell
              style={{
                cursor: 'pointer',
                filter: focusBar === index ? 'none' : 'grayscale(100%)',
              }}
            />
          ))}
        </Bar>
      ))}
      <Tooltip
        offset={25}
        content={<ChartTooltip showArrow />}
        cursor={false}
      />
    </BarChart>
  );
};

export default ChartBar;
