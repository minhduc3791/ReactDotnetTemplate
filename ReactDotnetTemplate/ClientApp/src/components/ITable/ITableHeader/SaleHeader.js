import React from 'react';
import { Table } from 'semantic-ui-react'

const SaleHeader = ({ column, direction, handleSort }) => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell
                    sorted={column === 'customer' ? direction : null}
                    onClick={() => { handleSort('customer') }}
                >
                    Customer
                        </Table.HeaderCell>
                <Table.HeaderCell
                    sorted={column === 'product' ? direction : null}
                    onClick={() => { handleSort('product') }}
                >
                    Product
                        </Table.HeaderCell>
                <Table.HeaderCell
                    sorted={column === 'store' ? direction : null}
                    onClick={() => { handleSort('store') }}
                >
                    Store
                        </Table.HeaderCell>
                <Table.HeaderCell
                    sorted={column === 'date' ? direction : null}
                    onClick={() => { handleSort('date') }}
                >
                    Date Sold
                        </Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}

export default SaleHeader;