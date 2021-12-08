/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { RequestStatus } from '../../../store/types';
import { contractState } from './types';
import { contractsService, Contract } from '../../../api';

const initialState: contractState = {
  selectedContract: null,
  contracts: null,
  loading: RequestStatus.NOT_ASKED,
  error: null,
};

export const getContracts = createAsyncThunk(
  'contracts/getContracts',
  async () => contractsService.getContracts(),
);

export const setContract = createAction<Contract>('contracts/setContract');

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setContract, (state, { payload }) => {
      state.selectedContract = payload;
    });
    builder.addCase(getContracts.fulfilled, (state, { payload }) => {
      state.loading = RequestStatus.SUCCESS;
      state.error = null;
      state.contracts = payload.data;
    });

    builder.addCase(getContracts.rejected, (state, { error }) => {
      state.loading = RequestStatus.FAILED;
      state.error = error.message;
    });

    builder.addCase(getContracts.pending, (state) => {
      state.loading = RequestStatus.PENDING;
    });
  },
});
