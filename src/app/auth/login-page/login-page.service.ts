import axios from "../../../_services/axiosCustom.service";

const postAccessToken = (username: string, password: string) => {
    return axios.post('v1/auth/token', {
        Username: username,
        Password: password
    })
    .then(res => {
        // console.log(">>>Check error:", res);
        return res;
    })
    .catch((error) => {
        // console.log(">>>Check error:", error);
        return error;
    })
}

export { postAccessToken }