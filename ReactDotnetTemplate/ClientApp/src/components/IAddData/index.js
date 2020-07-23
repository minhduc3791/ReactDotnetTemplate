import React from 'react';
import AddCustomer from './AddCustomer';
import AddProduct from './AddProduct';
import AddStore from './AddStore';
import AddSale from './AddSale';

const IAddData = ({ setLoading, addData, modelName }) => {
    const component = () => {
        switch (modelName) {
            case "Customer":
                return <AddCustomer setLoading={setLoading} addData={addData} />
                break;
            case "Product":
                return <AddProduct setLoading={setLoading} addData={addData} />
                break;
            case "Store":
                return <AddStore setLoading={setLoading} addData={addData} />
                break;
            case "Sale":
                return <AddSale setLoading={setLoading} addData={addData} />
                break;
            default:
                return <AddCustomer setLoading={setLoading} addData={addData} />
        }
    }
    return (
        <>
            { component() }
        </>
    )
}

export default IAddData;