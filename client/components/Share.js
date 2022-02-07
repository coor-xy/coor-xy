import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

function Share (chart) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = chart.id
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Share
      </Button>

      <Modal show={show}
      onHide={handleClose}
      animation={false}>
        <div className="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Sharable URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>{window.location + `/share/${id}`} </Modal.Body>
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
