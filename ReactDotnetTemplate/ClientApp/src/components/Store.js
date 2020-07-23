import React, { useState, useEffect } from 'react';

import ITable from './ITable'
import IPaging from './IPaging';
import IAddData from './IAddData';

import { fetchStore, editStore, deleteStore } from 'services/storeServices';

const SORT_DIRECTION = {
    'ascending': 1,
    'descending': -1,
};

const Store = () => {
    const [data, _setData] = useState([]);
    const [loading, _setLoading] = useState(true);
    const [column, setColumn] = useState(null);
    const [direction, setDirection] = useState(null);
    const [pageSize, _setPageSize] = useState(5);
    const [pageIndex, _setPageIndex] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const _sortArray = (arr, sortProp, sortDirection) => {
        return [...arr].sort((a, b) => (b[sortProp].localeCompare(a[sortProp]) === sortDirection ? 1 : -1));
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
        const paginatedData = await fetchStore(pageSize, pageIndex);
        //handle error

        _setData(paginatedData.data);
        setHasNextPage(paginatedData.hasNextPage);
        setHasPreviousPage(paginatedData.hasPreviousPage);
        setTotalPages(paginatedData.totalPages);
        _setLoading(false);
    }

    const _handleEdit = async (id, name, address) => {
        _setLoading(true);
        const response = await editStore({id, name, address});
        if (response.status === 204) {
            _setData(data.map(d => (d.id === id ? { id, name, address } : d)));
        }
        _setLoading(false);
    }

    const _handleDelete = async (id) => {
        _setLoading(true);
        const response = await deleteStore(id);
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
            <IAddData setLoading={_setLoading} addData={_addData} modelName="Store" />

            {loading
                ? <p><em>Loading...</em></p>
                : <>
                    <ITable modelName="Store" data={data} column={column} direction={direction} handleSort={_handleSort} handleEdit={_handleEdit} handleDelete={_handleDelete} />
                    <IPaging pageSize={pageSize} pageIndex={pageIndex} setPageIndex={_setPageIndex} setPageSize={_setPageSize}
                        totalPages={totalPages} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} />
                </>
            }
        </>
    );
}

export default Store;
