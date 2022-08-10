import Image from 'next/image'
import React from 'react'
import { useSession, signIn } from "next-auth/react"
import { BellIcon, HomeIcon, InboxIcon } from '@heroicons/react/solid'
import { DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, UserIcon } from '@heroicons/react/outline'

import SidebarMenuItem from './SidebarMenuItem'
import logo from '../public/img/twitter-logo.png'

type Props = {

}

const Sidebar = (props: Props) => {

    const { data: session }: any = useSession()

    return (
        <div className='sm-flex flex flex-col p-2 xl:items-start h-full fixed xl:mr-[370px]'>
            <div className='hoverEffect flex items-center justify-center hover:bg-blue-100 xl:justify-start '>
                <Image src={logo} width="25" height="25" />
            </div>
            <div className='pt-4 pb-2 mb-2.5'>
                <SidebarMenuItem text="Home" icon={HomeIcon} active />
                <SidebarMenuItem text="Explore" icon={HashtagIcon} />
                {session &&
                    <>
                        <SidebarMenuItem text="Notifications" icon={BellIcon} />
                        <SidebarMenuItem text="Message" icon={InboxIcon} />
                        <SidebarMenuItem text="Profile" icon={UserIcon} />
                        <SidebarMenuItem text="More" icon={DotsCircleHorizontalIcon} />
                    </>
                }

            </div>
            {
                session ? <button className='bg-blue-400 mb-2 text-white rounded-full w-56 h-12 font-bold shadow-md
                    hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>
                    : <button className='bg-blue-400 mb-2 text-white rounded-full w-56 h-12 font-bold shadow-md 
                    hover:brightness-95 text-lg hidden xl:inline' onClick={signIn}>Sign in</button>
            }
            {session &&
                <div className='hoverEffect text-gray-700 flex items-center justify-start xl:justify-start mt-auto w-full'>
                    <Image src={session.user.image} width='50' height='50' className='rounded-full' />
                    <div className='leading-5 hidden xl:inline xl:ml-2'>
                        <h4 className='font-bold'>{session.user.name}</h4>
                        <span className='text-gray-500'>@{session.user.username}</span>
                    </div>
                    <DotsHorizontalIcon className='h-5 xl:ml-auto hidden xl:inline' />
                </div>
            }
        </div>
    )
}

export default Sidebar