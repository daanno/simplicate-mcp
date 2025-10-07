import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '../config/config';

export class SimplicateClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.simplicate.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authentication-Key': config.simplicate.apiKey,
        'Authentication-Secret': config.simplicate.apiSecret,
      },
    });
  }

  /**
   * Generic GET request to Simplicate API
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error, `GET ${endpoint}`);
      throw error;
    }
  }

  /**
   * Generic POST request to Simplicate API
   */
  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error, `POST ${endpoint}`);
      throw error;
    }
  }

  /**
   * Generic PUT request to Simplicate API
   */
  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error, `PUT ${endpoint}`);
      throw error;
    }
  }

  /**
   * Generic DELETE request to Simplicate API
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error, `DELETE ${endpoint}`);
      throw error;
    }
  }

  /**
   * Error handler for API requests
   */
  private handleError(error: any, operation: string): void {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      console.error(`Simplicate API Error [${operation}]:`, {
        status,
        message,
        data: error.response?.data,
      });
    } else {
      console.error(`Unexpected error [${operation}]:`, error);
    }
  }
}

