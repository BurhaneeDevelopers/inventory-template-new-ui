import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import tokenService from '../services/tokenService'

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async config => {
      const token = tokenService.getAccessToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          const newAccessToken = await tokenService.fetchRefreshToken()
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError)
          // Redirect to the signin page path
          window.location.href = '/'
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    },
  )
}
