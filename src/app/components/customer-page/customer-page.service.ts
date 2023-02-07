import axios from '../../../_services/axiosCustom.service';

const postListCustomer = (skip: number, limit: number, filter: object) => {
    return axios.post('v1/dashboard/customer/list', {
        skip: skip,
        limit: limit,
        filter: filter
    })
}

const getDetailCustomer = (cifId: any) => {
    return axios.get(`v1/dashboard/customer/get-detail?cifId=${cifId}`);
}

export { postListCustomer, getDetailCustomer };