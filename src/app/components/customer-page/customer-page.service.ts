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
    return axios.get(`v1/dashboard/customer/list-address?type=${type}&id=${id}`);
}

const postUpdateCustomer = (dataUpdate: any, cif: any) => {
    return axios.post('v1/dashboard/customer/edit-info', {
        cifId: cif,
        data: dataUpdate
    });
}
// devphq
const getImageS3 = (selfie: any) => {
    return axios.get(`/v1/dashboard/customer/get-detail-s3?key=${selfie}`);
}

export { postListCustomer, getDetailCustomer, getAddressCustomer, postUpdateCustomer, getImageS3 };