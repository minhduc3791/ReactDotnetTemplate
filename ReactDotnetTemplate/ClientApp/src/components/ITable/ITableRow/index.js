import React from 'react';
import CustomerRow from './CustomerRow';
import ProductRow from './ProductRow';
import StoreRow from './StoreRow';
import SaleRow from './SaleRow';

const ITableRow = ({ modelName, data, handleEdit, handleDelete }) => {
    const log = () => {
        console.log(data);
    }
    const component = () => {
        switch (modelName) {
            case "Customer":
                return <CustomerRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                break;
            case "Product":
                return <ProductRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                break;
            case "Store":
                return <StoreRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                break;
            case "Sale":
                return <SaleRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                break;
            default:
                return <CustomerRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
        }
    }
    return (
        <>
            {log()}
            {component()}
        </>
    )
}

export default ITableRow;