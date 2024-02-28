import axios from 'axios'
import { contentTypeFormData, contentTypeJson, headers } from '../Utils/constant'

export const getRequest = async (url, onSuccess, onError) => {
    fetch(url, {
        headers: {
            ...contentTypeJson,
            ...headers,
        }
    })
        .then(response => response.json())
        .then(result => {
            onSuccess(result)
        })
        .catch(error => {
            onError(error)
        })
}

export const authGetRequest = async (url, onSuccess, onError) => {
    fetch(url, {
        headers: {
            ...contentTypeJson,
            ...headers,
            'event-hub-token-auth': process.env.REACT_APP_TOKEN,
        }
    })
        .then(response => response.json())
        .then(result => {
            onSuccess(result)
        })
        .catch(error => {
            onError(error)
        })
}

export const webGetRequest = async (url, onSuccess, onError) => {
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(result => {
            onSuccess(result)
        })
        .catch(error => {
            onError(error)
        })
}

export const postRequest = async (url, body, onSuccess, onError, formData) => {
    try {
        const response = await axios.post(url, body, {
            headers: {
                ...formData ?
                    contentTypeFormData :
                    contentTypeJson,
                ...headers,
            },
        })
        onSuccess(response.data)
    } catch (error) {
        onError(error)
    }
}

export const authPostRequest = async (url, body, onSuccess, onError, formData) => {
    try {
        const response = await axios.post(
            url,
            body,
            {
                headers: {
                    ...formData ?
                        contentTypeFormData :
                        contentTypeJson,
                    ...headers,
                    'event-hub-token-auth': process.env.REACT_APP_TOKEN,
                },
            }
        )
        onSuccess(response.data)
    } catch (error) {
        onError(error)
    }
}