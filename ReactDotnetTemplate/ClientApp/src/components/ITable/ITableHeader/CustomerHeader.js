import React from 'react';
import { Table } from 'semantic-ui-react'

const CustomerHeader = ({ column, direction, handleSort }) => {
    return (
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
    )
}

export default CustomerHeader;