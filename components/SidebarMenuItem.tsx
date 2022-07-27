import React from 'react'

type Props = {
    text: string
    icon: any
    active?: boolean
}

const SidebarMenuItem = (props: Props) => {
    return (
        <div className='hoverEffect flex items-center justify-center text-gray-700 xl:justify-start text-lg space-x-3'>
            <props.icon className="h-7" />
            <span className={`${props.active && 'font-bold'} hidden xl:inline`}>{props.text}</span>
        </div>
    )
}

export default SidebarMenuItem