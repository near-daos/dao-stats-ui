import { RequestStatus } from '../../store/types';
import { Autocomplete } from '../../api';

export type autocompleteState = {
  autocomplete: Autocomplete | null | any;
  loading: RequestStatus;
  error: unknown;
};
