import { eachDayOfInterval, startOfDay, subYears } from 'date-fns';
import { MetricItem } from 'src/api';

export const buildMetrics = (metrics: MetricItem[]) => {
  const currentDay = startOfDay(new Date());
  const oneYearFromCurrentDate = subYears(currentDay, 1);

  if (!metrics[0]) {
    return [];
  }

  return eachDayOfInterval({
    start: oneYearFromCurrentDate,
    end: new Date((metrics[0] || { timestamp: currentDay }).timestamp),
  })
    .map((date) => ({ timestamp: date.getTime(), count: 0 }))
    .concat(metrics);
};
