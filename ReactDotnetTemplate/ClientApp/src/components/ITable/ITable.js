import React, { useState, useEffect } from 'react'
import { Button, Icon, Table, Modal, Input, Form } from 'semantic-ui-react'
import ITableRow from './ITableRow'

const ITable = ({ data, column, direction, handleSort, handleEdit, handleDelete }) => {
    return (
        <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'name' ? direction : null}
                        onClick={() => { handleSort('name') }}
                    >
                        Name
                        </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'address' ? direction : null}
                        onClick={() => { handleSort('address') }}
                    >
                        Address
                        </Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(d => <ITableRow key={d.id} customer={d} handleEdit={handleEdit} handleDelete={handleDelete} />)}
            </Table.Body>
        </Table>
    )
}
export default ITable;