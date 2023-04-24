import { apiGateway } from '@/configs/api'
import { AxiosResponse } from 'axios'
import { QueryFunction } from 'react-query'

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

type User = {
  username: string
}

export const me: QueryFunction<User, any[]> = async () => {
  const { data: user } = await apiGateway.get<AxiosResponse<User>>({
    url: '/auth/me',
  })

  return user
}

export const register = (username: string, password: string) =>
  apiGateway.post({
    url: '/users',
    body: {
      username,
      password,
    },
  })
