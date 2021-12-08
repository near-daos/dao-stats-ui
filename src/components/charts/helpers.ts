import { subYears, subMonths, subDays, startOfDay, format } from 'date-fns';
import { MetricItem } from '../../api';

export const getDateFromMow = (range: string): number => {
  const currentDateStartedFromDay = startOfDay(new Date());

  switch (range) {
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
      return data.last7days;
    default:
      return data.last7days;
  }
};

export const getYTicks = (metrics: MetricItem[]): number[] => {
  const max = Math.max(...metrics.map((metric) => metric.count));
  const res = [];
  const step = 50;

  // todo temporary solution
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= Math.floor(max / step); i++) {
    res.push(i * 50);
  }

  return [0, ...res, max];
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

export const getXInterval = (metrics: MetricItem[], period: string) => {
  const timestamps = metrics.map((metric) => metric.timestamp);

  switch (period) {
    case '1y':
      return Math.floor(timestamps.length / 12);
    case '6m':
      return Math.floor(timestamps.length / 6);
    case '3m':
      return Math.floor(timestamps.length / 3);
    case '1m':
      return Math.floor(timestamps.length / 10);
    case '7d':
      return 0;
    default:
      return 0;
  }
};

export const tickXFormatter = (value: number | string, period: string) => {
  if (value === 'auto') {
    return 'auto';
  }

  switch (period) {
    case '1y':
      return format(new Date(value), 'd LLL');
    case '6m':
      return format(new Date(value), 'd LLL');
    case '3m':
      return format(new Date(value), 'd LLL');
    case '1m':
      return format(new Date(value), 'd LLL');
    case '7d':
    default:
      return format(new Date(value), 'd LLL');
  }
};
