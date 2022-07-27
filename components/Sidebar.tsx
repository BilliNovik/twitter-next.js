import Image from 'next/image'
import React from 'react'

import SidebarMenuItem from './SidebarMenuItem'

import logo from '../public/img/twitter-logo.png'
import { BellIcon, HomeIcon, InboxIcon } from '@heroicons/react/solid'
import { DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, UserIcon } from '@heroicons/react/outline'

type Props = {

}

const Sidebar = (props: Props) => {
    return (
        <div className='sm-flex flex-col p-2 xl:items-start h-full fixed'> 
            <div className='hoverEffect flex items-center justify-center hover:bg-blue-100 xl:justify-start '>
                <Image src={logo} width="25" height="25" />
            </div>
            <div className='pb-2 mb-2.5'>
                <SidebarMenuItem text="Home" icon={HomeIcon} active/>
                <SidebarMenuItem text="Explore" icon={HashtagIcon} />
                <SidebarMenuItem text="Notifications" icon={BellIcon} />
                <SidebarMenuItem text="Message" icon={InboxIcon} />
                <SidebarMenuItem text="Profile" icon={UserIcon} />
                <SidebarMenuItem text="More" icon={DotsCircleHorizontalIcon} />
            </div>
            <button className='bg-blue-400 mb-2 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>Tweet</button>
            <div className='hoverEffect text-gray-700 flex items-center justify-start xl:justify-start mt-auto'>
                <Image src='http://tricky-photoshop.com/wp-content/uploads/2017/08/final-1.png' width='50' height='50' className='rounded-full' />
                <div className='leading-5 hidden xl:inline ml-2'>
                    <h4 className='font-bold'>BNB Chain</h4>
                    <span className='text-gray-500'>@BNBCHAIN</span>
                </div>
                <DotsHorizontalIcon className='h-5 xl:ml-auto hidden xl:inline' />
            </div>
        </div>
    )
}

export default Sidebar