/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isFulfilled,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {
  tokensService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  MetricsEntity,
} from 'src/api';

import { TokensDaoEntity, tokensState } from './types';

export const tokensDaoAdapter = createEntityAdapter<TokensDaoEntity>();
export const tokensDaoNftsAdapter = createEntityAdapter<MetricsEntity>();
export const tokensDaoFtsAdapter = createEntityAdapter<MetricsEntity>();
export const tokensDaoFtsVlAdapter = createEntityAdapter<MetricsEntity>();

const initialState: tokensState = {
  tokens: null,
  tokensNfts: null,
  tokensNftsLeaderboard: null,
  tokensFts: null,
  tokensFtsLeaderboard: null,
  tokensFtsVl: null,
  tokensFtsVlLeaderboard: null,
  tokensDao: tokensDaoAdapter.getInitialState(),
  tokensNftsDao: tokensDaoNftsAdapter.getInitialState(),
  tokensFtsDao: tokensDaoFtsAdapter.getInitialState(),
  tokensFtsVlDao: tokensDaoFtsVlAdapter.getInitialState(),
  error: null,
};

export const getTokens = createAsyncThunk(
  'governance/getTokens',
  async (params: Params) => {
    const response = await tokensService.getTokens(params);

    return response.data;
  },
);

export const getTokensNfts = createAsyncThunk(
  'governance/getTokensNfts',
  async (params: HistoryParams) => {
    const response = await tokensService.getTokensNfts(params);

    return response.data;
  },
);

export const getTokensNftsLeaderboard = createAsyncThunk(
  'governance/getTokensNftsLeaderboard',
  async (params: Params) => {
    const response = await tokensService.getTokensNftsLeaderboard(params);

    return response.data;
  },
);

export const getTokensFts = createAsyncThunk(
  'governance/getTokensFts',
  async (params: HistoryParams) => {
    const response = await tokensService.getTokensFts(params);

    return response.data;
  },
);

export const getTokensFtsLeaderboard = createAsyncThunk(
  'governance/getTokensFtsLeaderboard',
  async (params: Params) => {
    const response = await tokensService.getTokensFtsLeaderboard(params);

    return response.data;
  },
);

export const getTokensFtsVl = createAsyncThunk(
  'governance/getTokensFtsVl',
  async (params: HistoryParams) => {
    const response = await tokensService.getTokensFtsVl(params);

    return response.data;
  },
);

export const getTokensFtsVlLeaderboard = createAsyncThunk(
  'governance/getTokensFtsVlLeaderboard',
  async (params: Params) => {
    const response = await tokensService.getTokensFtsVlLeaderboard(params);

    return response.data;
  },
);

export const getTokensDao = createAsyncThunk(
  'governance/getTokensDao',
  async (params: DaoParams) => {
    const response = await tokensService.getTokensDao(params);

    return { id: params.dao, ...response.data };
  },
);

export const getTokensDaoNfts = createAsyncThunk(
  'governance/getTokensDaoNfts',
  async (params: DaoHistoryParams) => {
    const response = await tokensService.getTokensDaoNfts(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

export const getTokensDaoFts = createAsyncThunk(
  'governance/getTokensDaoFts',
  async (params: DaoHistoryParams) => {
    const response = await tokensService.getTokensDaoFts(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

export const getTokensDaoFtsVl = createAsyncThunk(
  'governance/getTokensDaoFtsVl',
  async (params: DaoHistoryParams) => {
    const response = await tokensService.getTokensDaoFtsVl(params);

    return { id: params.dao, metrics: response.data.metrics };
  },
);

const isRejectedAction = isRejected(
  getTokens,
  getTokensNfts,
  getTokensNftsLeaderboard,
  getTokensFts,
  getTokensFtsLeaderboard,
  getTokensFtsVl,
  getTokensFtsVlLeaderboard,
  getTokensDao,
  getTokensDaoNfts,
  getTokensDaoFts,
  getTokensDaoFtsVl,
);
const isFulfilledAction = isFulfilled(
  getTokens,
  getTokensNfts,
  getTokensNftsLeaderboard,
  getTokensFts,
  getTokensFtsLeaderboard,
  getTokensFtsVl,
  getTokensFtsVlLeaderboard,
  getTokensDao,
  getTokensDaoNfts,
  getTokensDaoFts,
  getTokensDaoFtsVl,
);

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTokens.fulfilled, (state, { payload }) => {
      state.tokens = payload;
    });

    builder.addCase(getTokensNfts.fulfilled, (state, { payload }) => {
      state.tokensNfts = payload;
    });

    builder.addCase(
      getTokensNftsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.tokensNftsLeaderboard = payload;
      },
    );

    builder.addCase(getTokensFts.fulfilled, (state, { payload }) => {
      state.tokensFts = payload;
    });

    builder.addCase(getTokensFtsLeaderboard.fulfilled, (state, { payload }) => {
      state.tokensFtsLeaderboard = payload;
    });

    builder.addCase(getTokensFtsVl.fulfilled, (state, { payload }) => {
      state.tokensFtsVl = payload;
    });

    builder.addCase(
      getTokensFtsVlLeaderboard.fulfilled,
      (state, { payload }) => {
        state.tokensFtsVlLeaderboard = payload;
      },
    );

    builder.addCase(getTokensDao.fulfilled, (state, { payload }) => {
      tokensDaoAdapter.upsertOne(state.tokensDao, payload);
    });

    builder.addCase(getTokensDaoNfts.fulfilled, (state, { payload }) => {
      tokensDaoNftsAdapter.upsertOne(state.tokensNftsDao, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addCase(getTokensDaoFts.fulfilled, (state, { payload }) => {
      tokensDaoFtsAdapter.upsertOne(state.tokensFtsDao, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addCase(getTokensDaoFtsVl.fulfilled, (state, { payload }) => {
      tokensDaoFtsVlAdapter.upsertOne(state.tokensFtsVlDao, {
        id: payload.id,
        metrics: payload.metrics,
      });
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.error = null;
    });
  },
});
