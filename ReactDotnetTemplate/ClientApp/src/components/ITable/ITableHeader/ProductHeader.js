import React from 'react';
import { Table } from 'semantic-ui-react'

const ProductHeader = ({ column, direction, handleSort }) => {
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
                    sorted={column === 'price' ? direction : null}
                    onClick={() => { handleSort('price') }}
                >
                    Price
                        </Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}

export default ProductHeader;