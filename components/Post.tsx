import React, { useState } from 'react'
import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import dateFormat from 'dateformat'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { signIn, useSession } from 'next-auth/react';

import { IPost } from '../global/types'
import { deleteObject, ref } from 'firebase/storage';

type Props = {
    post: IPost,
}

const Post = ({ post }: Props) => {

    const { data: session } = useSession()
    const getPost = post.data()
    const getId = post.id

    const [likes, setLikes] = React.useState([])
    const [hasLiked, setHasLiked] = React.useState(false)

    React.useEffect(() => {
        onSnapshot(collection(db, "posts", getId, 'likes'), (doc) => {
            setLikes(doc.docs)
        });
    }, [db])

    React.useEffect(() => {
        setHasLiked(likes.findIndex(like => like.id === session?.user.uid) !== -1)
    }, [likes])

    const likePost = async () => {
        if (!session) return signIn()

        if (hasLiked) {
            await deleteDoc(doc(db, `posts`, getId, 'likes', session.user.uid))

        } else {
            await setDoc(doc(db, `posts`, getId, 'likes', session.user.uid), {
                username: session.user.username
            })
        }
    }

    const deletePost = async () => {
        await deleteDoc(doc(db, `posts`, getId))

        if (getPost.image) {
            deleteObject(ref(storage, `posts/${getId}/image`))
        }
    }

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200">
            <img className="h-11 w-11 rounded-full mr-4" src={getPost.userImg} alt="user-img" />
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-[14px] sm:text-[15px] hover:underline">
                            {getPost.name}
                        </h4>
                        <span className="text-sm sm:text-[14px]">@{getPost.username} - </span>
                        <span className="text-sm sm:text-[14px] hover:underline">
                            {dateFormat(getPost.date, "mmmm dS")}
                        </span>
                    </div>
                    <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                </div>
                <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
                    {getPost.text}
                </p>
                <img className="rounded-2xl mr-2" src={getPost.image} alt="" />
                <div className="flex justify-between text-gray-500 p-2">
                    <ChatIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    {
                        session?.user.uid === getPost.id &&
                        <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" onClick={deletePost} />
                    }
                    <div className='flex items-center'>
                        {
                            hasLiked ?
                                <HeartIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" onClick={likePost} />
                                :
                                <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" onClick={likePost} />
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
    )
}

export default Post