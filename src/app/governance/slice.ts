/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import { buildMetrics } from 'src/utils';
import {
  governanceService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
} from 'src/api';

import { governanceState } from './types';

const initialState: governanceState = {
  governance: null,
  governanceProposals: null,
  governanceProposalsLeaderboard: null,
  governanceProposalsTypes: null,
  governanceProposalsTypesLeaderboard: null,
  governanceVoteRate: null,
  governanceVoteRateLeaderboard: null,
  governanceDao: null,
  governanceDaoProposals: null,
  governanceDaoProposalsTypes: null,
  governanceDaoVoteRate: null,
  error: null,
};

export const getGovernance = createAsyncThunk(
  'governance/getGovernance',
  async (params: Params) => {
    const response = await governanceService.getGovernance(params);

    return response.data;
  },
);

export const getGovernanceProposals = createAsyncThunk(
  'governance/getGovernanceProposals',
  async (params: HistoryParams) => {
    const response = await governanceService.getGovernanceProposals(params);

    return response.data;
  },
);

export const getGovernanceProposalsLeaderboard = createAsyncThunk(
  'governance/getGovernanceProposalsLeaderboard',
  async (params: Params) => {
    const response = await governanceService.getGovernanceProposalsLeaderboard(
      params,
    );

    return response.data;
  },
);

export const getGovernanceProposalsTypes = createAsyncThunk(
  'governance/getGovernanceProposalsTypes',
  async (params: HistoryParams) => {
    const response = await governanceService.getGovernanceProposalsTypes(
      params,
    );

    return response.data;
  },
);

export const getGovernanceProposalsTypesLeaderboard = createAsyncThunk(
  'governance/getGovernanceProposalsTypesLeaderboard',
  async (params: Params) => {
    const response = await governanceService.getGovernanceProposalsTypesLeaderboard(
      params,
    );

    return response.data;
  },
);

export const getGovernanceVoteRate = createAsyncThunk(
  'governance/getGovernanceVoteRate',
  async (params: HistoryParams) => {
    const response = await governanceService.getGovernanceVoteRate(params);

    return response.data;
  },
);

export const getGovernanceVoteRateLeaderboard = createAsyncThunk(
  'governance/getGovernanceVoteRateLeaderboard',
  async (params: Params) => {
    const response = await governanceService.getGovernanceVoteRateLeaderboard(
      params,
    );

    return response.data;
  },
);

export const getGovernanceDao = createAsyncThunk(
  'governance/getGovernanceDao',
  async (params: DaoParams) => {
    const response = await governanceService.getGovernanceDao(params);

    return response.data;
  },
);

export const getGovernanceDaoProposals = createAsyncThunk(
  'governance/getGovernanceDaoProposals',
  async (params: DaoHistoryParams) => {
    const response = await governanceService.getGovernanceDaoProposals(params);

    return response.data;
  },
);

export const getGovernanceDaoProposalsTypes = createAsyncThunk(
  'governance/getGovernanceDaoProposalsTypes',
  async (params: DaoHistoryParams) => {
    const response = await governanceService.getGovernanceDaoProposalsTypes(
      params,
    );

    return response.data;
  },
);

export const getGovernanceDaoVoteRate = createAsyncThunk(
  'governance/getGovernanceDaoVoteRate',
  async (params: DaoHistoryParams) => {
    const response = await governanceService.getGovernanceDaoVoteRate(params);

    return response.data;
  },
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
      state.governance = payload;
    });

    builder.addCase(getGovernanceProposals.fulfilled, (state, { payload }) => {
      state.governanceProposals = { metrics: buildMetrics(payload.metrics) };
    });

    builder.addCase(
      getGovernanceProposalsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.governanceProposalsLeaderboard = payload;
      },
    );

    builder.addCase(
      getGovernanceProposalsTypes.fulfilled,
      (state, { payload }) => {
        state.governanceProposalsTypes = {
          metrics: {
            governance: buildMetrics(
              sortBy(payload.metrics.governance, 'timestamp'),
            ),
            financial: buildMetrics(
              sortBy(payload.metrics.financial, 'timestamp'),
            ),
            bounties: buildMetrics(
              sortBy(payload.metrics.bounties, 'timestamp'),
            ),
            members: buildMetrics(sortBy(payload.metrics.members, 'timestamp')),
          },
        };
      },
    );
    builder.addCase(
      getGovernanceProposalsTypesLeaderboard.fulfilled,
      (state, { payload }) => {
        state.governanceProposalsTypesLeaderboard = payload;
      },
    );

    builder.addCase(getGovernanceVoteRate.fulfilled, (state, { payload }) => {
      state.governanceVoteRate = {
        metrics: buildMetrics(sortBy(payload.metrics, 'timestamp')),
      };
    });

    builder.addCase(
      getGovernanceVoteRateLeaderboard.fulfilled,
      (state, { payload }) => {
        state.governanceVoteRateLeaderboard = payload;
      },
    );

    builder.addCase(getGovernanceDao.fulfilled, (state, { payload }) => {
      state.governanceDao = payload;
    });

    builder.addCase(
      getGovernanceDaoProposals.fulfilled,
      (state, { payload }) => {
        state.governanceDaoProposals = {
          metrics: buildMetrics(payload.metrics),
        };
      },
    );

    builder.addCase(
      getGovernanceDaoProposalsTypes.fulfilled,
      (state, { payload }) => {
        state.governanceDaoProposalsTypes = payload;
      },
    );

    builder.addCase(
      getGovernanceDaoVoteRate.fulfilled,
      (state, { payload }) => {
        state.governanceDaoVoteRate = {
          metrics: buildMetrics(payload.metrics),
        };
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
