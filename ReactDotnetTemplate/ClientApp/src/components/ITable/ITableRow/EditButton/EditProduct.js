import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Input, Form } from 'semantic-ui-react'

const EditProduct = ({ data, handleEdit }) => {
    const { id, name, price } = data;

    const [openModal, setOpenModal] = useState(false);
    const [currentName, setCurrentName] = useState(name);
    const [currentPrice, setCurrentPrice] = useState(price);
    const [disabled, setDisabled] = useState(true);

    const isNum = value => {
        return /^\d+$/.test(value);
    }

    const _handleChangePrice = value => {
        if (isNum(value))
            setCurrentPrice(value);
    }

    useEffect(() => {
        if (currentName && currentPrice && currentName.length > 0 && currentPrice.length > 0) {
            setDisabled(false);
        } else {
            if (isNum(currentPrice))
                setDisabled(true);
            else
                setDisabled(false);
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
                        <Input value={currentPrice} onChange={(e) => _handleChangePrice(e.target.value)} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => { setOpenModal(false) }}>Cancel</Button>
                <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => handleEdit({ id: id, name: currentName, price: currentPrice })}>Edit<Icon name="check" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditProduct;