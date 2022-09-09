import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const ContentModal = ({showModal, fileContent, fileKey, setShowModal, deleteFile}) => {

    const onClickDeleteBtnHandler = () => {
        deleteFile(fileKey)
        setShowModal(false)
    }
    return (
        <Modal show={showModal} centered>
            <Modal.Header>
                File Content
            </Modal.Header>
            <Modal.Body>
                {fileContent}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={()=>onClickDeleteBtnHandler()}>
                    파일삭제
                </Button>
                <Button variant="secondary" onClick={()=>setShowModal(false)}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ContentModal;