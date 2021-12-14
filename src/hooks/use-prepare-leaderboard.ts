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
      governance: 0,
      financial: 0,
      bounties: 0,
      members: 0,
    };
  }

  const totalValue = Object.values(proposals).reduce((a, b) => a + b);

  return {
    governance: percentage(proposals.governance, totalValue),
    financial: percentage(proposals.financial, totalValue),
    bounties: percentage(proposals.bounties, totalValue),
    members: percentage(proposals.members, totalValue),
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

    if (type === 'voteRate') {
      return leaderboard.map((leaderboardItem, index) => ({
        id: index,
        titleCell: prepareTitle(leaderboardItem.dao),
        voteRate: {
          voteRate: leaderboardItem?.voteRate,
          proposals: leaderboardItem?.proposals,
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
