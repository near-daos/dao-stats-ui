import { useMemo } from 'react';
import {
  isBefore,
  isEqual,
  startOfDay,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import {
  Period,
  ONE_MONTH,
  ONE_WEEK,
  SIX_MONTHS,
  THREE_MONTHS,
} from 'src/constants';

import { MetricItem, FlowMetricsItem } from 'src/api';

export const usePeriods = (
  metrics?: (MetricItem | FlowMetricsItem)[],
  periodsTemplate: Period[] = ['1y', '6m', '3m', '1m', '7d', 'All'],
) =>
  useMemo(() => {
    if (!metrics || !metrics.length) {
      return [];
    }

    const periods: Period[] = [];

    const startDate = startOfDay(metrics[0]?.timestamp);
    const endDate = startOfDay(metrics[metrics.length - 1].timestamp);

    if (
      periodsTemplate.includes('1y') &&
      (isBefore(startDate, subYears(endDate, 1)) ||
        isEqual(startDate, subYears(endDate, 1)))
    ) {
      periods.unshift('1y');
    }

    if (
      periodsTemplate.includes('6m') &&
      (isBefore(startDate, subMonths(endDate, SIX_MONTHS)) ||
        isEqual(startDate, subMonths(endDate, SIX_MONTHS)))
    ) {
      periods.unshift('6m');
    }

    if (
      periodsTemplate.includes('3m') &&
      (isBefore(startDate, subMonths(endDate, THREE_MONTHS)) ||
        isEqual(startDate, subMonths(endDate, THREE_MONTHS)))
    ) {
      periods.unshift('3m');
    }

    if (
      periodsTemplate.includes('1m') &&
      (isBefore(startDate, subMonths(endDate, ONE_MONTH)) ||
        isEqual(startDate, subMonths(endDate, ONE_MONTH)))
    ) {
      periods.unshift('1m');
    }

    if (
      periodsTemplate.includes('7d') &&
      (isBefore(startDate, subWeeks(endDate, ONE_WEEK)) ||
        isEqual(startDate, subWeeks(endDate, ONE_WEEK)))
    ) {
      periods.unshift('7d');
    }

    return periods.concat('All');
  }, [periodsTemplate, metrics]);
