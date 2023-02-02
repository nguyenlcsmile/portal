import axios from "../../../_services/axiosCustom.service";

const postAccessToken = (username: string, password: string) => {
    return axios.post('v1/auth/token', {
        Username: username,
        Password: password
    })
    .then(res => res)
    .catch((error) => error)
}

export { postAccessToken }