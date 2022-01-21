import { RequestStatus } from 'src/store/types';
import { Currency } from 'src/api';

export type CurrencyState = {
  currency: Currency | null;
  loading: RequestStatus;
  error?: null | string;
};
