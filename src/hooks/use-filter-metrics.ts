import { useMemo } from 'react';
import { Metrics } from 'src/api';
import { getDateFromSelectedDate } from 'src/components/charts/helpers';

export const useFilterMetrics = (
  period: string,
  metricsData?: Metrics | null,
): Metrics | null =>
  useMemo(() => {
    if (period === 'All') {
      return metricsData || null;
    }

    if (!metricsData?.metrics || !metricsData?.metrics?.length) {
      return null;
    }

    const endDate =
      metricsData.metrics[metricsData.metrics.length - 1].timestamp;

    return {
      metrics: metricsData.metrics.filter(
        (metric) => metric.timestamp > getDateFromSelectedDate(period, endDate),
      ),
    };
  }, [metricsData, period]);
