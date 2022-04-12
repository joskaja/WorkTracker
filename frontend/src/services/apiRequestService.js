
const getCommonOptions = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const commonOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user?.token ? 'Bearer: ' + user.token : '',
        },
    };
    return commonOptions;
}

const get = (url) => {
    console.log(url);
    const requestOptions = {
        ...getCommonOptions(),
        method: 'GET'
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const post = (url, data) => {
    const requestOptions = {
        ...getCommonOptions(),
        method: 'POST',
        body: JSON.stringify(data)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const put = (url, data) => {
    const requestOptions = {
        ...getCommonOptions(),
        method: 'PUT',
        body: JSON.stringify(data)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const _delete = (url) => {
    const requestOptions = {
        ...getCommonOptions(),
        method: 'DELETE'
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const handleResponse = (response) => {
    if (response.status > 499) {
        localStorage.removeItem('user');
        window.location = "/";
    }
    return response.json().then(data => {
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}

export const apiRequestService = {
    get,
    post,
    put,
    delete: _delete
}

