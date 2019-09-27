import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://119.3.216.3:3001/',
  timeout: 15000
})

export default instance;
