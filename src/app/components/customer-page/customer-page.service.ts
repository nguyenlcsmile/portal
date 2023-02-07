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

const getAddressCustomer = (type: any, id: any) => {
    return axios.get(`https://api-dashboard.ubank.vn/uat/v1/dashboard/customer/list-address?type=${type}&id=${id}`);
}
export { postListCustomer, getDetailCustomer, getAddressCustomer };