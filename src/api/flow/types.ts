import { TotalMetrics } from '../types';

export type Flow = {
  totalIn: TotalMetrics;
  totalOut: TotalMetrics;
  transactionsIn: TotalMetrics;
  transactionsOut: TotalMetrics;
};
