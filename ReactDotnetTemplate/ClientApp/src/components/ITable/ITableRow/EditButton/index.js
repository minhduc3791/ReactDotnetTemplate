import React from 'react';
import EditCustomer from './EditCustomer';
import EditProduct from './EditProduct';
import EditStore from './EditStore';
import EditSale from './EditSale';

const EditButton = ({ modelName, data, handleEdit, relatedData }) => {
    const component = () => {
        switch (modelName) {
            case "Customer":
                return <EditCustomer data={data} handleEdit={handleEdit} />
            case "Product":
                return <EditProduct data={data} handleEdit={handleEdit} />
            case "Store":
                return <EditStore data={data} handleEdit={handleEdit} />
            case "Sale":
                return <EditSale data={data} handleEdit={handleEdit} relatedData={relatedData} />
            default:
                return <EditCustomer data={data} handleEdit={handleEdit} />
        }
    }
    return (
        <>
            {component()}
        </>
    )
}

export default EditButton;