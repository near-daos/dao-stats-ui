import get from 'lodash/get';
import {
  FlowMetrics,
  Leaderboard,
  Metrics,
  MetricItem,
  FlowMetricsItem,
} from '../api';
import { currencyState } from '../app/shared/currency/types';

export const updateMetricsDataWithCurrency = (
  data: ((Metrics | FlowMetrics) & { id?: string }) | null,
  currencyData: currencyState,
) => {
  if (!data) {
    return null;
  }

  const { metrics }: { metrics: FlowMetricsItem[] | MetricItem[] } = data;

  const tempMetrics: Array<FlowMetricsItem | MetricItem> = metrics;

  return {
    metrics: tempMetrics.map((metric: MetricItem | FlowMetricsItem) => ({
      ...metric,
      count:
        (currencyData.currency?.near?.usd || 0) *
        (get(metric, 'count') ||
          get(metric, 'incoming') ||
          get(metric, 'outgoing')),
    })),
  };
};

export const updateLeaderboardDataWithCurrency = (
  leaderboard: Leaderboard | null,
  currencyData: currencyState,
) => {
  if (!leaderboard) {
    return null;
  }

  if (leaderboard.incoming || leaderboard.outgoing) {
    return {
      incoming: leaderboard?.incoming?.map((metric) => ({
        ...metric,
        activity: {
          growth: metric.activity?.growth || 0,
          count:
            (currencyData.currency?.near?.usd || 0) *
            (metric.activity?.count || 0),
        },
      })),

      outgoing: leaderboard?.outgoing?.map((metric) => ({
        ...metric,
        activity: {
          growth: metric.activity?.growth || 0,
          count:
            (currencyData.currency?.near?.usd || 0) *
            (metric.activity?.count || 0),
        },
      })),
    };
  }

  return {
    metrics: leaderboard?.metrics?.map((metric) => ({
      ...metric,
      activity: {
        growth: metric.activity?.growth || 0,
        count:
          (currencyData.currency?.near?.usd || 0) *
          (metric.activity?.count || 0),
      },
    })),
  };
};
