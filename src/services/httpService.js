import axios from "axios";
import { toast } from "react-toastify";

import logger from "./logService";


axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        toast.error("Unexpected error occured");
        logger.log(error);
    }

    return Promise.reject(error);
});

function setJwtHeader(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwtHeader
}