import {
  createSlice,
  createAsyncThunk,
  isRejected,
  createEntityAdapter,
  createAction,
} from '@reduxjs/toolkit';
import {
  tokensService,
  HistoryParams,
  Params,
  DaoParams,
  DaoHistoryParams,
  MetricsEntity,
} from 'src/api';

import { TokensDaoEntity, TokensState } from './types';

export const tokensDaoAdapter = createEntityAdapter<TokensDaoEntity>();
export const tokensDaoNftsAdapter = createEntityAdapter<MetricsEntity>();
export const tokensDaoFtsAdapter = createEntityAdapter<MetricsEntity>();
export const tokensDaoFtsVlAdapter = createEntityAdapter<MetricsEntity>();

const initialState: TokensState = {
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

export const clearTokensError = createAction('tokens/clearTokensError');

export const getTokens = createAsyncThunk(
  'tokens/getTokens',
  async (params: Params) => tokensService.getTokens(params),
);

export const getTokensNfts = createAsyncThunk(
  'tokens/getTokensNfts',
  async (params: HistoryParams) => tokensService.getTokensNfts(params),
);

export const getTokensNftsLeaderboard = createAsyncThunk(
  'tokens/getTokensNftsLeaderboard',
  async (params: Params) => tokensService.getTokensNftsLeaderboard(params),
);

export const getTokensFts = createAsyncThunk(
  'tokens/getTokensFts',
  async (params: HistoryParams) => tokensService.getTokensFts(params),
);

export const getTokensFtsLeaderboard = createAsyncThunk(
  'tokens/getTokensFtsLeaderboard',
  async (params: Params) => tokensService.getTokensFtsLeaderboard(params),
);

export const getTokensFtsVl = createAsyncThunk(
  'tokens/getTokensFtsVl',
  async (params: HistoryParams) => tokensService.getTokensFtsVl(params),
);

export const getTokensFtsVlLeaderboard = createAsyncThunk(
  'tokens/getTokensFtsVlLeaderboard',
  async (params: Params) => tokensService.getTokensFtsVlLeaderboard(params),
);

export const getTokensDao = createAsyncThunk(
  'tokens/getTokensDao',
  async (params: DaoParams) => tokensService.getTokensDao(params),
);

export const getTokensDaoNfts = createAsyncThunk(
  'tokens/getTokensDaoNfts',
  async (params: DaoHistoryParams) => tokensService.getTokensDaoNfts(params),
);

export const getTokensDaoFts = createAsyncThunk(
  'tokens/getTokensDaoFts',
  async (params: DaoHistoryParams) => tokensService.getTokensDaoFts(params),
);

export const getTokensDaoFtsVl = createAsyncThunk(
  'tokens/getTokensDaoFtsVl',
  async (params: DaoHistoryParams) => tokensService.getTokensDaoFtsVl(params),
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

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTokens.fulfilled, (state, { payload }) => {
      state.tokens = payload.data;
    });

    builder.addCase(getTokensNfts.fulfilled, (state, { payload }) => {
      state.tokensNfts = payload.data;
    });

    builder.addCase(
      getTokensNftsLeaderboard.fulfilled,
      (state, { payload }) => {
        state.tokensNftsLeaderboard = payload.data;
      },
    );

    builder.addCase(getTokensFts.fulfilled, (state, { payload }) => {
      state.tokensFts = payload.data;
    });

    builder.addCase(getTokensFtsLeaderboard.fulfilled, (state, { payload }) => {
      state.tokensFtsLeaderboard = payload.data;
    });

    builder.addCase(getTokensFtsVl.fulfilled, (state, { payload }) => {
      state.tokensFtsVl = payload.data;
    });

    builder.addCase(
      getTokensFtsVlLeaderboard.fulfilled,
      (state, { payload }) => {
        state.tokensFtsVlLeaderboard = payload.data;
      },
    );

    builder.addCase(
      getTokensDao.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tokensDaoAdapter.upsertOne(state.tokensDao, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getTokensDaoNfts.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tokensDaoNftsAdapter.upsertOne(state.tokensNftsDao, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getTokensDaoFts.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tokensDaoFtsAdapter.upsertOne(state.tokensFtsDao, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(
      getTokensDaoFtsVl.fulfilled,
      (
        state,
        {
          payload,
          meta: {
            arg: { dao },
          },
        },
      ) => {
        tokensDaoFtsVlAdapter.upsertOne(state.tokensFtsVlDao, {
          id: dao,
          ...payload.data,
        });
      },
    );

    builder.addCase(clearTokensError, (state) => {
      state.error = null;
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });
  },
});
