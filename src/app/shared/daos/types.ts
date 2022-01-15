import { RequestStatus } from '../../../store/types';
import { Dao } from '../../../api';

export type DaoState = {
  autocomplete: Dao[] | null;
  dao: Dao | null;
  loading: RequestStatus;
  error: unknown;
};
