import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://cloudMusic.huluobos.top:3001',
  timeout: 15000
})

export default instance;
