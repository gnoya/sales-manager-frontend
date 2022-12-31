import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './auth.service'

interface MyAxiosRequestConfig extends Omit<AxiosRequestConfig, 'headers'> {
  headers?: any
}

/* --------------- HTTP INSTANCES ----------- */
const publicHTTP = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
const privateHTTP = axios.create({ baseURL: process.env.REACT_APP_API_URL })

/* --------------- MIDDLEWARES -------------- */
function JWTHeaderMiddleware(request: MyAxiosRequestConfig) {
  const token = getToken()
  if (token && request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
}

privateHTTP.interceptors.request.use(JWTHeaderMiddleware)

export { publicHTTP, privateHTTP }
