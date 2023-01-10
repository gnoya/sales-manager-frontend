import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './auth.service'

interface MyAxiosRequestConfig extends Omit<AxiosRequestConfig, 'headers'> {
  headers?: any
}

/* --------------- HTTP INSTANCES ----------- */
// used for http requests that don't require JWT token
const publicHTTP = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
// used for http requests that require JWT token
const privateHTTP = axios.create({ baseURL: process.env.REACT_APP_API_URL })

/* --------------- MIDDLEWARES -------------- */
// middleware to insert the JWT token in the request's headers
function JWTHeaderMiddleware(request: MyAxiosRequestConfig) {
  const token = getToken()
  if (token && request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
}

// use the JWT header middleware in the privateHTTP (the one that requires JWT token)
privateHTTP.interceptors.request.use(JWTHeaderMiddleware)

export { publicHTTP, privateHTTP }
