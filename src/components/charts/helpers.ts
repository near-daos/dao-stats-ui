import { subYears, subMonths, subDays, startOfDay, format } from 'date-fns';
import { MetricItem } from '../../api';

export const getDateFromMow = (range: string): number | string => {
  const currentDateStartedFromDay = startOfDay(new Date());

  switch (range) {
    case 'All':
      return subYears(currentDateStartedFromDay, 30).getTime();
    case '1y':
      return subYears(currentDateStartedFromDay, 1).getTime();
    case '6m':
      return subMonths(currentDateStartedFromDay, 6).getTime();
    case '3m':
      return subMonths(currentDateStartedFromDay, 3).getTime();
    case '1m':
      return subMonths(currentDateStartedFromDay, 1).getTime();
    case '7d':
      return subDays(currentDateStartedFromDay, 7).getTime();
    default:
      return subYears(currentDateStartedFromDay, 1).getTime();
  }
};

export const filterDataByRange = (range: string, data: any): any[] => {
  switch (range) {
    case '1y':
    case 'All':
      return data.monthlyData;
    case '6m':
      return data.last6Months;
    case '3m':
      return data.last3Months;
    case '1m':
      return data.last30days;
    case '7d':
    default:
      return data.last7days;
  }
};

const Y_TICKS_COUNT = 6;

export const getYTicks = (metrics: MetricItem[]): number[] => {
  const max = Math.max(...metrics.map((metric) => metric.count));
  const step = max / Y_TICKS_COUNT;

  const result = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < Y_TICKS_COUNT; i++) {
    result.push(Math.floor(step * i));
  }

  return [0, ...result, max];
};

export const getYDomain = (metrics: MetricItem[]): number[] => [
  0,
  Math.max(...metrics.map((metric) => metric.count)),
];

export const yTickFormatter = (value: number): string => {
  if (value === 0) {
    return '0';
  }

  if (value >= 1000) {
    return `${value % 1000}M`;
  }

  return `${value}K`;
};

export const tickXFormatter = (
  value: number | string,
  period: string,
): string => {
  if (value === 'auto') {
    return 'auto';
  }

  switch (period) {
    case 'All':
    case '1y':
      return format(new Date(value), 'LLL');
    case '6m':
    case '3m':
    case '1m':
    case '7d':
    default:
      return format(new Date(value), 'd LLL');
  }
};
