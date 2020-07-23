import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input } from 'semantic-ui-react'
import { addProduct } from 'services/productServices';

const AddSale = ({ setLoading, addData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const _addData = async () => {
        setLoading(true);
        const newData = await addProduct(name, price);
        //handle error
        addData(newData);
        setLoading(false);
        setModalOpen(false);
    }

    useEffect(() => {
        if (name && price && name.length > 0 && price.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, price]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => { setModalOpen(false) }}
            trigger={<Button primary onClick={() => { setModalOpen(true) }}>New Sale</Button>} centered>
            <Modal.Header>Create sale</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Input placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
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

export default AddSale;