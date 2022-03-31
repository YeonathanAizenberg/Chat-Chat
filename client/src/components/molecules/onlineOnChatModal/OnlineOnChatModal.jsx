import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './OnlineOnChatModal.css';

function OnlineOnChatModal({show, onHide, data}) {

    return (
        <Modal
            show={show} 
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    With you on Chat right now:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='online-users-list-wrapper'>
                    {data?.map((person) => 
                        <div>
                            {person}
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OnlineOnChatModal;