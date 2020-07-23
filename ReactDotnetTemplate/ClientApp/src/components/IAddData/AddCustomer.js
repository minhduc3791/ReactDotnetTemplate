import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input } from 'semantic-ui-react'
import { addCustomer } from 'services/customerServices';

const AddCustomer = ({ setLoading, addData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    const _addCustomer = async () => {
        setLoading(true);
        const newData = await addCustomer(customerName, customerAddress);
        //handle error
        addData(newData);
        setLoading(false);
        setModalOpen(false);
    }

    useEffect(() => {
        if (customerName && customerAddress && customerName.length > 0 && customerAddress.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [customerName, customerAddress]);

    return (
        <Modal size="small" open={modalOpen} onClose={() => { setModalOpen(false) }}
            trigger={<Button primary onClick={() => { setModalOpen(true) }}>New Customer</Button>} centered>
            <Modal.Header>Create customer</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input placeholder='Name' value={customerName} onChange={e => setCustomerName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Input placeholder='Address' value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => { setModalOpen(false) }}>Cancel</Button>
                <Button disabled={disabled} color="green" icon labelPosition="right" onClick={_addCustomer}>Create<Icon name="check" /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default AddCustomer;