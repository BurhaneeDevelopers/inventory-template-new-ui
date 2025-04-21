import axios from 'axios'

// Base configuration
const API_BASE_URL = 'https://erpakapi.bay53.com/api'
const API_V1 = '/1'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (optional, e.g., add token)
apiClient.interceptors.request.use(
  async config => {
    if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
      //   const sessionInfo = localStorage.getItem('session-info')
      try {
        // const parsedInfo = sessionInfo ? JSON.parse(sessionInfo) : {}
        const accessToken = localStorage.getItem('accessToken')
        // if (parsedInfo?.AccessToken) {
        if (accessToken) {
          //   config.headers.Authorization = `Bearer ${parsedInfo.AccessToken}`
          config.headers.Authorization = `Bearer ${accessToken}`
        }
      } catch (error) {
        console.error('Error retrieving session info:', error)
      }
    }
    return config
  },
  error => Promise.reject(error),
)

// Response interceptor (handle global errors)
apiClient.interceptors.response.use(
  response => response.data, // Extract only data
  error => {
    // console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error)
  },
)

export const apiService = {
  get: (endpoint: string, params: Record<string, unknown> = {}) =>
    apiClient.get(endpoint, { params }),

  post: (endpoint: string, data: unknown, headers: Record<string, unknown> = {}) =>
    apiClient.post(endpoint, data, { headers }),

  put: (endpoint: string, data: unknown) => apiClient.put(endpoint, data),

  delete: (endpoint: string) => apiClient.delete(endpoint),

  v1: API_V1,
}
