import React from 'react';
import { Table } from 'semantic-ui-react'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const SaleRow = ({ data, modelName, handleEdit, handleDelete, relatedData }) => {
    const { id, customerId, productId, storeId, dateSold } = data;
    const { customers, products, stores } = relatedData;

    const customer = (customers && customers.length) > 0 && customers.filter(c => c.id === customerId)
    const customerName = (customer && customer.length > 0) ? customer[0].name : '';
    const product = (products && products.length) > 0 && products.filter(c => c.id === productId)
    const productName = (product && product.length > 0) ? product[0].name : '';
    const store = (stores && stores.length > 0) && stores.filter(c => c.id === storeId)
    const storeName = (store && store.length > 0) ? store[0].name : '';

    return (
        <Table.Row key={id}>
            <Table.Cell>{customerName}</Table.Cell>
            <Table.Cell>{productName}</Table.Cell>
            <Table.Cell>{storeName}</Table.Cell>
            <Table.Cell>{dateSold}</Table.Cell>
            <Table.Cell>
                <EditButton modelName={modelName} data={data} relatedData={relatedData} handleEdit={handleEdit} />
            </Table.Cell>
            <Table.Cell>
                <DeleteButton id={id} modelName={modelName} handleDelete={handleDelete} />
            </Table.Cell>
        </Table.Row>
    )
}

export default SaleRow;