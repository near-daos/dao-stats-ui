import { useMemo } from 'react';
import {
  isBefore,
  isEqual,
  startOfDay,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import { Period, SIX_MONTHS, THREE_MONTHS } from 'src/constants';

import { MetricItem, FlowMetricsItem } from 'src/api';

export const usePeriods = (metrics?: (MetricItem | FlowMetricsItem)[]) =>
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
