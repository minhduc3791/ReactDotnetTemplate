import React, { useState, useEffect } from 'react'
import { Icon, Menu, Dropdown, Grid } from 'semantic-ui-react'

const PAGE_SIZE = [
    { key: 5, text: '5', value: 5, },
    { key: 10, text: '10', value: 10 },
    { key: 20, text: '20', value: 20 },
    { key: 30, text: '30', value: 30 },
    { key: 50, text: '50', value: 50 }
];

const createPagingMenu = (pageIndex, setPageIndex, totalPages) => {
    const menuItems = [];
    for (let i = 1; i <= totalPages; i++) {
        menuItems.push(<Menu.Item key={i} as='a' active={pageIndex === i} onClick={() => { setPageIndex(i) }}>{i}</Menu.Item>)
    }
    return menuItems;
}

const IPaging = ({ pageSize, pageIndex, setPageIndex, setPageSize, totalPages, hasPreviousPage, hasNextPage}) => (
    <Grid>
        <Grid.Column floated='left' width={1}>
            <Dropdown defaultValue={pageSize} compact selection onChange={(e, { value }) => setPageSize(value)} options={PAGE_SIZE} />
        </Grid.Column>
        <Grid.Column floated='right' width={5}>
            <Menu floated='right' pagination>
                <Menu.Item as='a' icon disabled={!hasPreviousPage} onClick={() => { setPageIndex(pageIndex - 1) }}>
                    <Icon name='chevron left' />
                </Menu.Item>
                {createPagingMenu(pageIndex, setPageIndex, totalPages)}
                <Menu.Item as='a' icon disabled={!hasNextPage} onClick={() => { setPageIndex(pageIndex + 1) }}>
                    <Icon name='chevron right' />
                </Menu.Item>
            </Menu>
        </Grid.Column>
    </Grid>
)

export default IPaging;