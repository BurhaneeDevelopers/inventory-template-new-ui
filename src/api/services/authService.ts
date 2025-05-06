import { ENDPOINTS } from '../config/apiConfig'
import { LoginData, LoginResponse } from './service.types'
import { privateInstance, publicInstance } from '../config/axios'
import tokenService from './tokenService'

export const authService = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await publicInstance.post(ENDPOINTS.AUTH.LOGIN, data)
    return response.data
  },
  googleLogin: async (data: string): Promise<LoginResponse> => {
    const response = await publicInstance.post(ENDPOINTS.AUTH.GOOGLE_LOGIN, data)
    return response.data
  },
  logout: async (): Promise<void> => {
    try {
      // Call the backend to invalidate the token (if your API has this endpoint)
      const refreshToken = tokenService.getRefreshToken()
      if (refreshToken) {
        await privateInstance.post(ENDPOINTS.AUTH.REVOKE_TOKEN, refreshToken)
      }
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      // Clear tokens regardless of whether the API call succeeds
      tokenService.clearAccessToken()
      tokenService.clearRefreshToken()
    }
  },
}
