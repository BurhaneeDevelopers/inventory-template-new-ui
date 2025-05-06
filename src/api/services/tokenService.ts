import { ENDPOINTS } from '../config/apiConfig'
import { publicInstance } from '../config/axios'
import { LoginResponse } from './service.types'

type Token = string | null

let accessToken: Token = null

const tokenService = {
  getAccessToken: () => accessToken,
  setAccessToken: (token: Token) => {
    accessToken = token
  },
  clearAccessToken: () => {
    accessToken = null
  },
  // Save the refresh token to localStorage
  setRefreshToken: (token: string): void => {
    localStorage.setItem('refreshToken', token)
  },
  // Retrieve the refresh token from localStorage
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken')
  },
  // Optional: clear the refresh token from localStorage
  clearRefreshToken: (): void => {
    localStorage.removeItem('refreshToken')
  },
  fetchRefreshToken: async () => {
    try {
      const refreshToken = tokenService.getRefreshToken()
      const response = await publicInstance.post<LoginResponse>(
        ENDPOINTS.AUTH.REFRESH_TOKEN,
        refreshToken,
      )
      const { AccessToken: newAccessToken, RefreshToken: newRefreshToken } = response.data
      tokenService.setRefreshToken(newRefreshToken)
      tokenService.setAccessToken(newAccessToken)
      return newAccessToken
    } catch (error) {
      tokenService.clearAccessToken()
      tokenService.clearRefreshToken()
      throw error
    }
  },
}

export default tokenService
