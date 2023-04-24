import { apiGateway } from '@/configs/api'
import { AxiosResponse } from 'axios'

export const login = async (username: string, password: string) => {
  const { data: auth } = await apiGateway.post<
    AxiosResponse<{ access_token: string; user: { username: string } }>
  >({
    url: '/auth/login',
    body: {
      username,
      password,
    },
  })

  apiGateway.updateAuthTokens({ accessToken: auth.access_token })

  return auth.user
}

export const register = (username: string, password: string) =>
  apiGateway.post({
    url: '/users',
    body: {
      username,
      password,
    },
  })
