import React, { useState } from 'react';
import clsx from 'clsx';
import { LegendProps } from 'recharts';

import { Dot } from '../svg/dot';
import { RangeFilter, RangeFilterProps } from '../range-filter';

import { COLORS } from '../constants';
import styles from './custom-legend.module.scss';

export interface CustomLegendProps extends LegendProps, RangeFilterProps {
  onFilterSelect?: (disabled: string[]) => void;
}

export const CustomLegend: React.FC<CustomLegendProps> = ({
  payload,
  period,
  onFilterSelect,
  setPeriod,
}) => {
  const [activeLines, setActiveLines] = useState<Set<string>>(
    new Set(payload?.map((el) => el.value)),
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
        {payload?.map((entry, i) => (
          <button
            className={clsx(styles.legendListBar, {
              [styles.disabled]: !activeLines.has(entry.value),
            })}
            key={`item-${entry.value}`}
            onClick={() => handleClick(entry.value)}
          >
            <Dot color={COLORS[i]} className={styles.legendListSvg} />
            <span className={styles.legendListValue}>{entry.value}</span>
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
