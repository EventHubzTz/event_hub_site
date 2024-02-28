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
            'event-hub-token-auth': process.env.REACT_APP_KEY,
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
                    'event-hub-token-auth': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDA2NzMyMjgsIlRva2VuVHlwZSI6InVzZXItdG9rZW4iLCJpZCI6MSwiZmlyc3RfbmFtZSI6IkdyZWdvcnkiLCJsYXN0X25hbWUiOiJNamFuZ2UiLCJlbWFpbCI6ImdyZWdvcnltamFuZ2VAZ21haWwuY29tIiwicGhvbmVfbm8iOiIyNTU3NjM0MTYyOTEiLCJnZW5kZXIiOiJNQUxFIiwicHJvZmlsZV9pbWFnZSI6Ii91c2Vycy9wcm9maWxlSW1hZ2VzL21hbGUucG5nIiwicm9sZSI6IlNVUEVSX0FETUlOIiwicGFzc3dvcmQiOiIkMmEkMTAkTUoyblQyZTdRSE82VEpJQlNxZzNOZUhkbnU4T2lCSWUzQlJFODduT3JWY1lLLlY3Z0JNdjYiLCJpbWFnZV9zdG9yYWdlIjoiTE9DQUwiLCJpc192YWxpZF9lbWFpbCI6ZmFsc2UsImlzX3ZhbGlkX251bWJlciI6dHJ1ZSwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkX2F0IjoiMjAyNC0wMi0xNFQwMjo0MToxNi43OSswMzowMCIsInVwZGF0ZWRfYXQiOiIyMDI0LTAyLTE0VDE3OjQ4OjA5LjUwNyswMzowMCJ9.i0KZXjti8tJajWQsIp7_xFApZsXNW07eqll1zOl3n1M",
                },
            }
        )
        onSuccess(response.data)
    } catch (error) {
        onError(error)
    }
}