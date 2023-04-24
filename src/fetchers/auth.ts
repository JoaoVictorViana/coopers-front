import { apiGateway } from '@/configs/api'

export const login = (username: string, password: string) =>
  apiGateway.post({
    url: '/auth/login',
    body: {
      username,
      password,
    },
  })
