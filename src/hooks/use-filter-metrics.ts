import { useMemo } from 'react';
import { BarMetricItem, BarMetrics, Metrics } from 'src/api';
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

export const useFilterBarMetrics = (
  period: string,
  metricsData?: BarMetrics | null,
): BarMetrics | null =>
  useMemo(() => {
    if (period === 'all') {
      return metricsData || null;
    }

    if (metricsData?.metrics) {
      return {
        metrics: metricsData?.metrics.filter(
          (metric: BarMetricItem) =>
            metric.timestamp > getDateFromSelectedDate(period),
        ),
      };
    }

    return { metrics: [] };
  }, [metricsData, period]);
