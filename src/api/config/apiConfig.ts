// api/config/apiConfig.js

// Define the type for the environment configuration
type EnvConfig = {
  BASE_URL: string
  TIMEOUT: number
  API_KEY: string
}

type Environments = {
  dev: EnvConfig
  staging: EnvConfig
  prod: EnvConfig
}

// Environment specific URLs
const ENV: Environments = {
  dev: {
    BASE_URL: 'https://erpakapi.bay53.com/api/1',
    TIMEOUT: 20 * 1000,
    API_KEY: 'your-dev-api-key',
  },
  staging: {
    BASE_URL: 'https://erpakapi.bay53.com/api/1',
    TIMEOUT: 20 * 1000,
    API_KEY: 'your-staging-api-key',
  },
  prod: {
    BASE_URL: 'https://botapi.airah.ai/api',
    TIMEOUT: 20 * 1000,
    API_KEY: 'your-prod-api-key',
  },
}

// Select environment based on your app's configuration
const currentEnv: keyof Environments =
  (import.meta.env.VITE_PUBLIC_NODE_ENV as keyof Environments) || 'dev'

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/login',
    // REGISTER: '/auth/register',
    // FORGOT_PASSWORD: '/auth/forgot-password',
    REFRESH_TOKEN: '/refresh-token',
    REVOKE_TOKEN: '/revoke-token',
    GOOGLE_LOGIN: '/auth/google/login',
  },
  USER_REPORT: {
    SEARCH: '/patient-docs/search',
    GET_BY_DETAILS: '/user-report-detail/get-by-details',
    SAVE: '/user-report-detail/save',
    UPDATE: '/user-report-detail/update',
  },
  PATIENT_DOCS: {
    SEARCH: '/patient-docs/search',
    LIST: '/patient-docs/list',
    DOWNLOAD_FILE: (id: number) => `/patient-docs/download-file?id=${id}`,
  },
  // Customer endpoints
  // JOB: {
  //   CREATE: "/job/create",
  //   EDIT: ({ ID }) => `/job/edit/${ID}`,
  //   ONGOINGLIST: "/job/list/ongoing",
  //   CANCELLED_AND_COMPLETED: ({ status, startDate, endDate }) =>
  //     `/job/list/cancelled?status=${status}&startDate=${startDate}&endDate=${endDate}`,
  //   CancelJob: "/job/cancel",
  //   WORKSHOP: "/job/workshop",
  //   SEARCH: ({ status, value }) =>
  //     `/job/search?status=${status}&searchTerm=${value}`,
  // },
}

// Common headers
export const COMMON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // "X-App-Version": "1.0.0", // Your app version
  // "X-Platform": "mobile", // Platform identifier
}

// API configuration object
export const API_CONFIG = {
  ...ENV[currentEnv],
  HEADERS: COMMON_HEADERS,
  // Add any other API-related configuration here
}

// Export individual configurations
export const { BASE_URL, TIMEOUT } = API_CONFIG
