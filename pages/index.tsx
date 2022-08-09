import type { NextPage } from 'next'
import Head from 'next/head'

import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from "../components/Widgets";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home / Twitter Next.js</title>
        <meta name="description" content="BilliNovik / twitter-next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen max-w-7x1 mx-auto'>
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
  )
}

export default Home
