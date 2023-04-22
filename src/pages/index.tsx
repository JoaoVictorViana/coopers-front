import { ContactUs } from '@/components/feature/ContactUs'
import { Describe } from '@/components/feature/Describe'
import { GoodThings } from '@/components/feature/GoodThings'
import { Header } from '@/components/feature/Header'
import { Intro } from '@/components/feature/Intro'
import { TodoList } from '@/components/feature/TodoList'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Coopers Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Intro />
      <Describe />
      <TodoList />
      <GoodThings />
      <ContactUs />
    </>
  )
}
