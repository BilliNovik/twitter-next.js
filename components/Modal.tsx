import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('.modal')

const ModalReact = ({ children, isOpenModal, maxWidthParam, onCloseModal }) => {

    const afterOpenModal = () => {
        document.body.style.overflow = 'hidden'
        document.querySelector<HTMLInputElement>('.ReactModal__Overlay').style.background = 'rgba(0, 0, 0, 0.4)'
        document.querySelector<HTMLInputElement>('.ReactModal__Overlay').style.zIndex = '999'
    }

    return (
        <div className='modal'>
            <Modal isOpen={isOpenModal} onRequestClose={onCloseModal} onAfterOpen={afterOpenModal} style={{ content: { maxWidth: maxWidthParam } }}
                className={`outline-none ml-2 mr-2 w-[100%] absolute top-[20%] left-[50%] translate-x-[-50%] bg-white rounded-xl p-8`}>
                {children}
            </Modal>
        </div>
    )
}

export default ModalReact as Modal