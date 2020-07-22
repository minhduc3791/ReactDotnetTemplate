import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react'

const DeleteButton = ({ id, handleDelete }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Modal size="small" open={openModal} onClose={() => { setOpenModal(false) }}
            trigger={<Button icon labelPosition='left' color="red"
                onClick={() => setOpenModal(true)}>
                <Icon name='delete' />
                DELETE</Button>} centered>
            <Modal.Header>Delete customer</Modal.Header>
            <Modal.Content>
                <h1>Are you sure?</h1>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => { setOpenModal(false) }}>Cancel</Button>
                <Button color="red" icon labelPosition="right" onClick={() => handleDelete(id)}>Delete<Icon name="close" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteButton;