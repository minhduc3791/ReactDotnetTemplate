const BASE_URL = 'api/customers';

export const fetchCustomer = async (pageSize, pageIndex) => {
    let params = {
        "pageSize": pageSize,
        "pageIndex": pageIndex,
    };

    let queryString = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');


    const response = await fetch(BASE_URL + '?' + queryString);
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

export const editCustomer = async (id, newName, newAddress) => {
    const response = await fetch(BASE_URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, name: newName, address: newAddress })
    });

    return response;
}

export const addCustomer = async (name, address) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, address: address })
    });
    return await response.json();
}