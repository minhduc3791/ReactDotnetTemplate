import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Icon, Input } from 'semantic-ui-react'
import ITable from './ITable'
import IPaging from './IPaging';

import { fetchCustomer, editCustomer, deleteCustomer, addCustomer } from '../services/customerServices';

const SORT_DIRECTION = {
    'ascending': 1,
    'descending': -1,
};

const Customer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [pageSize, _setPageSize] = useState(5);
    const [pageIndex, _setPageIndex] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const _sortArray = (arr, sortProp, sortDirection) => {
        return [...arr].sort((a, b) => (b[sortProp].localeCompare(a[sortProp]) === sortDirection ? 1 : -1));
    }

    useEffect(() => {
        if (data.length > 0 && column !== null && direction !== null) {
            setData(_sortArray(data, column, SORT_DIRECTION[direction]));
        }
    }, [column, direction])

    const _handleSort = (clickedColumn) => {
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
        setColumn(clickedColumn);
    }

    const fetchData = async () => {
        const paginatedData = await fetchCustomer(pageSize, pageIndex);
        //handle error

        setData(paginatedData.data);
        setHasNextPage(paginatedData.hasNextPage);
        setHasPreviousPage(paginatedData.hasPreviousPage);
        setTotalPages(paginatedData.totalPages);
        setLoading(false);
    }

    const clearForm = () => {
        setCustomerName('');
        setCustomerAddress('');
        setModalOpen(false);
    }

    const addCustomer = async () => {
        setLoading(true);
        const newData = await addCustomer(customerName, customerAddress);
        //handle error
        setData([...data, newData]);
        setLoading(false);
        clearForm();
    }

    const _handleEdit = async (id, name, address) => {
        setLoading(true);
        const response = await editCustomer(id, name, address);
        if (response.status === 204) {
            setData(data.map(d => (d.id === id ? { 'id': id, 'name': name, 'address': address } : d)));
        }
        setLoading(false);
    }

    const _handleDelete = async (id) => {
        setLoading(true);
        const response = await deleteCustomer(id);

        if (response.status === 200) {
            setData(data.filter(d => d.id !== id));
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [pageSize, pageIndex])

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
                : <>
                    <ITable data={data} column={column} direction={direction} handleSort={_handleSort} handleEdit={_handleEdit} handleDelete={_handleDelete} />
                    <IPaging pageSize={pageSize} pageIndex={pageIndex} setPageIndex={_setPageIndex} setPageSize={_setPageSize}
                        totalPages={totalPages} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} />
                </>
                }
        </>
    );
}

export default Customer;
