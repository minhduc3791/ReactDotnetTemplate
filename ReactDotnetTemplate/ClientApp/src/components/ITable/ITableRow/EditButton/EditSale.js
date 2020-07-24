import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Input, Form, Dropdown } from 'semantic-ui-react'

const EditSale = ({ data, handleEdit, relatedData }) => {
    const { customers, products, stores } = relatedData;
    const { id, customerId, productId, storeId, dateSold } = data;

    const [openModal, setOpenModal] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [currentCustomerId, setCurrentCustomerId] = useState(customerId);
    const [currentProductId, setCurrentProductId] = useState(productId);
    const [currentStoreId, setCurrentStoreId] = useState(storeId);
    const [currentDateSold, setCurrentDateSold] = useState(dateSold);

    useEffect(() => {
        if (currentStoreId === storeId && currentCustomerId === customerId && currentStoreId === storeId && currentDateSold === dateSold) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [currentCustomerId, currentProductId, currentStoreId, currentDateSold]);

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
                        <label>Date Sold</label>
                        <Input value={currentDateSold} onChange={(e) => { setCurrentDateSold(e.target.value) }} />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            onChange={(e, { value }) => { setCurrentCustomerId(value) }}
                            fluid
                            options={customers.length > 0 ? customers.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Customer"
                            value={currentCustomerId}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            onChange={(e, { value }) => { setCurrentProductId(value) }}
                            fluid
                            options={products.length > 0 ? products.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Product"
                            value={currentProductId}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            onChange={(e, { value }) => { setCurrentStoreId(value) }}
                            fluid
                            options={stores.length > 0 ? stores.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Store"
                            value={currentStoreId}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => { setOpenModal(false) }}>Cancel</Button>
                <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => handleEdit({ id: id, customerId: currentCustomerId, productId: currentProductId, storeId: currentStoreId, dateSold: currentDateSold })}>Edit<Icon name="check" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditSale;