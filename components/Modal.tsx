import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('.modal')

const ModalReact = ({ children, isOpen, setOpen }) => {

    const afterOpenModal = () => {
        document.body.style.overflow = 'hidden'
        document.querySelector('.ReactModal__Overlay').style.background = 'rgba(0, 0, 0, 0.4)'
        document.querySelector('.ReactModal__Overlay').style.zIndex = '999'
    }

    const onRequestClose = () => {
        document.body.style.overflow = 'auto'
        setOpen(false)
    }

    return (
        <div className='modal'>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} onAfterOpen={afterOpenModal}
                className="outline-none max-w-lg ml-2 mr-2 w-[100%] absolute top-[20%] left-[50%] translate-x-[-50%] bg-white rounded-xl p-8">
                {children}
            </Modal>
        </div>
    )
}

export default ModalReact as Modal