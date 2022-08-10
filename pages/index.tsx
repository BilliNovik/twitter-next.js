import axios from 'axios';
import type { NextPage } from 'next'
import Head from 'next/head'

import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from "../components/Widgets";

const Home: NextPage = ({ dataArticles, dataUsers }: any) => {
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
        <Widgets articles={dataArticles.articles} users={dataUsers.results} />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const dataArticles: any = await axios.get(`https://newsapi.org/v2/everything?q=zcash&pageSize=20&apiKey=${process.env.REACT_APP_API_KEY}`)
  const dataUsers: any = await axios.get("https://randomuser.me/api/?results=30&inc=name,login,picture")

  return {
    props: {
      dataArticles: dataArticles.data,
      dataUsers: dataUsers.data
    }
  }
}

export default Home
