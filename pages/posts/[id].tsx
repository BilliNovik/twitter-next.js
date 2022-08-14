import axios from 'axios';
import Head from 'next/head'
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from '../../components/Sidebar'
import Widgets from "../../components/Widgets"
import DeleteModal from '../../components/DeleteModal'
import CommentModal from '../../components/CommentModal';
import Post from '../../components/Post';
import Comment from '../../components/Comment';
import { db } from '../../firebase';

const PostPage = ({ dataArticles, dataUsers }: any) => {

    const router = useRouter()
    const { id }: any = router.query

    const [post, setPost] = React.useState(null)
    const [comments, setComments] = React.useState([])


    React.useEffect(() => {
        onSnapshot(doc<any>(db, 'posts', id), (doc: any) => {
            setPost(doc)
        });

        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('date', 'desc')), (doc: any) => {
            setComments(doc.docs)
        })
    }, [db, id])

    return (
        <>
            <Head>
                <title>Tweet / Twitter Next.js</title>
                <meta name="description" content="BilliNovik / twitter-next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='max-w-[1264px] flex min-h-screen mx-auto'>
                <Sidebar />

                <div className='ml-[70px] flex flex-col border-l border-r border-gray-200 max-w-[650px] md:min-w-[650px] xl:ml-[245px]'>
                    <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b flex border-gray-200 items-center'>
                        <div className="hoverEffect" onClick={() => router.push("/")}>
                            <ArrowLeftIcon className="h-5 " />
                        </div>
                        <h2 className='text-lg sm:text-xl font-bold cursor-pointer ml-2'>Tweet</h2>
                    </div>
                    {post && <Post post={post} />}
                    <AnimatePresence>
                        {
                            comments?.map((comment: any) => (
                                <motion.div key={comment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                                    <Comment key={comment.id} originalPostId={id} comment={comment} />
                                </motion.div>
                            ))
                        }
                    </AnimatePresence>
                </div>

                <Widgets articles={dataArticles.articles} users={dataUsers} />

                <DeleteModal />
                <CommentModal />
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const dataArticles: any = await axios.get(`https://newsapi.org/v2/everything?q=zcash&pageSize=20&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
    const dataUsers: any = await axios.get("https://62d937e65d893b27b2e0cf08.mockapi.io/lucci-pizza/users")

    return {
        props: {
            dataArticles: dataArticles.data,
            dataUsers: dataUsers.data
        }
    }
}

export default PostPage
