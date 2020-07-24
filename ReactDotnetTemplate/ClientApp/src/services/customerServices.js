const BASE_URL = 'api/customers';

export const fetchCustomer = async (pageSize, pageIndex) => {
    let queryString = '';

    if (pageSize && pageIndex) {
        let params = {
            "pageSize": pageSize,
            "pageIndex": pageIndex,
        };

        queryString =  '?' + Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }

    const response = await fetch(BASE_URL + queryString);
    return await response.json();
}

export const deleteCustomer = async (id) => {
    const response = await fetch(BASE_URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    return response;
}

export const editCustomer = async (data) => {
    const response = await fetch(BASE_URL + '/' + data.id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data})
    });

    return response;
}

export const addCustomer = async (data) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data})
    });
    return await response.json();
}