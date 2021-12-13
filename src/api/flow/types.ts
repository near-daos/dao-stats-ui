import { TotalMetrics } from '../types';

export type Flow = {
  totalIn: TotalMetrics;
  totalOut: TotalMetrics;
  transactions: TotalMetrics;
};
