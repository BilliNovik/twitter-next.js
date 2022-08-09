import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'

import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from "../components/Widgets";

const Home: NextPage = ({ data }: any) => {
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
        <Widgets articles={data.articles} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await axios.get(`https://newsapi.org/v2/everything?q=zcash&pageSize=20&apiKey=${process.env.REACT_APP_API_KEY}`)

  return {
    props: {
      data
    }
  }
}

export default Home
