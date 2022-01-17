import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store/root-reducer';

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
            ? { ...data.voteRate, count: data.voteRate?.count * 100 }
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
            count: metric.count * 100,
          })),
        }
      : undefined,
);

export const selectGovernanceVoteRateLeaderboard = createSelector(
  (state: RootState) => getState(state).governanceVoteRateLeaderboard,
  (data) => ({
    metrics: data?.metrics?.map((metric) => ({
      ...metric,
      voteRate: metric?.voteRate
        ? { ...metric.voteRate, count: metric.voteRate.count * 100 }
        : undefined,
      overview: metric?.overview
        ? metric.overview.map((item) => ({
            ...item,
            count: item.count * 100,
          }))
        : undefined,
    })),
  }),
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
      count: governanceDao?.voteRate?.count * 100,
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
      count: metric.count * 100,
    })),
  };
};
