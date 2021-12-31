export const PERIODS = <const>['7d', '1m', '3m', '6m', '1y', 'All'];
export type Period = typeof PERIODS[number] | string;
