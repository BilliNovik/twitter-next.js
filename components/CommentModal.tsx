import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useRecoilState } from 'recoil'
import dateFormat from 'dateformat'
import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'

import { db } from '../firebase'
import { globalIDState, globalPostState, modalCommentState } from '../atom/modalAtom'
import Modal from './Modal'

const CommentModal = (props: Props) => {

    const [isOpenModal, setIsOpenModal] = useRecoilState(modalCommentState)
    const [getId] = useRecoilState(globalIDState)
    const [getPost] = useRecoilState(globalPostState)

    const [posts, setPosts] = React.useState(null)
    const [inputValue, setInputValue]: any = React.useState('')

    const { data: session } = useSession()
    console.log(session)

    React.useEffect(() => {
        onSnapshot(doc(db, "posts", getId,), (doc) => {
            setPosts(doc.docs)
        });
    }, [getId, db])

    const onCloseModal = async () => {
        setIsOpenModal(false)
        document.body.style.overflow = 'auto'
    }

    return (
        <Modal isOpenModal={isOpenModal} onCloseModal={onCloseModal} maxWidthParam='580px'>
            <div className="p-2 flex items-center space-x-1 relative">
                <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
                <img className="h-11 w-11 rounded-full mr-4" src={getPost?.userImg} alt="user-img" />
                <h4 className="font-bold text-[11px] sm:text-[14px] hover:underline">{getPost?.name}</h4>
                <span className="text-sm sm:text-[13px]">@{getPost?.username} -{" "}</span>
                <span className="text-sm sm:text-[13px] hover:underline">{dateFormat(getPost?.date, "mmmm dS")}</span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
                {getPost?.text}
            </p>
            <div className="flex p-3 space-x-3">
                <img src={session?.user.image} alt="user-img" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" />
                <div className="w-full divide-y divide-gray-200">
                    <div className='border-b border-gray-200'>
                        <textarea className="w-full focus:ring-0 text-lg placeholder-gray-700 tracking-wide border-none
                        text-gray-700 resize-none" rows={2} placeholder="Tweet your reply" value={inputValue} onChange={e => setInputValue(e.target.value)}></textarea>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2.5">
                <div className="flex">
                    <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                </div>
                <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95
                    disabled:opacity-50"  disabled={!inputValue.trim()}> Reply</button>
            </div>
        </Modal>
    )
}

export default CommentModal