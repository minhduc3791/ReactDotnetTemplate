import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input } from 'semantic-ui-react'
import { addProduct } from 'services/productServices';

const AddProduct = ({ setLoading, addData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const _addData = async () => {
        setLoading(true);
        const newData = await addProduct({ name, price });
        //handle error
        addData(newData);
        setLoading(false);
        setModalOpen(false);
    }

    const isNum = value => {
        return /^\d+$/.test(value);
    }

    const _handleChangePrice = value => {
        if (isNum(value))
            setPrice(value);
    }

    useEffect(() => {
        if (modalOpen) {
            setName('');
            setPrice('');
        }
    }, [modalOpen]);

    useEffect(() => {
        if (name && price && name.length > 0 && price.length > 0) {
            setDisabled(false);
        } else {
            if (isNum(price))
                setDisabled(true);
            else
                setDisabled(false);
        }
    }, [name, price]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => { setModalOpen(false) }}
            trigger={<Button primary onClick={() => { setModalOpen(true) }}>New Product</Button>} centered>
            <Modal.Header>Create product</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <Input placeholder='Price' value={price} onChange={e => _handleChangePrice(e.target.value)} />
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

export default AddProduct;