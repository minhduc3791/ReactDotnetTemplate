import React, { useState } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react'

const DataDeleteButton = ({ id, modelName, handleDelete }) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Modal size="small" open={openModal} onClose={() => { setOpenModal(false) }}
            trigger={<Button icon labelPosition='left' color="red"
                onClick={() => setOpenModal(true)}>
                <Icon name='delete' />
                DELETE</Button>} centered>
            <Modal.Header>Delete {modelName}</Modal.Header>
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

export default DataDeleteButton;