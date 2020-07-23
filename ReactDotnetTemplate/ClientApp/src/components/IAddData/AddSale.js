import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input, Dropdown } from 'semantic-ui-react'
import { addProduct } from 'services/productServices';

const AddSale = ({ setLoading, addData, customers, products, stores, isFetching }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [customer, setCustomer] = useState(-1);
    const [product, setProduct] = useState(-1);
    const [store, setStore] = useState(-1);

    const _addData = async () => {
        setLoading(true);
        //const newData = await addProduct(name, price);
        //handle error
        //addData(newData);
        setLoading(false);
        setModalOpen(false);
    }

    useEffect(() => {
        if (customer !== -1 && product !== -1 && store !== -1) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [customer, product, store]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => { setModalOpen(false) }}
            trigger={<Button primary loading={isFetching} onClick={() => { setModalOpen(true) }}>New Sale</Button>} centered>
            <Modal.Header>Create sale</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            onChange={(e, { value }) => { setCustomer(value) }}
                            fluid
                            options={customers.length > 0 ? customers.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Customer"
                            value={customer}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <Dropdown
                            onChange={(e, { value }) => { setProduct(value) }}
                            fluid
                            options={products.length > 0 ? products.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Product"
                            value={product}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <Dropdown
                            onChange={(e, { value }) => { setStore(value) }}
                            fluid
                            options={stores.length > 0 ? stores.map(c => ({ ...c, key: c.id, text: c.name, value: c.id })) : []}
                            search
                            selection
                            placeholder="Select Store"
                            value={store}
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