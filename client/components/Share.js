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
    // Need to change this before deploy
    return window.location.protocol + window.location.hostname + ':' + window.location.port +`/share/${id}`
  }
  return (
    <div>
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossOrigin="anonymous"
/>
      <button variant="primary" onClick={handleShow}>
        Share
      </button>

      <Modal show={show}
      onHide={handleClose}
      animation={true}
      >
        <Modal.Header >
          <Modal.Title >Sharable URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>{checkForSave(id)} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Share
