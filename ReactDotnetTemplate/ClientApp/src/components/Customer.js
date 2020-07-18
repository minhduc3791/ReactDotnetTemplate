import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input } from 'semantic-ui-react'
import ITable from './ITable'

const Customer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleSort = (clickedColumn) => () => {

        if (column !== clickedColumn) {
            setColumn(clickedColumn);
            setData(data);
            setDirection('ascending');

            return
        }

        //sort data before set
        setData(data);
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    }

    const fetchData = async () => {
        const response = await fetch('customers');
        const data = await response.json();
        console.log(data);
        setData(data);
        setLoading(false);
    }

    const clearForm = () => {
        setCustomerName('');
        setCustomerAddress('');
        setModalOpen(false);
    }

    const addCustomer = async () => {
        setLoading(true);
        const response = await fetch('customers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: customerName, address: customerAddress })
        });
        const newData = await response.json();
        setData([...data, newData]);
        setLoading(false);
        clearForm();
    }

    const handleEdit = async (id, newName, newAddress) => {
        setLoading(true);
        const response = await fetch('customers/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, name: newName, address: newAddress })
        });
        if (response.status === 204) {
            setData(data.map(d => (d.id === id ? { 'id': id, 'name': newName, 'address': newAddress } : d)));
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (customerName && customerAddress && customerName.length > 0 && customerAddress.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [customerName, customerAddress]);

    return (
        <>
            <Modal size="small" open={modalOpen} onClose={clearForm}
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
                            <Input placeholder='Address' value={customerAddress} onChange={e => setCustomerAddress(e.target.value)}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={clearForm}>Cancel</Button>
                    <Button disabled={disabled} color="green" icon labelPosition="right" onClick={addCustomer}>Create<Icon name="check" /></Button>
                </Modal.Actions>
            </Modal>
            {loading
                ? <p><em>Loading...</em></p>
                : <ITable data={data} column={column} direction={direction} handleSort={handleSort} handleEdit={handleEdit} />}
        </>
    );
}

export default Customer;
