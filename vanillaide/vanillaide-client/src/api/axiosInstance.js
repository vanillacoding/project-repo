import axios from "axios";

import getEnvVars from "../../environment";
const { BACK_URL } = getEnvVars();

const axiosInstance = axios.create({
  baseURL: BACK_URL,
});

export default axiosInstance;
