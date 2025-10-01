import axios from 'axios'
import { getApiConfig } from '../config/api'
import { alertSuccess, alertError } from '@/lib/alerts'

const config = getApiConfig()

// Create axios instance with base configuration
const api = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
  headers: config.DEFAULT_HEADERS,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré → redirection login
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Authentication API
export const authAPI = {
  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post(config.ENDPOINTS.AUTH.LOGIN, credentials)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        alertSuccess('Connexion réussie', 'Bienvenue !!!')
      }
      return response.data
    } catch (error: any) {
      alertError('Erreur de connexion', error.response?.data?.detail || "Vérifiez vos identifiants")
      throw error
    }
  },

  // Register user
  register: async (userData: { 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string;
    organization?: string;
  }) => {
    try {
      const response = await api.post(config.ENDPOINTS.AUTH.REGISTER, userData)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        alertSuccess('Inscription réussie', 'Bienvenue 🎉')
      }
      return response.data
    } catch (error: any) {
      alertError('Erreur d’inscription', error.response?.data?.detail || "Impossible de créer le compte")
      throw error
    }
  },

  // Forgot password - demande de code
  forgotPassword: async (email: string) => {
    try {
      // const response = await api.post("password-reset/", { email })
      const response = await api.post(config.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
      alertSuccess("Email envoyé", "Vérifiez votre boîte mail pour le code de réinitialisation")
      return response.data
    } catch (error: any) {
      alertError('Erreur', error.response?.data?.detail || "Échec de l’envoi de l’email")
      throw error
    }
  },

  // Reset password avec code reçu
  resetPasswordConfirm: async (email: string, code: string, newPassword: string) => {
    try {
      // const response = await api.post("password-reset-confirm/", {
      const response = await api.post(config.ENDPOINTS.AUTH.RESET_PASSWORD_CONFIRM, {
        email,
        code,
        new_password: newPassword
      })
      alertSuccess("Mot de passe réinitialisé", "Vous pouvez maintenant vous connecter avec le nouveau mot de passe")
      return response.data
    } catch (error: any) {
      alertError('Erreur', error.response?.data?.detail || "Échec de la réinitialisation du mot de passe")
      throw error
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    alertSuccess("Déconnexion réussie")
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken')
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post(config.ENDPOINTS.AUTH.REFRESH)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error
    }
  }
}

// (les autres API : forestAPI, droneAPI, monitoringAPI, reportsAPI, weatherAPI, dashboardAPI restent inchangés)

export default api
