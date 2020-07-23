import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input } from 'semantic-ui-react'
import { addStore } from 'services/storeServices';

const AddStore = ({ setLoading, addData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const _addData = async () => {
        setLoading(true);
        const newData = await addStore({name, address});
        //handle error
        addData(newData);
        setLoading(false);
        setModalOpen(false);
    }

    useEffect(() => {
        if (name && address && name.length > 0 && address.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, address]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => { setModalOpen(false) }}
            trigger={<Button primary onClick={() => { setModalOpen(true) }}>New Store</Button>} centered>
            <Modal.Header>Create store</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Input placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => { setModalOpen(false) }}>Cancel</Button>
                <Button disabled={disabled} color="green" icon labelPosition="right" onClick={_addData}>Create<Icon name="check" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default AddStore;