export const Api = {
    baseURL: import.meta.env.VITE_API_URL + '/api',
    users: '/users',
    login: '/users/login',
    register: '/users/',
    myWeedDates: '/weed-dates/my-weed-dates',
    postWeedDate: '/weed-dates/new-weed-date'
} as const;

