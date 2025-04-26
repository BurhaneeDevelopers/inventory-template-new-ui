import { AxiosError } from 'axios'

export interface LoginData {
  username: string
  password: string
  // Add additional fields if necessary
}

export interface LoginResponse {
  Name: string
  UserName: string
  ProfileImage: string | null
  Role: string | null
  AccessToken: string
  RefreshToken: string
  ForcePwdChange: boolean
}

export interface ApiError extends AxiosError<{ message: string }> {}
