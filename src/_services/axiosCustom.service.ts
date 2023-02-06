import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-dashboard.ubank.vn/uat',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' } 
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // console.log(">>>Check req:", config);
    const access_token = localStorage.getItem('access_token') || '{}';
    config.headers["Authorization"] = `Bearer ${JSON.parse(access_token)}`;
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    // console.log(">>>Check error:", error);
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(">>>Check respone:", response);
    // return response && response.data ? response.data : response;
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(">>>Check error:", error);
    if (error && error?.response) {
        let message = error?.response?.data?.message;
        let status = error?.response?.status;
        if (status === 401 && (message === 'Unauthorized' || message === 'The incoming token has expired')) {
            // console.log(">>>Check:", message, status);
            localStorage.removeItem('access_token');
            location.reload();
            return;
        }
    }
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance;