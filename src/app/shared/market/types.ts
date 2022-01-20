import { Price } from 'src/api';

export type MarketState = {
  price: Price[] | null;
  error?: null | string;
};
