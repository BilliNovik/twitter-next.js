import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'

import Input from './Input'
import Post from './Post'
import { IPost } from '../global/types'

type Props = {}

const Feed = (props: Props) => {

  const posts: IPost[] = [
    {
      id: '1',
      name: 'Cook Cooker',
      username: 'cookcooker',
      userImg: 'http://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png',
      img: 'https://images.unsplash.com/photo-1592689891352-f185cc4b9179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      text: 'he was arrested',
      timestamp: '2 hours ago',
    }
  ]

  return (
    <div className='ml-[70px] xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[70px] flex-grow max-w-xl'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b flex justify-between border-gray-200 items-center'>
        <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
        <div className="hoverEffect flex justify-center items-center w-[40px] h-[40px] px-0">
          <SparklesIcon className='h-5' />
        </div>
      </div>
      <Input />
      {
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      }
    </div>
  )
}

export default Feed