import { useMemo } from 'react';
import { Metrics, FlowMetrics } from 'src/api';
import { getDateFromSelectedDate } from 'src/components/charts/helpers';

export const useFilterMetrics = (
  period: string,
  metricsData?: Metrics | FlowMetrics | null,
): Metrics | FlowMetrics | null =>
  useMemo(() => {
    if (period === 'All') {
      return metricsData || null;
    }

    if (
      !metricsData ||
      !metricsData?.metrics ||
      !metricsData?.metrics?.length
    ) {
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
