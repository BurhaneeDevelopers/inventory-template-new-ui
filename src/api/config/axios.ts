import axios, { AxiosInstance } from 'axios'
import { BASE_URL, COMMON_HEADERS, TIMEOUT } from './apiConfig'
import { setupInterceptors } from './interceptors'

const createAxiosInstance = (isPrivate: boolean = false): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      ...COMMON_HEADERS,
    },
    // Automatically parse any JSON string response at the root level
    // withCredentials: true,
  })

  if (isPrivate) {
    setupInterceptors(instance)
  }

  return instance
}

export const publicInstance = createAxiosInstance()
export const privateInstance = createAxiosInstance(true)
