import React from 'react';
import { Table } from 'semantic-ui-react'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const ProductRow = ({ data, modelName, handleEdit, handleDelete }) => {
    const { id, name, price } = data;

    return (
        <Table.Row key={id}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{price}</Table.Cell>
            <Table.Cell>
                <EditButton modelName={modelName} data={data} handleEdit={handleEdit} />
            </Table.Cell>
            <Table.Cell>
                <DeleteButton id={id} modelName={modelName} handleDelete={handleDelete} />
            </Table.Cell>
        </Table.Row>
    )
}

export default ProductRow;