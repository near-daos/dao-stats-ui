import { useMemo } from 'react';
import { LeaderboardItem, Proposals } from 'src/api';
import { LeaderboardDataItem } from 'src/components/leaderboard/leaderboard';
import { TitleCellProps } from '../components/leaderboard/title-cell';

type usePrepareLeaderboardProps = {
  leaderboard: LeaderboardItem[] | null;
  type?: string;
};

const prepareTitle = (dao: string): TitleCellProps => {
  const daoSplitted = dao.split('.');

  return {
    label: daoSplitted[0],
    domain: daoSplitted.slice(1).join('.'),
  };
};

function percentage(partialValue: number, totalValue: number): number {
  return parseInt(((100 * partialValue) / totalValue).toFixed(0), 10);
}

function prepareProposalsForChart(proposals?: Proposals): Proposals {
  if (!proposals) {
    return {
      payout: 0,
      councilMember: 0,
      policyChange: 0,
      expired: 0,
    };
  }

  const totalValue = Object.values(proposals).reduce((a, b) => a + b);

  return {
    payout: percentage(proposals.payout, totalValue),
    councilMember: percentage(proposals.councilMember, totalValue),
    policyChange: percentage(proposals.policyChange, totalValue),
    expired: percentage(proposals.expired, totalValue),
  };
}

export const usePrepareLeaderboard = ({
  leaderboard,
  type = 'single',
}: usePrepareLeaderboardProps): LeaderboardDataItem[] =>
  useMemo(() => {
    if (!leaderboard) {
      return [];
    }

    if (type === 'single') {
      return leaderboard.map((leaderboardItem, index) => ({
        id: index,
        titleCell: prepareTitle(leaderboardItem.dao),
        line: {
          totalMetrics: leaderboardItem?.activity,
          metrics: leaderboardItem?.overview,
        },
      }));
    }

    if (type === 'stacked') {
      return leaderboard.map((leaderboardItem, index) => ({
        id: index,
        titleCell: prepareTitle(leaderboardItem.dao),
        proposals: prepareProposalsForChart(leaderboardItem?.proposalsByType),
      }));
    }

    return [];
  }, [type, leaderboard]);
