
const commonOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
};


const get = (url) => {
    const requestOptions = {
        ...commonOptions,
        method: 'GET'
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const post = (url, data) => {
    const requestOptions = {
        ...commonOptions,
        method: 'POST',
        body: JSON.stringify(data)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const put = (url, data) => {
    const requestOptions = {
        ...commonOptions,
        method: 'PUT',
        body: JSON.stringify(data)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const _delete = (url) => {
    const requestOptions = {
        ...commonOptions,
        method: 'DELETE'
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}

export const apiRequestService = {
    commonOptions,
    get,
    post,
    put,
    delete: _delete
}

