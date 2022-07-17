import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API
})
console.log(process.env.REACT_APP_BASE_URL_API)
export default http