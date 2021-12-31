import { useMemo } from 'react';
import {
  isBefore,
  isEqual,
  startOfDay,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';

import { Period } from 'src/constants';
import { BarMetricItem, MetricItem } from 'src/api';

export const usePeriods = (metrics?: MetricItem[] | BarMetricItem[]) =>
  useMemo(() => {
    if (!metrics || !metrics.length) {
      return [];
    }

    const periods: Period[] = [];

    const startDate = startOfDay(metrics[0]?.timestamp);
    const endDate = startOfDay(metrics[metrics.length - 1].timestamp);

    if (
      isBefore(startDate, subYears(endDate, 1)) ||
      isEqual(startDate, subYears(endDate, 1))
    ) {
      periods.unshift('1y');
    }

    if (
      isBefore(startDate, subMonths(endDate, 6)) ||
      isEqual(startDate, subMonths(endDate, 6))
    ) {
      periods.unshift('6m');
    }

    if (
      isBefore(startDate, subMonths(endDate, 3)) ||
      isEqual(startDate, subMonths(endDate, 3))
    ) {
      periods.unshift('3m');
    }

    if (
      isBefore(startDate, subMonths(endDate, 1)) ||
      isEqual(startDate, subMonths(endDate, 1))
    ) {
      periods.unshift('1m');
    }

    if (
      isBefore(startDate, subWeeks(endDate, 1)) ||
      isEqual(startDate, subWeeks(endDate, 1))
    ) {
      periods.unshift('7d');
    }

    return periods.concat('All');
  }, [metrics]);
