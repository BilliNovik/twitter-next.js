import React from 'react'
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import dateFormat from 'dateformat'
import { signIn, useSession } from 'next-auth/react'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useRecoilState } from 'recoil'

import { db } from '../firebase'
import { globalIDState, globalPostState, modalDeleteState } from '../atom/modalAtom'


const Comment = ({ originalPostId, comment }: any) => {

    const { data: session }: any = useSession()
    const getComment = comment.data()

    const [likes, setLikes] = React.useState<any>([])
    const [hasLiked, setHasLiked] = React.useState(false)

    React.useEffect(() => {
        onSnapshot(collection(db, 'posts', originalPostId, 'comments', comment.id, 'likes'), (doc): any => {
            setLikes(doc.docs)
        })
    }, [db])

    React.useEffect(() => {
        setHasLiked(likes.findIndex((like: any) => like.id === session?.user.uid) !== -1)
    }, [likes])

    const likeComment = async () => {
        if (!session) return signIn()

        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', originalPostId, 'comments', comment.id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', originalPostId, 'comments', comment.id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }
    }

    const deleteComment = async () => {
        await deleteDoc(doc(db, `posts`, originalPostId, 'comments', comment.id))
    }

    return (
        <>
            {
                getComment &&
                <div className="flex p-3 border-b border-gray-200 ml-4 relative">
                    <img className="h-11 w-11 rounded-full mr-4" src={getComment.userImg} alt="user-img" />
                    <span className="w-0.5 h-1/2 z-[-1] absolute left-8 top-11 bg-gray-300" />
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 whitespace-nowrap">
                                <h4 className="font-bold text-[14px] sm:text-[15px] hover:underline">
                                    {getComment.name}
                                </h4>
                                <span className="text-sm sm:text-[14px]">@{getComment.username} - </span>
                                <span className="text-sm sm:text-[14px] hover:underline">
                                    {dateFormat(getComment.date, "mmmm dS")}
                                </span>
                            </div>
                            <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                        </div>
                        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
                            {getComment.comment}
                        </p>
                        <img className="rounded-2xl mr-2" src={getComment.image} alt="" />
                        <div className="flex justify-between text-gray-500 p-2">
                            {
                                session.user?.uid === getComment?.id &&
                                <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" onClick={deleteComment} />
                            }
                            <div className='flex items-center'>
                                {
                                    hasLiked ?
                                        <HeartIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" onClick={likeComment} />
                                        :
                                        <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" onClick={likeComment} />
                                }
                                {
                                    likes.length > 0 &&
                                    <span className={`${hasLiked && "text-red-600"} text-sm select-none ml-1`}>{likes.length}</span>
                                }
                            </div>
                            <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                            <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Comment