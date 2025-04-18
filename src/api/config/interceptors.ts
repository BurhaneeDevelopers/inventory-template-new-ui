import { AxiosError, AxiosInstance } from 'axios'
// import tokenService from '../services/tokenService'

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async config => {
      return config
    },
    (error: AxiosError) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      return Promise.reject(error)
    },
  )
}
