// // Configuration de l'API Backend

const ENV = (import.meta as any).env ?? {}

const ENV_API_URL = (ENV.VITE_API_URL as string) || 'http://localhost:8000/api'
const ENV_WS_URL = (ENV.VITE_WS_URL as string) || 'ws://localhost:8000/ws'
const ENV_MODE = (ENV.VITE_MODE as string) || 'development'

export const API_CONFIG = {
  BASE_URL: ENV_API_URL,
  WS_URL: ENV_WS_URL,

  TIMEOUT: 10000,

  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  ENDPOINTS: {
    AUTH: {
      LOGIN: '/login/',
      REGISTER: '/register/',
      REFRESH: '/auth/refresh/',
      FORGOT_PASSWORD: '/password-reset/',
      RESET_PASSWORD_CONFIRM: '/password-reset-confirm/',
      LOGOUT: '/auth/logout/',
    },
    FORESTS: '/forests/',
    DRONES: '/drones/',
    MONITORING: '/monitoring/',
    REPORTS: '/reports/',
    WEATHER: '/weather/',
    DASHBOARD: '/dashboard/',
  },

  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
}

// Retourne la config selon l'environnement
export const getApiConfig = () => {
  switch (ENV_MODE) {
    case 'production':
      return {
        ...API_CONFIG,
        BASE_URL: ENV_API_URL,
        WS_URL: ENV_WS_URL,
        TIMEOUT: 15000,
      }
    case 'staging':
      return {
        ...API_CONFIG,
        BASE_URL: ENV_API_URL,
        WS_URL: ENV_WS_URL,
        TIMEOUT: 12000,
      }
    default:
      return API_CONFIG
  }
}
