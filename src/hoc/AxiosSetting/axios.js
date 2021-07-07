import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export default AxiosInstance