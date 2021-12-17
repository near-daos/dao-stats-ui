import { useMemo } from 'react';
import { getDateFromMow } from 'src/components/charts/helpers';
import { Metrics } from 'src/api';

export const useFilterMetrics = (
  period: string,
  metricsData?: Metrics | null,
): Metrics | null =>
  useMemo(
    () =>
      metricsData?.metrics
        ? {
            metrics: metricsData?.metrics.filter(
              (metric) => metric.timestamp > getDateFromMow(period),
            ),
          }
        : null,
    [metricsData, period],
  );
