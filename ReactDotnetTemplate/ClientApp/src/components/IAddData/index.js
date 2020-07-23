import React from 'react';
import AddCustomer from './AddCustomer';
import AddProduct from './AddProduct';
import AddStore from './AddStore';
import AddSale from './AddSale';

const IAddData = ({ setLoading, addData, modelName, customers, products, stores, isFetching }) => {
    const component = () => {
        switch (modelName) {
            case "Customer":
                return <AddCustomer setLoading={setLoading} addData={addData} />
            case "Product":
                return <AddProduct setLoading={setLoading} addData={addData} />
            case "Store":
                return <AddStore setLoading={setLoading} addData={addData} />
            case "Sale":
                return <AddSale isFetching={isFetching} setLoading={setLoading} addData={addData} customers={customers} products={products} stores={stores} />
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