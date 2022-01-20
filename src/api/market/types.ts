import { Coin, Currency } from 'src/api/types';

export type Price = {
  date: number;
  coin: Coin;
  currency: Currency;
  price: string;
};
