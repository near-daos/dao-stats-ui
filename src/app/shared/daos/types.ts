import { RequestStatus } from '../../../store/types';
import { Dao } from '../../../api';

export type daoState = {
  autocomplete: Dao[] | null;
  loading: RequestStatus;
  error: unknown;
};
