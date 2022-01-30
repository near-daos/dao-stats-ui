import { subYears, subMonths, differenceInMonths, subWeeks } from 'date-fns';
import { MetricItem } from 'src/api';
import { formatDate } from 'src/utils';
import {
  FIRST_DATE,
  ONE_BILLION,
  ONE_MILLION,
  ONE_MONTH,
  ONE_THOUSAND,
  ONE_WEEK,
  ONE_YEAR,
  SIX_MONTHS,
  THREE_MONTHS,
} from 'src/constants';
import { ChartDataItem } from './types';

export const getDateFromSelectedDate = (
  range: string,
  date?: number,
): number | string => {
  const currentDate = date || new Date();

  switch (range) {
    case '1y':
      return subYears(currentDate, ONE_YEAR).getTime();
    case '6m':
      return subMonths(currentDate, SIX_MONTHS).getTime();
    case '3m':
      return subMonths(currentDate, THREE_MONTHS).getTime();
    case '1m':
      return subMonths(currentDate, ONE_MONTH).getTime();
    case '7d':
      return subWeeks(currentDate, ONE_WEEK).getTime();
    case 'All':
    default:
      return FIRST_DATE;
  }
};

const Y_TICKS_COUNT = 6;

export const getYTicks = (metrics: MetricItem[]): number[] => {
  const max = Math.max(...metrics.map((metric) => metric.count));
  const step = max / Y_TICKS_COUNT;

  const result = [];

  for (let i = 0; i < Y_TICKS_COUNT; i += 1) {
    result.push(Math.floor(step * i));
  }

  return [0, ...result, max];
};

export const tickXFormatter = (
  metrics: ChartDataItem[],
  value: number | string,
  period: string,
): string => {
  if (value === 'auto') {
    return 'auto';
  }

  // Working around current issue with X Axis tick labels
  const diffInMonths = differenceInMonths(
    metrics?.[metrics.length - 1]?.timestamp,
    metrics?.[0]?.timestamp,
  );

  switch (period) {
    case 'All':
    case '1y':
      return formatDate(value, `${diffInMonths > 1 ? '' : 'd'} LLL`);
    case '6m':
    case '3m':
    case '1m':
    case '7d':
    default:
      return formatDate(value, 'd LLL');
  }
};

export const tickYFormatter = (value: number) => {
  if (value >= ONE_BILLION) {
    return `${value / ONE_BILLION}B`;
  }

  if (value >= ONE_MILLION) {
    return `${value / ONE_MILLION}M`;
  }

  if (value >= ONE_THOUSAND) {
    return `${value / ONE_THOUSAND}K`;
  }

  return `${value}`;
};
