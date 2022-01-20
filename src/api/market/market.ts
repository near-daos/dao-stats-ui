import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { HttpService } from '../http-service';
import { PriceParamsHistory } from '../types';
import { Price } from './types';

export class MarketService extends HttpService {
  async getPrice(params: PriceParamsHistory): Promise<AxiosResponse<Price[]>> {
    const query = queryString.stringify({
      from: params.from,
      to: params.to,
      currency: params.currency,
    });

    return this.get(`/market/${params.coin}/price?${query}`);
  }
}

export const marketService = new MarketService();
