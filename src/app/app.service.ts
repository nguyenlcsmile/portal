import axios from '../_services/axiosCustom.service';

const getUserDetail = () => {
    return axios.get('v1/user/detail');
}

export { getUserDetail }