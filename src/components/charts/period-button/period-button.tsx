import React, { FC } from 'react';
import clsx from 'clsx';
import s from '../charts.module.scss';

export interface PeriodButtonProps {
  period: string;
  setPeriod: (type: '7d' | '1m' | '3m' | '6m' | '1y' | 'All') => void;
}

export const PeriodButton: FC<PeriodButtonProps> = ({ period, setPeriod }) => (
  <div className={s.periodButtonsWrapper}>
    <button
      type="button"
      className={clsx(s.periodButtonItem, {
        [s.activeButton]: period === '7d',
      })}
      onClick={() => setPeriod('7d')}
    >
      7d
    </button>
    <button
      type="button"
      className={clsx(s.periodButtonItem, {
        [s.activeButton]: period === '1m',
      })}
      onClick={() => setPeriod('1m')}
    >
      1m
    </button>
    <button
      type="button"
      className={clsx(s.periodButtonItem, {
        [s.activeButton]: period === '3m',
      })}
      onClick={() => setPeriod('3m')}
    >
      3m
    </button>
    <button
      type="button"
      className={clsx(s.periodButtonItem, {
        [s.activeButton]: period === '6m',
      })}
      onClick={() => setPeriod('6m')}
    >
      6m
    </button>
    <button
      type="button"
      className={clsx(s.periodButtonItem, {
        [s.activeButton]: period === '1y',
      })}
      onClick={() => setPeriod('1y')}
    >
      1y
    </button>
    <button
      type="button"
      className={clsx(s.periodButtonItem, {
        [s.activeButton]: period === 'All',
      })}
      onClick={() => setPeriod('All')}
    >
      All
    </button>
  </div>
);

export default PeriodButton;
