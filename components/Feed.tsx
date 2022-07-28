import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'

type Props = {}

const Feed = (props: Props) => {
  return (
    <div className='ml-[70px] xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[70px] flex-grow max-w-xl'>
        <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b flex justify-between border-gray-200 items-center'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className="hoverEffect flex justify-center items-center w-[40px] h-[40px] px-0">
                <SparklesIcon className='h-5'/>
            </div>
        </div>
    </div>
  )
}

export default Feed