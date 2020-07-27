import React from 'react';
import DataDeleteButton from './DataDeleteButton';

const DeleteButton = ({ id,  modelName, handleDelete }) => {
    const component = () => {
        switch (modelName) {
            default:
                return <DataDeleteButton id={id} modelName={modelName} handleDelete={handleDelete}/>
        }
    }
    return (
        <>
            {component()}
        </>
    )
}

export default DeleteButton;