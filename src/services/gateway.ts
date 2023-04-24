import { API_URL_SERVER } from '@/configs/api'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'
import {
  AuthTokenManager,
  AuthTokenManagerInstance,
  AuthTokens,
  AuthTokensConfig,
} from './authToken'
import {
  HttpClientInstance,
  HttpClientParams,
  HttpClientWithBodyParams,
  HttpDeleteClient,
  HttpGetClient,
  HttpPostClient,
  HttpPutClient,
} from './protocols/httpClient'

type Configs = {
  context?: GetServerSidePropsContext
  tokens?: AuthTokensConfig
}

export class ApiGateway
  implements
    HttpClientInstance<AxiosInstance>,
    HttpGetClient,
    HttpPostClient,
    HttpPutClient,
    HttpDeleteClient
{
  private requestInterceptorId = 0

  private responseInterceptorId = 0

  constructor(
    private readonly _axios: AxiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
    }),
    private readonly tokenManager: AuthTokenManagerInstance = new AuthTokenManager(),
    private configs: Configs = {}
  ) {
    this.config()
  }

  getInstance(): AxiosInstance {
    return this._axios
  }

  setConfigs(configs: Configs): void {
    this.configs = configs
    this.resetConfigs()
  }

  config(): void {
    this.requestInterceptorId = this._axios.interceptors.request.use(
      (config) => {
        if (config.url?.includes('login')) return config

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${
            this.tokenManager.get(this.configs?.tokens).accessToken ?? ''
          }`,
        }

        return config
      }
    )

    this.responseInterceptorId = this._axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!axios.isAxiosError(error)) {
          throw error
        }

        throw error
      }
    )
  }

  resetConfigs() {
    this._axios.interceptors.request.eject(this.requestInterceptorId)
    this._axios.interceptors.response.eject(this.responseInterceptorId)
    this.config()
  }

  async get<T = AxiosResponse>(
    params: HttpClientParams,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = this.configs?.context
      ? `${API_URL_SERVER}${params.url}`
      : params.url

    return this._axios.get(url, { params: params.query, ...config })
  }

  async delete<T = AxiosResponse>(params: HttpClientParams): Promise<T> {
    const url = this.configs?.context
      ? `${API_URL_SERVER}${params.url}`
      : params.url

    return this._axios.delete(url, { params: params.query })
  }

  async post<T = AxiosResponse, B = any>(
    params: HttpClientWithBodyParams<B>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = this.configs?.context
      ? `${API_URL_SERVER}${params.url}`
      : params.url

    return this._axios.post(url, params.body, {
      params: params.query,
      ...config,
    })
  }

  async put<T = AxiosResponse, B = any>(
    params: HttpClientWithBodyParams<B>
  ): Promise<T> {
    const url = this.configs?.context
      ? `${API_URL_SERVER}${params.url}`
      : params.url

    return this._axios.put(url, params.body, { params: params.query })
  }

  async patch<T = AxiosResponse, B = any>(
    params: HttpClientWithBodyParams<B>
  ): Promise<T> {
    const url = this.configs?.context
      ? `${API_URL_SERVER}${params.url}`
      : params.url

    return this._axios.patch(url, params.body, { params: params.query })
  }

  updateAuthTokens(authTokens: AuthTokens) {
    this.tokenManager.update(authTokens)
  }

  destroyTokens() {
    this.tokenManager.destroy()
  }
}
