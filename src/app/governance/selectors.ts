import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store/root-reducer';
import { governanceSlice } from './slice';

const getState = (state: RootState) => state[governanceSlice.name];

export const selectGovernance = createSelector(
  (state: RootState) => getState(state).governance,
  (data) => data,
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
  (data) => data,
);

export const selectGovernanceVoteRateLeaderboard = createSelector(
  (state: RootState) => getState(state).governanceVoteRateLeaderboard,
  (data) => data,
);

export const selectGovernanceDao = createSelector(
  (state: RootState) => getState(state).governanceDao,
  (data) => data,
);

export const selectGovernanceDaoProposals = createSelector(
  (state: RootState) => getState(state).governanceDaoProposals,
  (data) => data,
);

export const selectGovernanceDaoProposalsTypes = createSelector(
  (state: RootState) => getState(state).governanceDaoProposalsTypes,
  (data) => data,
);

export const selectGovernanceDaoRateVote = createSelector(
  (state: RootState) => getState(state).governanceDaoVoteRate,
  (data) => data,
);
