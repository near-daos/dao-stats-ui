import { useMemo } from 'react';
import { Metrics, FlowMetrics, FlowMetricsItem, MetricItem } from 'src/api';
import { getDateFromSelectedDate } from 'src/components/charts/helpers';

export const useFilterMetrics = (
  period: string,
  metricsData?: Metrics | FlowMetrics | null,
) =>
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

    const {
      metrics,
    }: { metrics: FlowMetricsItem[] | MetricItem[] } = metricsData;

    const tempMetrics: Array<FlowMetricsItem | MetricItem> = metrics;

    return {
      metrics: tempMetrics.filter(
        (metric) => metric.timestamp > getDateFromSelectedDate(period, endDate),
      ),
    };
  }, [metricsData, period]);
