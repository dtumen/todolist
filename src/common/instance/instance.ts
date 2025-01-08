import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: 'Bearer a4842c68-8a9f-45c5-9d4c-7948d241fd05',
        'API-KEY': '987062f7-8714-4694-a041-e8587e7dd8bc',
    },
})