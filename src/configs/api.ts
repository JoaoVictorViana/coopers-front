import { ApiGateway } from '@/services/gateway'
import { QueryClient } from 'react-query'

export const API_ACCESS_TOKEN = 'coopers_api_token'

export const API_URL_SERVER =
  process.env.NEXT_PUBLIC_API_URL_SERVER || 'http://api:3333'

export const apiGateway = new ApiGateway()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
})
