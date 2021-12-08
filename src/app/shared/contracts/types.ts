import { RequestStatus } from '../../../store/types';
import { Contract } from '../../../api';

export type contractState = {
  selectedContract: Contract | null;
  contracts: Contract[] | null;
  loading: RequestStatus;
  error: unknown;
};
