import { RequestStatus } from '../store/types';

export const isNotAsked = (status: string): boolean =>
  RequestStatus.NOT_ASKED === status;
export const isPending = (status: string): boolean =>
  RequestStatus.PENDING === status;
export const isSuccess = (status: string): boolean =>
  RequestStatus.SUCCESS === status;
export const isFailed = (status: string): boolean =>
  RequestStatus.FAILED === status;
