import React, { useState, useEffect } from 'react';

import ITable from './ITable'
import IPaging from './IPaging'
import IAddData from './IAddData'

import { fetchSale, editSale, deleteSale } from 'services/saleServices'
import { fetchCustomer } from 'services/customerServices'
import { fetchProduct } from 'services/productServices'
import { fetchStore } from 'services/storeServices'

const SORT_DIRECTION = {
    'ascending': 1,
    'descending': -1,
};

const Sale = () => {
    const [data, _setData] = useState([]);
    const [loading, _setLoading] = useState(true);
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [pageSize, _setPageSize] = useState(5);
    const [pageIndex, _setPageIndex] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const _sortArray = (arr, sortProp, sortDirection) => {
        let idString = ""
        let sortArray = [];

        switch (sortProp) {
            case 'customers':
                idString = 'customerId';
                sortArray = customers;
                break;
            case 'products':
                idString = 'productId';
                sortArray = products;
                break;
            case 'stores':
                idString = 'storeId';
                sortArray = stores;
                break;
            default:
                idString = 'customerId';
                break;
        }
        return [...arr].sort((a, b) => {
            const stringA = sortProp === 'dateSold' ? a[sortProp] : sortArray.filter(s => s.id === a[idString])[0].name;
            const stringB = sortProp === 'dateSold' ? b[sortProp] : sortArray.filter(s => s.id === b[idString])[0].name;
            return (stringB.localeCompare(stringA) === 0 || stringB.localeCompare(stringA) === sortDirection) ? 1 : -1
        });
    }

    useEffect(() => {
        if (data.length > 0 && column !== null && direction !== null) {
            _setData(_sortArray(data, column, SORT_DIRECTION[direction]));
        }
    }, [column, direction])

    const _handleSort = (clickedColumn) => {
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
        setColumn(clickedColumn);
    }

    const fetchData = async () => {
        const paginatedData = await fetchSale(pageSize, pageIndex);
        //handle error
        fetchRelatedData();

        _setData(paginatedData.data);
        setHasNextPage(paginatedData.hasNextPage);
        setHasPreviousPage(paginatedData.hasPreviousPage);
        setTotalPages(paginatedData.totalPages);
        _setLoading(false);
    }

    const fetchRelatedData = async () => {
        const customers = fetchCustomer();
        const products = fetchProduct();
        const stores = fetchStore();

        await Promise.all([customers, products, stores]).then(([c, p, s]) => {
            setCustomers(c.data);
            setProducts(p.data);
            setStores(s.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const _handleEdit = async (newData) => {
        const { id } = newData;
        _setLoading(true);
        const response = await editSale(newData);
        if (response.status === 204) {
            _setData(data.map(d => (d.id === id ? newData : d)));
        }
        _setLoading(false);
    }

    const _handleDelete = async (id) => {
        _setLoading(true);
        const response = await deleteSale(id);
        if (response.status === 200) {
            _setData(data.filter(d => d.id !== id));
        }
        _setLoading(false);
    }

    const _addData = (newData) => {
        _setData([...data, newData]);
    }

    useEffect(() => {
        fetchData();
    }, [pageSize, pageIndex])

    return (
        <>
            <IAddData isFetching={isFetching} setLoading={_setLoading} addData={_addData} modelName="Sale" customers={customers} products={products} stores={stores} />

            {loading
                ? <p><em>Loading...</em></p>
                : <>
                    <ITable modelName="Sale" data={data} relatedData={{ customers, products, stores }} column={column} direction={direction}
                        handleSort={_handleSort} handleEdit={_handleEdit} handleDelete={_handleDelete} />
                    <IPaging pageSize={pageSize} pageIndex={pageIndex} setPageIndex={_setPageIndex} setPageSize={_setPageSize}
                        totalPages={totalPages} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} />
                </>
            }
        </>
    );
}

export default Sale;
