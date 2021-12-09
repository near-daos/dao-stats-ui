import { useMemo } from 'react';
import { Leaderboard } from 'src/api';
import { LeaderboardDataItem } from '../components/leaderboard/leaderboard';

export const usePrepareLeaderboard = (
  leaderboard: Leaderboard | null,
): LeaderboardDataItem[] =>
  useMemo(
    () =>
      leaderboard?.metrics
        ? leaderboard?.metrics.map((activityLeaderboardItem, index) => ({
            id: index,
            titleCell: {
              label: activityLeaderboardItem.dao,
              domain: activityLeaderboardItem.dao,
            },
            line: {
              totalMetrics: activityLeaderboardItem.activity,
              metrics: activityLeaderboardItem.overview,
            },
          }))
        : [],
    [leaderboard],
  );
