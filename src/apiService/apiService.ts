import { privateInstance } from '@/api/config/axios'

const API_V1 = '/1'

const apiClient = privateInstance

export const apiService = {
  get: (endpoint, params) => apiClient.get(endpoint, { params }),

  post: (endpoint, data, headers?: any) => apiClient.post(endpoint, data, { headers }),

  put: (endpoint, data) => apiClient.put(endpoint, data),

  delete: (endpoint, params) => apiClient.delete(endpoint, { params }),

  v1: API_V1,
}
