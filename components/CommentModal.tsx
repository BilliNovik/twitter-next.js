import React from 'react'
import { useRecoilState } from 'recoil'

import { modalCommentState } from '../atom/modalAtom'
import Modal from './Modal'

const CommentModal = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useRecoilState(modalCommentState)

    const onCloseModal = async () => {
        setIsOpenModal(false)
        document.body.style.overflow = 'auto'
    }

    return (
        <Modal isOpenModal={isOpenModal} onCloseModal={onCloseModal} maxWidthParam='550px'>
            <h2>modal</h2>
        </Modal>
    )
}

export default CommentModal