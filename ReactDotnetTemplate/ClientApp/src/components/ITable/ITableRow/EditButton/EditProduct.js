﻿import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Input, Form } from 'semantic-ui-react'

const EditProduct = ({ data, handleEdit }) => {
    const { id, name, price } = data;

    const [openModal, setOpenModal] = useState(false);
    const [currentName, setCurrentName] = useState(name);
    const [currentPrice, setCurrentPrice] = useState(price);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (currentName && currentPrice && currentName.length > 0 && currentPrice.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [currentName, currentPrice]);

    return (
        <Modal size="small" open={openModal} onClose={() => setOpenModal(false)}
            trigger={<Button icon labelPosition='left' color="yellow"
                onClick={() => setOpenModal(true)}>
                <Icon name='edit' />
                Edit</Button>} centered>
            <Modal.Header>Edit Product</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <Input value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => { setOpenModal(false) }}>Cancel</Button>
                <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => handleEdit(id, currentName, currentPrice)}>Edit<Icon name="check" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditProduct;