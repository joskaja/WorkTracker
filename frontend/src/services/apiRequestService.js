const user = JSON.parse(localStorage.getItem('user'));

const commonOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': user?.token ? 'Bearer: ' + user.token : '',
    },
};


const get = (url) => {
    const requestOptions = {
        ...commonOptions,
        method: 'GET'
    }
    console.log(requestOptions);
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
    console.log(response);
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

