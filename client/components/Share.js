import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

const Share = () => {

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div>
      <Button variant="primary" onClick={handleOpen}>
        Launch demo modal
      </Button>

      <Modal show={open} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Shareable URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Share
