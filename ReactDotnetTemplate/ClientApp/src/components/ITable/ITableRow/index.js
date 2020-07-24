﻿import React from 'react';
import CustomerRow from './CustomerRow';
import ProductRow from './ProductRow';
import StoreRow from './StoreRow';
import SaleRow from './SaleRow';

const ITableRow = ({ modelName, data, handleEdit, handleDelete, relatedData }) => {
    const component = () => {
        switch (modelName) {
            case "Customer":
                return <CustomerRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
            case "Product":
                return <ProductRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
            case "Store":
                return <StoreRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
            case "Sale":
                return <SaleRow data={data} relatedData={relatedData} handleEdit={handleEdit} handleDelete={handleDelete} />
            default:
                return <CustomerRow data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
        }
    }
    return (
        <>
            {component()}
        </>
    )
}

export default ITableRow;