import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Input, Form } from 'semantic-ui-react'

const EditStore = ({ data, handleEdit }) => {
    const { id, name, address } = data;

    const [openModal, setOpenModal] = useState(false);
    const [currentName, setCurrentName] = useState(name);
    const [currentAddress, setCurrentAddress] = useState(address);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (currentName && currentAddress && currentName.length > 0 && currentAddress.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [currentName, currentAddress]);

    return (
        <Modal size="small" open={openModal} onClose={() => setOpenModal(false)}
            trigger={<Button icon labelPosition='left' color="yellow"
                onClick={() => setOpenModal(true)}>
                <Icon name='edit' />
                Edit</Button>} centered>
            <Modal.Header>Create customer</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Input value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => { setOpenModal(false) }}>Cancel</Button>
                <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => handleEdit(id, currentName, currentAddress)}>Edit<Icon name="check" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditStore;