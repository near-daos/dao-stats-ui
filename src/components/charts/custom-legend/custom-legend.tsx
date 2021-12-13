import React, { useState } from 'react';
import clsx from 'clsx';
import { LegendProps } from 'recharts';
import { LineItem } from 'src/components/charts/types';

import { Dot } from '../svg/dot';
import { RangeFilter, RangeFilterProps } from '../range-filter';

import styles from './custom-legend.module.scss';
import { COLORS } from '../constants';

export interface CustomLegendProps extends LegendProps, RangeFilterProps {
  lines?: LineItem[];
  onFilterSelect?: (disabled: string[]) => void;
}

export const CustomLegend: React.FC<CustomLegendProps> = ({
  period,
  onFilterSelect,
  setPeriod,
  lines = [],
}) => {
  const [activeLines, setActiveLines] = useState<Set<string>>(
    new Set(lines.map((line) => line.dataKey)),
  );

  const handleClick = (value: string) => {
    const newSet = new Set(activeLines);

    if (activeLines.has(value) && activeLines.size > 1) {
      newSet.delete(value);
      setActiveLines(newSet);
    } else {
      newSet.add(value);
      setActiveLines(newSet);
    }

    if (onFilterSelect) onFilterSelect(Array.from(newSet));
  };

  return (
    <div className={styles.legend}>
      <div className={styles.legendList}>
        {lines?.map((line, lineIndex) => (
          <button
            className={clsx(styles.legendListBar, {
              [styles.disabled]: !activeLines.has(line.dataKey),
            })}
            key={`item-${line.dataKey}`}
            onClick={() => handleClick(line.dataKey)}
          >
            <Dot
              color={line.color || COLORS[lineIndex]}
              className={styles.legendListSvg}
            />
            <span className={styles.legendListValue}>{line.name}</span>
          </button>
        ))}
      </div>
      <RangeFilter
        period={period}
        setPeriod={setPeriod}
        periods={['7d', '1m', '3m', '6m', '1y', 'All']}
      />
    </div>
  );
};
