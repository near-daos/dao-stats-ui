import { useMemo } from 'react';
import { getDateFromSelectedDate } from 'src/components/charts/helpers';
import { Metrics } from 'src/api';

export const useFilterMetrics = (
  period: string,
  metricsData?: Metrics | null,
): Metrics | null =>
  useMemo(() => {
    if (period === 'all') {
      return metricsData || null;
    }

    if (!metricsData?.metrics) {
      return null;
    }

    return {
      metrics: metricsData?.metrics.filter(
        (metric) => metric.timestamp > getDateFromSelectedDate(period),
      ),
    };
  }, [metricsData, period]);
