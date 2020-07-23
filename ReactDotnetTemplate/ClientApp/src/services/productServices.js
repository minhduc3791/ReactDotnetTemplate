const BASE_URL = 'api/products';

export const fetchProduct = async (pageSize, pageIndex) => {
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

export const deleteProduct = async (id) => {
    const response = await fetch(BASE_URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    return response;
}

export const editProduct = async (data) => {
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

export const addProduct = async (data) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...data })
    });
    return await response.json();
}