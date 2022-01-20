import { isEqual, startOfDay } from 'date-fns';
import { Leaderboard, MetricItem, FlowMetricsItem, Price } from '../api';

type updateMetricsDataWithCurrencyArguments = {
  metrics?: MetricItem[];
  priceItems: Price[];
};

export const calculateCount = (
  priceItems: Price[],
  timestamp: number,
  count: number,
) => {
  const foundPrice = priceItems.find((price) =>
    isEqual(startOfDay(price.date), startOfDay(timestamp)),
  );

  const countResult = foundPrice ? parseFloat(foundPrice.price) * count : count;

  return Number(countResult) || 0;
};

export const updateMetricsDataWithCurrency = ({
  metrics,
  priceItems,
}: updateMetricsDataWithCurrencyArguments): {
  metrics: (MetricItem | FlowMetricsItem)[];
} | null => {
  if (!metrics) {
    return null;
  }

  return {
    metrics: metrics.map((metric) => ({
      ...metric,
      count: calculateCount(priceItems, metric.timestamp, metric.count),
    })),
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
