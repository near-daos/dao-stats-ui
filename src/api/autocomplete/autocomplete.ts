import { AxiosResponse } from 'axios';
import { HttpService } from '../http-service';
import { InputParams, FoundDaos } from '../types';

export class AutocompleteService extends HttpService {
  async getAutocomplete(
    params: InputParams,
  ): Promise<AxiosResponse<FoundDaos>> {
    return this.get(`${params.contract}/daos/autocomplete/${params.input}`);
  }
}

export const autocompleteService = new AutocompleteService();
