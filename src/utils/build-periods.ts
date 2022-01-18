import {
  startOfDay,
  subYears,
  isBefore,
  isEqual,
  subMonths,
  subWeeks,
} from 'date-fns';
import {
  Period,
  ONE_MONTH,
  SIX_MONTHS,
  THREE_MONTHS,
  ONE_WEEK,
  ONE_YEAR,
} from 'src/constants';
import { ChartDataItem } from '../components/charts/types';

export const buildPeriods = (metrics?: ChartDataItem[]) => {
  if (!metrics) {
    return [];
  }

  const periods: Period[] = [];

  const startDate = startOfDay(metrics[0].timestamp);
  const endDate = startOfDay(metrics[metrics.length - 1].timestamp);

  if (
    isBefore(startDate, subYears(endDate, ONE_YEAR)) ||
    isEqual(startDate, subYears(endDate, ONE_YEAR))
  ) {
    periods.unshift('1y');
  }

  if (
    isBefore(startDate, subMonths(endDate, SIX_MONTHS)) ||
    isEqual(startDate, subMonths(endDate, SIX_MONTHS))
  ) {
    periods.unshift('6m');
  }

  if (
    isBefore(startDate, subMonths(endDate, THREE_MONTHS)) ||
    isEqual(startDate, subMonths(endDate, THREE_MONTHS))
  ) {
    periods.unshift('3m');
  }

  if (
    isBefore(startDate, subMonths(endDate, ONE_MONTH)) ||
    isEqual(startDate, subMonths(endDate, ONE_MONTH))
  ) {
    periods.unshift('1m');
  }

  if (
    isBefore(startDate, subWeeks(endDate, ONE_WEEK)) ||
    isEqual(startDate, subWeeks(endDate, ONE_WEEK))
  ) {
    periods.unshift('7d');
  }

  return periods.concat('All');
};
