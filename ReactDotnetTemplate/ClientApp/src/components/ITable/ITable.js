import React, { useState, useEffect } from 'react'
import { Button, Icon, Table, Modal, Input, Form } from 'semantic-ui-react'

const ITable = ({ data, column, direction, handleSort, handleEdit, handleDelete }) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDelteModal, setOpenDeleteModal] = useState(false);
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
        setOpenEditModal(false);
        setOpenDeleteModal(false);
    }

    const initForm = (id, name, address) => {
        setOpenEditModal(true);
        setCurrentId(id);
        setCurrentName(name);
        setCurrentAddress(address);
    }

    const openDeleteConfirmation = (id) => {
        setOpenDeleteModal(true);
        setCurrentId(id);
    }

    const _handleDelete = (id) => {
        setOpenDeleteModal(false);
        handleDelete(id);
    }

    const _handleEdit = (id, name, address) => {
        setOpenEditModal(false);
        handleEdit(id, name, address)
    }

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
                {data.map(({ id, name, address }) => (
                    <Table.Row key={id}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{address}</Table.Cell>
                        <Table.Cell>
                            <Modal size="small" open={openEditModal} onClose={clearForm}
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
                                    <Button color="black" onClick={() => { setOpenEditModal(false) }}>Cancel</Button>
                                    <Button disabled={disabled} color="green" icon labelPosition="right" onClick={() => _handleEdit(currentId, currentName, currentAddress)}>Edit<Icon name="check" /></Button>
                                </Modal.Actions>
                            </Modal>
                        </Table.Cell>
                        <Table.Cell>
                            <Modal size="small" open={openDelteModal} onClose={clearForm}
                                trigger={<Button icon labelPosition='left' color="red"
                                    onClick={() => openDeleteConfirmation(id)}>
                                    <Icon name='delete' />
                                    DELETE</Button>} centered>
                                <Modal.Header>Delete customer</Modal.Header>
                                <Modal.Content>
                                    <h1>Are you sure?</h1>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="black" onClick={() => { setOpenDeleteModal(false) }}>Cancel</Button>
                                    <Button color="red" icon labelPosition="right" onClick={() => _handleDelete(currentId)}>Delete<Icon name="close" /></Button>
                                </Modal.Actions>
                            </Modal>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
export default ITable;