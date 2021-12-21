import {
  eachDayOfInterval,
  startOfDay,
  subYears,
  isBefore,
  isEqual,
} from 'date-fns';
import { MetricItem } from 'src/api';

export const buildMetrics = (
  metrics: MetricItem[],
  isBuildFromCurrentDate?: boolean,
) => {
  if (!metrics || !metrics[0]) {
    return [];
  }

  const currentDay = startOfDay(new Date());
  const oneYearFromCurrentDate = subYears(currentDay, 1);

  if (
    isBuildFromCurrentDate &&
    isBefore(startOfDay(metrics[metrics.length - 1].timestamp), currentDay)
  ) {
    eachDayOfInterval({
      start: startOfDay(metrics[metrics.length - 1].timestamp),
      end: currentDay,
    }).forEach((date) => {
      metrics.push({ timestamp: date.getTime(), count: 0 });
    });
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
