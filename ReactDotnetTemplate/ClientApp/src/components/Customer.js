import React, { Component } from 'react';
import { Button, Modal, Form, Icon, Table } from 'semantic-ui-react'

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            loading: true,
            column: null,
            direction: null,
        };
    }

    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                //data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            customers: this.state.customers.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    componentDidMount() {
        this.populateData();
    }

    static renderCustomersTable(customers, column, direction, handleSort) {
        return (
            <Table sortable celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={handleSort('name')}
                        >
                                    Name
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'address' ? direction : null}
                        onClick={handleSort('address')}
                    >
                            Age
                    </Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {customers.map(({ id, name, address }) => (
                        <Table.Row key={id}>
                            <Table.Cell>{name}</Table.Cell>
                            <Table.Cell>{address}</Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="yellow">
                                    <Icon name='edit' />
                                    EDIT
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="red">
                                    <Icon name='delete' />
                                    DELETE
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customer.renderCustomersTable(this.state.customers, this.state.column, this.state.direction, this.handleSort);

        return (
            <>
                <Modal size="small" centered trigger={<Button primary>New Customer</Button>}>
                    <Modal.Header>Create customer</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder='Address' />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="black">Cancel</Button>
                        <Button disabled color="green" icon labelPosition="right">Create<Icon name="check" /></Button>
                    </Modal.Actions>
                </Modal>
                {contents}
            </>
        );
    }

    async populateData() {
        const response = await fetch('customers/');
        const data = await response.json();
        console.log(data);
        this.setState({ customers: data, loading: false });
    }
}
