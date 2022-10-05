import axios from 'axios';
import getEnvVars from '../environment';

const { API_URL } = getEnvVars();

const instance = axios.create();

instance.defaults.baseURL = API_URL;
instance.defaults.timeout = 20000;

export default instance;
