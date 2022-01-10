import { Leaderboard, Metrics } from '../api';
import { currencyState } from '../app/shared/currency/types';

export const updateMetricsDataWithCurrency = (
  data: (Metrics & { id?: string }) | null,
  currencyData: currencyState,
) => {
  if (!data) {
    return null;
  }

  return {
    metrics: data.metrics.map((metric) => ({
      ...metric,
      count:
        (currencyData.currency?.near?.usd || 0) *
        (metric.count || metric.incoming || metric.outgoing),
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

  if (leaderboard.incoming) {
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
    };
  }

  if (leaderboard.outgoing) {
    return {
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
