import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = `${window.__RUNTIME_CONFIG__.REACT_APP_API_ENDPOINT}/api/v1`;

export class HttpService {
  private readonly client: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        ...config?.headers,
      },
      ...config,
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.data) {
          throw error.response.data.message;
        }

        throw error;
      },
    );
  }

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.client.get<T, R>(url, config);
  }

  post<T, R>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.client.post<T, R>(url, data, config);
  }
}

export const httpService = new HttpService();
