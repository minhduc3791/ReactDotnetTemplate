import React, { useState, useEffect } from 'react'
import { Button, Icon, Table, Modal, Input, Form } from 'semantic-ui-react'

const ITable = ({ data, column, direction, handleSort }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (newName && newAddress && newName.length > 0 && newAddress.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newName, newAddress]);

    const clearForm = () => {
        setModalOpen(false);
    }

    const initForm = (name, address) => {
        console.log(name, address);
        setModalOpen(true);
        setNewName(name);
        setNewAddress(address);
    }

    const updateData = (id) => {
        console.log(id);
    }

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
                {data.map(({ id, name, address }) => (
                    <Table.Row key={id}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{address}</Table.Cell>
                        <Table.Cell>
                            <Modal size="small" open={modalOpen} onClose={clearForm}
                                trigger={<Button icon labelPosition='left' color="yellow"
                                    onClick={() => initForm(name, address)}>
                                    <Icon name='edit' />
                                    Edit</Button>} centered>
                                <Modal.Header>Create customer</Modal.Header>
                                <Modal.Content>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <Input placeholder='Name' value={newName} onChange={(e) => setNewName(e.target.value)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Address</label>
                                            <Input placeholder='Address' value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
                                        </Form.Field>
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={() => { setModalOpen(false) }}>Cancel</Button>
                                    <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => updateData(id)}>Create<Icon name="check" /></Button>
                                </Modal.Actions>
                            </Modal>
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
    )
}
export default ITable;