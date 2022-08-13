import React from 'react'
import { useRecoilState } from 'recoil';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { deleteObject, ref } from 'firebase/storage';

import Modal from './Modal'
import { modalDeleteState, globalIDState, globalPostState } from '../atom/modalAtom'

type Props = {}

const DeleteModal = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useRecoilState(modalDeleteState)
    const [getId] = useRecoilState(globalIDState)
    const [getPost] = useRecoilState(globalPostState)

    const deletePost = async () => {
        onCloseModal()
        await deleteDoc(doc(db, `posts`, getId))

        if (getPost.image) {
            deleteObject(ref(storage, `posts/${getId}/image`))
        }
    }

    const onCloseModal = async () => {
        setIsOpenModal(false)
        document.body.style.overflow = 'auto'
    }

    return (
        <Modal isOpenModal={isOpenModal} onCloseModal={onCloseModal} maxWidthParam='320px'>
            {
                isOpenModal &&
                <>
                    <p className='text-lg font-bold'>Delete Tweet?</p>
                    <p className='text-[15px] leading-5 mt-2 text-gray-500'>This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results.</p>
                    <button className='bg-red-600 mt-3.5 mb-3.5 text-white rounded-full w-full h-11
                        shadow-md hover:brightness-95 text-base' onClick={deletePost}>Delete</button>
                    <button className='bg-transparent mb-3.5 text-black rounded-full w-full h-11 hover:brightness-95 text-base border' onClick={onCloseModal}>Cancel</button>
                </>
            }
        </Modal>
    )
}

export default DeleteModal