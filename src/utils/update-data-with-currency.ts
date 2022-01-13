import get from 'lodash/get';
import set from 'lodash/set';
import { Leaderboard, MetricItem, FlowMetricsItem } from '../api';

type updateMetricsDataWithCurrencyArguments = {
  metrics?: (MetricItem | FlowMetricsItem)[];
  currency: number;
  keys?: string[];
};

export const updateMetricsDataWithCurrency = ({
  metrics,
  currency = 0,
  keys = ['count'],
}: updateMetricsDataWithCurrencyArguments): {
  metrics: (MetricItem | FlowMetricsItem)[];
} | null => {
  if (!metrics) {
    return null;
  }

  const res = metrics.map((metric: MetricItem | FlowMetricsItem) => {
    const result = { ...metric };

    keys.forEach((key) => {
      set(result, key, get(metric, key) * currency);
    });

    return result;
  });

  return {
    metrics: res,
  };
};

export const updateLeaderboardDataWithCurrency = (
  leaderboard: Leaderboard | null,
  currency = 0,
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
          count: currency * (metric.activity?.count || 0),
        },
      })),

      outgoing: leaderboard?.outgoing?.map((metric) => ({
        ...metric,
        activity: {
          growth: metric.activity?.growth || 0,
          count: currency * (metric.activity?.count || 0),
        },
      })),
    };
  }

  return {
    metrics: leaderboard?.metrics?.map((metric) => ({
      ...metric,
      activity: {
        growth: metric.activity?.growth || 0,
        count: currency * (metric.activity?.count || 0),
      },
    })),
  };
};
