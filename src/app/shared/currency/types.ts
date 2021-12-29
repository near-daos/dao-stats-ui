import { RequestStatus } from 'src/store/types';
import { Currency } from 'src/api';

export type currencyState = {
  currency: Currency | null;
  loading: RequestStatus;
  error: unknown;
};
