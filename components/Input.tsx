import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"

import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'

type Props = {}

const Input = (props: Props) => {

    const { data: session }: any = useSession()

    return (
        <>
            {session &&
                <div className='border-b border-gray-200 p-3 flex space-x-3'>
                    <div>
                        <Image src={session.user.image}
                            width='50' height='50' className='rounded-full cursor-pointer hover:brightness-95' alt='user-img'
                            onClick={signOut} />
                    </div>
                    <div className="w-full divide-y divide-gray-200">
                        <div className="">
                            <textarea className='w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide 
                    text-gray-700 resize-none' rows={2} placeholder="What's happening?"></textarea>
                        </div>
                        <div className="flex items-center justify-between pt-2.5">
                            <div className="flex">
                                <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                            </div>
                            <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Tweet</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Input