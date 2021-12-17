import { useMemo } from 'react';
import { getDateFromMow } from 'src/components/charts/helpers';
import { BarMetrics, Metrics } from 'src/api';

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
  metricsData: BarMetrics | null,
): Metrics | null =>
  useMemo(() => {
    if (metricsData?.incoming) {
      return {
        metrics: metricsData?.incoming.filter(
          (metric) => metric.timestamp > getDateFromMow(period),
        ),
      };
    }

    if (metricsData?.outcoming) {
      return {
        metrics: metricsData?.outcoming.filter(
          (metric) => metric.timestamp > getDateFromMow(period),
        ),
      };
    }

    return null;
  }, [metricsData, period]);
