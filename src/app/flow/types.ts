import { RequestStatus } from 'src/store/types';
import { Flow } from 'src/api';

export type flowState = {
  flow: Flow | null;
  flowDao: Flow | null;
  loading: RequestStatus;
  error: unknown;
};
