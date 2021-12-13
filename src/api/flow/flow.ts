import { AxiosResponse } from 'axios';
import { HttpService } from '../http-service';
import { Flow } from './types';
import { Params, DaoParams } from '../types';

export class FlowService extends HttpService {
  async getFlow(params: Params): Promise<AxiosResponse<Flow>> {
    return this.get(`${params.contract}/flow`);
  }

  async getFlowDao(params: DaoParams): Promise<AxiosResponse<Flow>> {
    return this.get(`${params.contract}/flow/${params.dao}`);
  }
}

export const flowService = new FlowService();
