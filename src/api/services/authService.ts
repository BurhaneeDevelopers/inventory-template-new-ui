import { ENDPOINTS } from '../config/apiConfig'
import { publicInstance } from '../config/axios'
import { LoginData, LoginResponse } from './service.types'

export const authService = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await publicInstance.post(ENDPOINTS.AUTH.LOGIN, data)
    return response.data
  },
}
