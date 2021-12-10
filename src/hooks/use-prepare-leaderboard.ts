import { useMemo } from 'react';
import { Leaderboard } from 'src/api';
import { LeaderboardDataItem } from 'src/components/leaderboard/leaderboard';
import { TitleCellProps } from '../components/leaderboard/title-cell';

type usePrepareLeaderboardProps = {
  leaderboard: Leaderboard | null;
  type?: string;
};

const prepareTitle = (dao: string): TitleCellProps => {
  const daoSplitted = dao.split('.');

  return {
    label: daoSplitted[0],
    domain: daoSplitted.slice(1).join('.'),
  };
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
        titleCell: prepareTitle(metric.dao),
        line: {
          totalMetrics: metric.activity,
          metrics: metric.overview,
        },
      }));
    }

    return [];
  }, [type, leaderboard]);
