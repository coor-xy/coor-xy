import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import ShareableUrl from './ShareableUrl';


function Share ({id}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkForSave = (id) => {
    if (id === undefined) {
      return "Save your work to share!"
    }
    return window.location.protocol + window.location.hostname + ':' + window.location.port + `/share/${id}`
  }
  return (
    <div >
      {console.log(id)}
      <Button variant="primary" onClick={handleShow}>
        Share
      </Button>

      <Modal show={show}
      onHide={handleClose}
      animation={false}>
        <div className="modal-container">
        <Modal.Header >
          <Modal.Title className="modal-title">Sharable URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>{checkForSave(id)} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default Share
