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

    useEffect(() => {
        if (customerId !== -1 && productId !== -1 && storeId !== -1) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [customerId, productId, storeId]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => { setModalOpen(false) }}
            trigger={<Button primary loading={isFetching} onClick={() => { setModalOpen(true) }}>New Sale</Button>} centered>
            <Modal.Header>Create sale</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date Sold</label>
                        <Input value={dateSold} onChange={(e) => { setDateSold(e.target.value)}} />
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