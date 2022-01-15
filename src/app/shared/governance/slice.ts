/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isFulfilled,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import {
  governanceService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  MetricsEntity,
} from 'src/api';

import {
  GovernanceDaoEntity,
  GovernanceState,
  ProposalMetricsEntity,
} from './types';

export const governanceDaoAdapter = createEntityAdapter<GovernanceDaoEntity>();
export const governanceDaoProposalsAdapter = createEntityAdapter<
  MetricsEntity
>();
export const governanceDaoProposalsTypesAdapter = createEntityAdapter<
  ProposalMetricsEntity
>();
export const governanceDaoVoteRateAdapter = createEntityAdapter<
  MetricsEntity
>();

const initialState: GovernanceState = {
  governance: null,
  governanceProposals: null,
  governanceProposalsLeaderboard: null,
  governanceProposalsTypes: null,
  governanceProposalsTypesLeaderboard: null,
  governanceVoteRate: null,
  governanceVoteRateLeaderboard: null,
  governanceDao: governanceDaoAdapter.getInitialState(),
  governanceDaoProposals: governanceDaoProposalsAdapter.getInitialState(),
  governanceDaoProposalsTypes: governanceDaoProposalsTypesAdapter.getInitialState(),
  governanceDaoVoteRate: governanceDaoVoteRateAdapter.getInitialState(),
  error: null,
};

export const getGovernance = createAsyncThunk(
  'governance/getGovernance',
  async (params: Params) => governanceService.getGovernance(params),
);

export const getGovernanceProposals = createAsyncThunk(
  'governance/getGovernanceProposals',
  async (params: HistoryParams) =>
    governanceService.getGovernanceProposals(params),
);

export const getGovernanceProposalsLeaderboard = createAsyncThunk(
  'governance/getGovernanceProposalsLeaderboard',
  async (params: Params) =>
    governanceService.getGovernanceProposalsLeaderboard(params),
);

export const getGovernanceProposalsTypes = createAsyncThunk(
  'governance/getGovernanceProposalsTypes',
  async (params: HistoryParams) =>
    governanceService.getGovernanceProposalsTypes(params),
);

export const getGovernanceProposalsTypesLeaderboard = createAsyncThunk(
  'governance/getGovernanceProposalsTypesLeaderboard',
  async (params: Params) =>
    governanceService.getGovernanceProposalsTypesLeaderboard(params),
);

export const getGovernanceVoteRate = createAsyncThunk(
  'governance/getGovernanceVoteRate',
  async (params: HistoryParams) =>
    governanceService.getGovernanceVoteRate(params),
);

export const getGovernanceVoteRateLeaderboard = createAsyncThunk(
  'governance/getGovernanceVoteRateLeaderboard',
  async (params: Params) =>
    governanceService.getGovernanceVoteRateLeaderboard(params),
);

export const getGovernanceDao = createAsyncThunk(
  'governance/getGovernanceDao',
  async (params: DaoParams) => governanceService.getGovernanceDao(params),
);

export const getGovernanceDaoProposals = createAsyncThunk(
  'governance/getGovernanceDaoProposals',
  async (params: DaoHistoryParams) =>
    governanceService.getGovernanceDaoProposals(params),
);

export const getGovernanceDaoProposalsTypes = createAsyncThunk(
  'governance/getGovernanceDaoProposalsTypes',
  async (params: DaoHistoryParams) =>
    governanceService.getGovernanceDaoProposalsTypes(params),
);

export const getGovernanceDaoVoteRate = createAsyncThunk(
  'governance/getGovernanceDaoVoteRate',
  async (params: DaoHistoryParams) =>
    governanceService.getGovernanceDaoVoteRate(params),
);

const isRejectedAction = isRejected(
  getGovernance,
  getGovernanceProposals,
  getGovernanceProposalsLeaderboard,
  getGovernanceProposalsTypes,
  getGovernanceVoteRate,
  getGovernanceVoteRateLeaderboard,
  getGovernanceDao,
  getGovernanceDaoProposals,
  getGovernanceDaoProposalsTypes,
  getGovernanceDaoVoteRate,
);
const isFulfilledAction = isFulfilled(
  getGovernance,
  getGovernanceProposals,
  getGovernanceProposalsLeaderboard,
  getGovernanceProposalsTypes,
  getGovernanceVoteRate,
  getGovernanceVoteRateLeaderboard,
  getGovernanceDao,
  getGovernanceDaoProposals,
  getGovernanceDaoProposalsTypes,
  getGovernanceDaoVoteRate,
);

export const governanceSlice = createSlice({
  name: 'governance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGovernance.fulfilled, (state, { payload }) => {
      state.governance = payload.data;
    });

    builder.addCase(getGovernanceProposals.fulfilled, (state, { payload }) => {
      state.governanceProposals = payload.data;
    });

    builder.addCase(
      getGovernanceProposalsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.governanceProposalsLeaderboard = payload.data;
      },
    );

    builder.addCase(
      getGovernanceProposalsTypes.fulfilled,
      (state, { payload }) => {
        state.governanceProposalsTypes = {
          metrics: {
            governance: sortBy(payload.data.metrics.governance, 'timestamp'),
            financial: sortBy(payload.data.metrics.financial, 'timestamp'),
            bounties: sortBy(payload.data.metrics.bounties, 'timestamp'),
            members: sortBy(payload.data.metrics.members, 'timestamp'),
          },
        };
      },
    );
    builder.addCase(
      getGovernanceProposalsTypesLeaderboard.fulfilled,
      (state, { payload }) => {
        state.governanceProposalsTypesLeaderboard = payload.data;
      },
    );

    builder.addCase(getGovernanceVoteRate.fulfilled, (state, { payload }) => {
      state.governanceVoteRate = {
        metrics: sortBy(payload.data.metrics, 'timestamp'),
      };
    });

    builder.addCase(
      getGovernanceVoteRateLeaderboard.fulfilled,
      (state, { payload }) => {
        state.governanceVoteRateLeaderboard = payload.data;
      },
    );

    builder.addCase(
      getGovernanceDao.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        governanceDaoAdapter.upsertOne(state.governanceDao, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getGovernanceDaoProposals.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        governanceDaoProposalsAdapter.upsertOne(state.governanceDaoProposals, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getGovernanceDaoProposalsTypes.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        governanceDaoProposalsTypesAdapter.upsertOne(
          state.governanceDaoProposalsTypes,
          {
            id: dao,
            metrics: {
              bounties: payload.data.metrics.bounties,
              financial: payload.data.metrics.financial,
              governance: payload.data.metrics.governance,
              members: payload.data.metrics.members,
            },
          },
        );
      },
    );

    builder.addCase(
      getGovernanceDaoVoteRate.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        governanceDaoVoteRateAdapter.upsertOne(state.governanceDaoVoteRate, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.error = null;
    });
  },
});
