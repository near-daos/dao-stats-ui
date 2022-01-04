/* eslint-disable @typescript-eslint/no-explicit-any */
import { subYears, subMonths, subDays, differenceInMonths } from 'date-fns';
import { MetricItem } from 'src/api';
import { formatDate } from 'src/utils';
import { ONE_BILLION, ONE_MILLION, ONE_THOUSAND } from './constants';
import { ChartDataItem } from './types';

export const getDateFromSelectedDate = (
  range: string,
  date?: number,
): number | string => {
  const currentDate = date || new Date();

  switch (range) {
    case 'All':
      return subYears(currentDate, 30).getTime();
    case '1y':
      return subYears(currentDate, 1).getTime();
    case '6m':
      return subMonths(currentDate, 6).getTime();
    case '3m':
      return subMonths(currentDate, 3).getTime();
    case '1m':
      return subMonths(currentDate, 1).getTime();
    case '7d':
      return subDays(currentDate, 7).getTime();
    default:
      return subYears(currentDate, 1).getTime();
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
