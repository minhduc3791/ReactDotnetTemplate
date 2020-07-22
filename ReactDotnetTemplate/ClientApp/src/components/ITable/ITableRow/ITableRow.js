import React from 'react';
import { Table } from 'semantic-ui-react'
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const ITableRow = ({ customer, handleEdit, handleDelete }) => {
    const { id, name, address } = customer;

    return (
        <Table.Row key={id}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{address}</Table.Cell>
            <Table.Cell>
                <EditButton {...customer} handleEdit={handleEdit} />
            </Table.Cell>
            <Table.Cell>
                <DeleteButton id={id} handleDelete={handleDelete} />
            </Table.Cell>
        </Table.Row>
    )
}

export default ITableRow;