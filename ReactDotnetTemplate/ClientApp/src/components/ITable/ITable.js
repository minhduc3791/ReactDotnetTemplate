import React from 'react'
import { Table} from 'semantic-ui-react'
import ITableRow from './ITableRow'
import ITableHeader from './ITableHeader'

const ITable = ({ modelName, data, column, direction, handleSort, handleEdit, handleDelete }) => {
    return (
        <Table sortable celled fixed>
            <ITableHeader modelName={modelName} column={column} direction={direction} handleSort={handleSort} />
            <Table.Body>
                {data.map(d => <ITableRow key={d.id} modelName={modelName} data={d} handleEdit={handleEdit} handleDelete={handleDelete} />)}
            </Table.Body>
        </Table>
    )
}
export default ITable;