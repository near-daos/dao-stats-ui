import { AxiosResponse } from 'axios';
import { HttpService } from '../http-service';
import { InputParams, Dao } from '../types';

export class AutocompleteService extends HttpService {
  async getAutocomplete(params: InputParams): Promise<AxiosResponse<Dao[]>> {
    return this.get(`${params.contract}/daos/autocomplete/${params.input}`);
  }
}

export const autocompleteService = new AutocompleteService();
