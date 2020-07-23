import React from 'react';
import EditCustomer from './EditCustomer';
import EditProduct from './EditProduct';
import EditStore from './EditStore';
import EditSale from './EditSale';

const EditButton = ({ modelName, data, handleEdit }) => {
    const component = () => {
        switch (modelName) {
            case "Customer":
                return <EditCustomer data={data} handleEdit={handleEdit} />
                break;
            case "Product":
                return <EditProduct data={data} handleEdit={handleEdit} />
                break;
            case "Store":
                return <EditStore data={data} handleEdit={handleEdit} />
                break;
            case "Sale":
                return <EditSale data={data} handleEdit={handleEdit} />
                break;
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