import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input, Dropdown } from 'semantic-ui-react'
import { addSale } from 'services/saleServices';

const AddSale = ({ setLoading, addData, customers, products, stores, isFetching }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [customerId, setCustomerId] = useState(-1);
    const [productId, setProductId] = useState(-1);
    const [storeId, setStoreId] = useState(-1);
    const [dateSold, setDateSold] = useState('');

    const _addData = async () => {
        setLoading(true);
        const newData = await addSale({customerId, productId, storeId, dateSold});
        //handle error
        addData(newData);
        setLoading(false);
        setModalOpen(false);
    }

    const handleChangeDate = value => {
        if (value.length === 0 || /[\d\/]+$/.test(value))
            setDateSold(value);
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
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

    useEffect(() => {
        if (customerId !== -1 && productId !== -1 && storeId !== -1 && isValidDate(dateSold)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [customerId, productId, storeId, dateSold]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => { setModalOpen(false) }}
            trigger={<Button primary loading={isFetching} onClick={() => { setModalOpen(true) }}>New Sale</Button>} centered>
            <Modal.Header>Create sale</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date Sold</label>
                        <Input value={dateSold} placeholder="mm/dd/yyyy" onChange={(e) => { handleChangeDate(e.target.value) }} />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            onChange={(e, { value }) => { setCustomerId(value) }}
                            fluid
                            options={customers.length > 0 ? customers.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Customer"
                            value={customerId}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            onChange={(e, { value }) => { setProductId(value) }}
                            fluid
                            options={products.length > 0 ? products.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Product"
                            value={productId}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            onChange={(e, { value }) => { setStoreId(value) }}
                            fluid
                            options={stores.length > 0 ? stores.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Store"
                            value={storeId}
                        />
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