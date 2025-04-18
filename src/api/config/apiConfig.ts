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
    BASE_URL: 'http://52.172.96.142:11053',
    TIMEOUT: 20 * 1000,
    API_KEY: 'your-dev-api-key',
  },
  staging: {
    BASE_URL: 'http://52.172.96.142:11053',
    TIMEOUT: 20 * 1000,
    API_KEY: 'your-staging-api-key',
  },
  prod: {
    BASE_URL: 'https://api.yourapp.com/v1',
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
