import React, { useState, useEffect } from 'react'
import { Icon, Menu, Dropdown, Grid } from 'semantic-ui-react'

const PAGE_SIZE = [
    { key: 5, text: '5', value: 5, },
    { key: 10, text: '10', value: 10 },
    { key: 20, text: '20', value: 20 },
    { key: 30, text: '30', value: 30 },
    { key: 50, text: '50', value: 50 }
];

const IPaging = ({ pageSize, pageIndex, setPageIndex, setPageSize}) => (
    <Grid>
        <Grid.Column floated='left' width={1}>
            <Dropdown defaultValue={5} compact selection onChange={(e, { value }) => setPageSize(value)} options={PAGE_SIZE} />
        </Grid.Column>
        <Grid.Column floated='right' width={5}>
            <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a' active onClick={() => { setPageSize(1) }}>1</Menu.Item>
                <Menu.Item as='a' onClick={() => { setPageSize(2) }}>2</Menu.Item>
                <Menu.Item as='a' onClick={() => { setPageSize(3) }}>3</Menu.Item>
                <Menu.Item as='a' onClick={() => { setPageSize(4) }}>4</Menu.Item>
                <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                </Menu.Item>
            </Menu>
        </Grid.Column>
    </Grid>
)

export default IPaging;