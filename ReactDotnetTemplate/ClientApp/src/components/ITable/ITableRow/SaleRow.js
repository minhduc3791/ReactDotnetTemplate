import React from 'react';
import { Table } from 'semantic-ui-react'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const SaleRow = ({ data, handleEdit, handleDelete, relatedData }) => {
    const { id, customerId, productId, storeId, dateSold } = data;
    const { customers, products, stores } = relatedData;

    const customerName = (customers && customers.length) > 0 ? customers.filter(c => c.id === customerId)[0].name : ''
    const productName = (products && products.length) > 0 ? products.filter(c => c.id === productId)[0].name : ''
    const storeName = (stores && stores.length > 0) ? stores.filter(c => c.id === storeId)[0].name : ''

    return (
        <Table.Row key={id}>
            <Table.Cell>{customerName}</Table.Cell>
            <Table.Cell>{productName}</Table.Cell>
            <Table.Cell>{storeName}</Table.Cell>
            <Table.Cell>{dateSold}</Table.Cell>
            <Table.Cell>
                <EditButton modelName="Sale" data={data} relatedData={relatedData} handleEdit={handleEdit} />
            </Table.Cell>
            <Table.Cell>
                <DeleteButton id={id} handleDelete={handleDelete} />
            </Table.Cell>
        </Table.Row>
    )
}

export default SaleRow;