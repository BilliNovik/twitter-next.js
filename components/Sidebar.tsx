import Image from 'next/image'
import React from 'react'
import { useSession, signIn } from "next-auth/react"
import { BellIcon, HomeIcon, InboxIcon } from '@heroicons/react/solid'
import { DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, UserIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

import SidebarMenuItem from './SidebarMenuItem'
import logo from '../public/img/twitter-logo.png'

const Sidebar = () => {

    const { data: session }: any = useSession()
    const router = useRouter()

    return (
        <div className='sm-flex flex flex-col p-2 xl:items-start h-full fixed max-w-[250px]'>
            <div className='hoverEffect flex items-center justify-center hover:bg-blue-100 xl:justify-start '>
                <Image src={logo} onClick={() => router.push('/')} width="25" height="25" alt='logo' />
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
                session ? <button className='bg-blue-400 mb-2 text-white rounded-full w-full h-12 font-bold shadow-md
                    hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>
                    : <button className='bg-blue-400 mb-2 text-white rounded-full w-full h-12 font-bold shadow-md 
                    hover:brightness-95 text-lg hidden xl:inline' onClick={(event: React.MouseEvent) => signIn}>Sign in</button>
            }
            {session &&
                <div className='p-1 hoverEffect text-gray-700 flex items-center justify-start xl:justify-start mt-auto w-full'>
                    <Image src={session.user.image} width='50' height='50' className='rounded-full' alt='user image' />
                    <div className='leading-5 hidden xl:inline xl:ml-2'>
                        <h4 className='font-bold text-[13px]'>{session.user.name.slice(0, 17)}...</h4>
                        <span className='text-gray-500 text-[13px]'>@{session.user.username.slice(0, 14)}...</span>
                    </div>
                    <DotsHorizontalIcon className='h-5 xl:ml-auto hidden xl:inline pl-3' />
                </div>
            }
        </div>
    )
}

export default Sidebar