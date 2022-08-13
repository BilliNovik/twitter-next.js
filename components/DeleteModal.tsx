import React from 'react'
import { useRecoilState } from 'recoil';

import Modal from './Modal'
import { modalState } from '../atom/modalAtom'

type Props = {}

const DeleteModal = (props: Props) => {
    const [open, setOpen] = useRecoilState(modalState)

    return (
        <Modal isOpen={open} setOpen={setOpen}>
            {
                open && <h3>DeleteModal</h3>
            }
        </Modal>
    )
}

export default DeleteModal