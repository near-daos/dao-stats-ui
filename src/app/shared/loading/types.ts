import { RequestStatus } from 'src/store/types';

export type LoadingState = {
  [key: string]: RequestStatus;
};
