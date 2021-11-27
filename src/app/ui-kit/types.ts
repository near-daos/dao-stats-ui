import { RequestStatus } from '../../store/types';

export type UIKitState = {
  todos: unknown;
  loading: RequestStatus;
  error: unknown;
};
