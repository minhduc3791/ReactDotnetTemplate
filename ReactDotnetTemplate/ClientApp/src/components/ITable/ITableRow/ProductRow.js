import React from 'react';
import { Table } from 'semantic-ui-react'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const ProductRow = ({ data, handleEdit, handleDelete }) => {
    const { id, name, price } = data;

    return (
        <Table.Row key={id}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{price}</Table.Cell>
            <Table.Cell>
                <EditButton modelName="Product" data={data} handleEdit={handleEdit} />
            </Table.Cell>
            <Table.Cell>
                <DeleteButton id={id} handleDelete={handleDelete} />
            </Table.Cell>
        </Table.Row>
    )
}

export default ProductRow;