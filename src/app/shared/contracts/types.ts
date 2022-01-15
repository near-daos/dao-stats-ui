import { RequestStatus } from '../../../store/types';
import { Contract } from '../../../api';

export type ContractState = {
  selectedContract: Contract | null;
  contracts: Contract[] | null;
  loading: RequestStatus;
  error?: string | null;
};
