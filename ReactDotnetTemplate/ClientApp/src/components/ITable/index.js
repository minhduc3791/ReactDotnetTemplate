import React, { useState, useEffect } from 'react'
import { Button, Icon, Table, Modal, Input, Form, Menu } from 'semantic-ui-react'

const ITable = ({ data, column, direction, handleSort, handleEdit }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(-1);
    const [currentName, setCurrentName] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (currentName && currentAddress && currentName.length > 0 && currentAddress.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [currentName, currentAddress]);

    const clearForm = () => {
        setModalOpen(false);
    }

    const initForm = (id, name, address) => {
        console.log(id, name, address);
        setModalOpen(true);
        setCurrentId(id);
        setCurrentName(name);
        setCurrentAddress(address);
    }

    const _handleEdit = (id, name, address) => {
        setModalOpen(false);
        handleEdit(id, name, address)
    }

    const deleteData = (id) => {
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
                                    onClick={() => initForm(id, name, address)}>
                                    <Icon name='edit' />
                                    Edit</Button>} centered>
                                <Modal.Header>Create customer</Modal.Header>
                                <Modal.Content>
                                    <Form>
                                        <Form.Field>
                                            <label>Name</label>
                                            <Input placeholder='Name' value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Address</label>
                                            <Input placeholder='Address' value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} />
                                        </Form.Field>
                                    </Form>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={() => { setModalOpen(false) }}>Cancel</Button>
                                    <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => _handleEdit(currentId, currentName, currentAddress)}>Create<Icon name="check" /></Button>
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
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
export default ITable;