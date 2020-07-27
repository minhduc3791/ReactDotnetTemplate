import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Input, Form, Dropdown } from 'semantic-ui-react'

const EditSale = ({ data, handleEdit, relatedData }) => {
    const { customers, products, stores } = relatedData;
    const { id, customerId, productId, storeId, dateSold } = data;

    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [currentCustomerId, setCurrentCustomerId] = useState(customerId);
    const [currentProductId, setCurrentProductId] = useState(productId);
    const [currentStoreId, setCurrentStoreId] = useState(storeId);
    const [currentDateSold, setCurrentDateSold] = useState(dateSold);

    const handleChangeDate = value => {
        if (value.length === 0 || /[\d/]+$/.test(value))
            setCurrentDateSold(value);
    }

    // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
    const isValidDate = dateString => {
        // First check for the pattern
        if (dateString.length === 0)
            return false;

        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month === 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    useEffect(() => {
        if (currentStoreId === storeId && currentCustomerId === customerId && currentStoreId === storeId && currentDateSold === dateSold) {
            setDisabled(true);
        } else {
            if (isValidDate(currentDateSold))
                setDisabled(false);
            else
                setDisabled(true);
        }
    }, [currentCustomerId, currentProductId, currentStoreId, currentDateSold]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => setModalOpen(false)}
            trigger={<Button icon labelPosition='left' color="yellow"
                onClick={() => setModalOpen(true)}>
                <Icon name='edit' />
                Edit</Button>} centered>
            <Modal.Header>Create customer</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date Sold</label>
                        <Input value={currentDateSold} onChange={(e) => { handleChangeDate(e.target.value) }} />
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
                <Button color="black" onClick={() => { setModalOpen(false) }}>Cancel</Button>
                <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => handleEdit({ id: id, customerId: currentCustomerId, productId: currentProductId, storeId: currentStoreId, dateSold: currentDateSold })}>Edit<Icon name="check" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditSale;