import { AxiosResponse } from 'axios';
import { HttpService } from '../httpService';
import { Todo } from './types';

export class TodosService extends HttpService {
  async getTodos(): Promise<AxiosResponse<Todo[]>> {
    return this.get('/todos');
  }

  async getTodo(id: string): Promise<AxiosResponse<Todo>> {
    return this.get(`/todos/${id}`);
  }
}

export const todosService = new TodosService();
