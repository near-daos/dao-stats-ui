import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';
import { ONE_HUNDRED } from 'src/constants';

import {
  governanceDaoAdapter,
  governanceDaoProposalsAdapter,
  governanceDaoProposalsTypesAdapter,
  governanceDaoVoteRateAdapter,
  governanceSlice,
} from './slice';

const getState = (state: RootState) => state[governanceSlice.name];

export const selectGovernanceError = createSelector(
  (state: RootState) => getState(state).error,
  (error) => error,
);

export const selectGovernance = createSelector(
  (state: RootState) => getState(state).governance,
  (data) =>
    data
      ? {
          ...data,
          voteRate: data?.voteRate
            ? {
                ...data.voteRate,
                count: Math.round(data.voteRate?.count * ONE_HUNDRED),
              }
            : undefined,
        }
      : undefined,
);

export const selectGovernanceProposals = createSelector(
  (state: RootState) => getState(state).governanceProposals,
  (data) => data,
);

export const selectGovernanceProposalsLeaderboard = createSelector(
  (state: RootState) => getState(state).governanceProposalsLeaderboard,
  (data) => data,
);

export const selectGovernanceProposalsTypes = createSelector(
  (state: RootState) => getState(state).governanceProposalsTypes,
  (data) => data,
);

export const selectGovernanceProposalsTypesLeaderboard = createSelector(
  (state: RootState) => getState(state).governanceProposalsTypesLeaderboard,
  (data) => data,
);

export const selectGovernanceVoteRate = createSelector(
  (state: RootState) => getState(state).governanceVoteRate,
  (data) =>
    data
      ? {
          metrics: data?.metrics?.map((metric) => ({
            ...metric,
            count: Math.round(metric.count * ONE_HUNDRED),
          })),
        }
      : undefined,
);

export const selectGovernanceVoteRateLeaderboard = createSelector(
  (state: RootState) => getState(state).governanceVoteRateLeaderboard,
  (data) => {
    if (!data) {
      return null;
    }

    return {
      metrics: data?.metrics?.map((metric) => ({
        ...metric,
        voteRate: metric?.voteRate
          ? {
              ...metric.voteRate,
              count: Math.round(metric.voteRate.count * ONE_HUNDRED),
            }
          : undefined,
        overview: metric?.overview
          ? metric.overview.map((item) => ({
              ...item,
              count: Math.round(item.count * ONE_HUNDRED),
            }))
          : undefined,
      })),
    };
  },
);

const {
  selectById: selectGovernanceDaoItem,
} = governanceDaoAdapter.getSelectors(
  (state: RootState) => state[governanceSlice.name].governanceDao,
);

export const selectGovernanceDaoById = (id: string | undefined) => (
  state: RootState,
) => {
  if (!id) {
    return null;
  }

  const governanceDao = selectGovernanceDaoItem(state, id);

  if (!governanceDao) {
    return governanceDao;
  }

  return {
    ...governanceDao,
    voteRate: {
      ...governanceDao?.voteRate,
      count: Math.round(governanceDao?.voteRate?.count * ONE_HUNDRED),
    },
  };
};

const {
  selectById: selectGovernanceDaoProposalsItem,
} = governanceDaoProposalsAdapter.getSelectors(
  (state: RootState) => state[governanceSlice.name].governanceDaoProposals,
);

export const selectGovernanceDaoProposalsById = (id: string | undefined) => (
  state: RootState,
) => (id ? selectGovernanceDaoProposalsItem(state, id) : null);

const {
  selectById: selectGovernanceDaoProposalsTypesItem,
} = governanceDaoProposalsTypesAdapter.getSelectors(
  (state: RootState) => state[governanceSlice.name].governanceDaoProposalsTypes,
);

export const selectGovernanceDaoProposalsTypesById = (
  id: string | undefined,
) => (state: RootState) =>
  id ? selectGovernanceDaoProposalsTypesItem(state, id) : null;

const {
  selectById: selectGovernanceDaoVoteRateItem,
} = governanceDaoVoteRateAdapter.getSelectors(
  (state: RootState) => state[governanceSlice.name].governanceDaoVoteRate,
);

export const selectGovernanceDaoVoteRateById = (id: string | undefined) => (
  state: RootState,
) => {
  if (!id) {
    return null;
  }

  const governanceDaoVoteRate = selectGovernanceDaoVoteRateItem(state, id);

  if (!governanceDaoVoteRate) {
    return governanceDaoVoteRate;
  }

  return {
    metrics: governanceDaoVoteRate?.metrics.map((metric) => ({
      ...metric,
      count: Math.round(metric.count * ONE_HUNDRED),
    })),
  };
};
