import { AxiosResponse } from 'axios';
import { HttpService } from '../http-service';
import { InputParams, Dao, DaoParams } from '../types';

export class DaosService extends HttpService {
  async getDao(params: DaoParams): Promise<AxiosResponse<Dao>> {
    return this.get(`${params.contract}/daos/${params.dao}`);
  }

  async getAutocomplete(params: InputParams): Promise<AxiosResponse<Dao[]>> {
    return this.get(`${params.contract}/daos/autocomplete/${params.input}`);
  }
}

export const daosService = new DaosService();
