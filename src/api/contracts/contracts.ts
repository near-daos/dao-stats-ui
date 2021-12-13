import { AxiosResponse } from 'axios';
import { HttpService } from '../http-service';
import { Contract } from './types';

export class ContractsService extends HttpService {
  async getContracts(): Promise<AxiosResponse<Contract[]>> {
    return this.get('/contracts');
  }
}

export const contractsService = new ContractsService();
