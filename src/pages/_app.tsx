import { queryClient } from '@/configs/api'
import '@/styles/globals.css'
import '@/styles/index.scss'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
