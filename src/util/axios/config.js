import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000
})

export default instance;
