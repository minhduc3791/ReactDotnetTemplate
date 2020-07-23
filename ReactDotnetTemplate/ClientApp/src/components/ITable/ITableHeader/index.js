import React from 'react';
import CustomerHeader from './CustomerHeader';
import ProductHeader from './ProductHeader';
import StoreHeader from './StoreHeader';
import SaleHeader from './SaleHeader';

const ITableHeader = ({ modelName, column, direction, handleSort }) => {
    const component = () => {
        switch (modelName) {
            case "Customer":
                return <CustomerHeader column={column} direction={direction} handleSort={handleSort} />
                break;
            case "Product":
                return <ProductHeader column={column} direction={direction} handleSort={handleSort} />
                break;
            case "Store":
                return <StoreHeader column={column} direction={direction} handleSort={handleSort} />
                break;
            case "Sale":
                return <SaleHeader column={column} direction={direction} handleSort={handleSort} />
                break;
            default:
                return <CustomerHeader column={column} direction={direction} handleSort={handleSort} />
        }
    }
    return (
        <>
            {component()}
        </>
    )
}

export default ITableHeader;