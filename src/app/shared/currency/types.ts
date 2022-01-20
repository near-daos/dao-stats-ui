import { RequestStatus } from 'src/store/types';
import { CurrentCurrency } from 'src/api';

export type CurrencyState = {
  currency: CurrentCurrency | null;
  loading: RequestStatus;
  error?: null | string;
};
