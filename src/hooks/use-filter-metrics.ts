import { useMemo } from 'react';
import { getDateFromMow } from 'src/components/charts/helpers';
import { BarMetricItem, BarMetrics, Metrics } from 'src/api';

export const useFilterMetrics = (
  period: string,
  metricsData?: Metrics | null,
): Metrics | null =>
  useMemo(() => {
    if (period === 'all') {
      return metricsData || null;
    }

    return metricsData?.metrics
      ? {
          metrics: metricsData?.metrics.filter(
            (metric) => metric.timestamp > getDateFromMow(period),
          ),
        }
      : null;
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
          (metric: BarMetricItem) => metric.timestamp > getDateFromMow(period),
        ),
      };
    }

    return { metrics: [] };
  }, [metricsData, period]);
