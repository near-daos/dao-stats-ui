import {
  eachDayOfInterval,
  startOfDay,
  subYears,
  isBefore,
  isEqual,
} from 'date-fns';
import { MetricItem } from 'src/api';

export const buildMetrics = (metrics: MetricItem[]) => {
  const currentDay = startOfDay(new Date());
  const oneYearFromCurrentDate = subYears(currentDay, 1);

  if (!metrics[0]) {
    return [];
  }

  if (
    isBefore(startOfDay(metrics[0].timestamp), oneYearFromCurrentDate) ||
    isEqual(startOfDay(metrics[0].timestamp), oneYearFromCurrentDate)
  ) {
    return metrics;
  }

  return eachDayOfInterval({
    start: oneYearFromCurrentDate,
    end: new Date(metrics[0].timestamp),
  })
    .map((date) => ({ timestamp: date.getTime(), count: 0 }))
    .concat(metrics);
};
