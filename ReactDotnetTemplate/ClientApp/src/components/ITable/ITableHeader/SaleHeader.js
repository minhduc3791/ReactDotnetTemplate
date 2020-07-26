import React from 'react';
import { Table } from 'semantic-ui-react'

const SaleHeader = ({ column, direction, handleSort }) => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell
                    sorted={column === 'customers' ? direction : null}
                    onClick={() => { handleSort('customers') }}
                >
                    Customer
                        </Table.HeaderCell>
                <Table.HeaderCell
                    sorted={column === 'products' ? direction : null}
                    onClick={() => { handleSort('products') }}
                >
                    Product
                        </Table.HeaderCell>
                <Table.HeaderCell
                    sorted={column === 'stores' ? direction : null}
                    onClick={() => { handleSort('stores') }}
                >
                    Store
                        </Table.HeaderCell>
                <Table.HeaderCell
                    sorted={column === 'dateSold' ? direction : null}
                    onClick={() => { handleSort('dateSold') }}
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