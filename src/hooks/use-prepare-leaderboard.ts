import { useMemo } from 'react';
import { Leaderboard } from 'src/api';
import { LeaderboardDataItem } from '../components/leaderboard/leaderboard';

type usePrepareLeaderboardProps = {
  leaderboard: Leaderboard | null;
  type?: string;
};

export const usePrepareLeaderboard = ({
  leaderboard,
  type = 'single',
}: usePrepareLeaderboardProps): LeaderboardDataItem[] =>
  useMemo(() => {
    if (!leaderboard?.metrics) {
      return [];
    }

    if (type === 'single') {
      return leaderboard.metrics.map((metric, index) => ({
        id: index,
        titleCell: {
          label: metric.dao,
          domain: metric.dao,
        },
        line: {
          totalMetrics: metric.activity,
          metrics: metric.overview,
        },
      }));
    }

    return [];
  }, [type, leaderboard]);
