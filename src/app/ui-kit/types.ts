import { EntityState } from '@reduxjs/toolkit';

import { RequestStatus } from '../../store/types';
import { Todo } from '../../api';

export type UIKitState = {
  todos: EntityState<Todo>;
  loading: RequestStatus;
  error: unknown;
};
