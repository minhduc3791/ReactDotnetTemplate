const BASE_URL = 'api/sales';

export const fetchSale = async (pageSize, pageIndex) => {
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

export const deleteSale = async (id) => {
    const response = await fetch(BASE_URL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    return response;
}

export const editSale = async (data) => {
    console.log(data);
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

export const addSale = async (data) => {
    console.log(data);
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