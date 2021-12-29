import { AxiosResponse } from 'axios';
import { HttpService } from '../http-service';
import { Currency } from './types';

export class CurrencyService extends HttpService {
  async getCurrency(): Promise<AxiosResponse<Currency>> {
    return this.get('/api/v3/simple/price?ids=near&vs_currencies=usd', {
      baseURL: 'https://api.coingecko.com',
    });
  }
}

export const currencyService = new CurrencyService();
