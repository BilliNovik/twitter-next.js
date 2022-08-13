import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'
import { IPost } from '../global/types'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { AnimatePresence, motion } from "framer-motion";

import Input from './Input'
import Post from './Post'

type Props = {}

const Feed = (props: Props) => {

  const [posts, setPosts] = React.useState()

  React.useEffect(() => {
    onSnapshot(query(collection(db, "posts"), orderBy('date', 'desc')), (doc) => {
      setPosts(doc.docs)
    });

  }, [])

  return (
    <div className='ml-[70px] flex flex-col border-l border-r border-gray-200 max-w-[650px] md:min-w-[650px] xl:ml-[245px]'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b flex justify-between border-gray-200 items-center'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className="hoverEffect flex justify-center items-center w-[40px] h-[40px] px-0">
          <SparklesIcon className='h-5' />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {
          posts?.map(post => (
            <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
              <Post key={post.id} post={post} />
            </motion.div>
          ))
        }
      </AnimatePresence>
    </div>
  )
}

export default Feed