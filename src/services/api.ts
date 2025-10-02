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
  // login: async (credentials: { email: string; password: string }) => {
  //   try {
  //     const response = await api.post(config.ENDPOINTS.AUTH.LOGIN, credentials)
  //     if (response.data.token) {
  //       localStorage.setItem('authToken', response.data.token)
  //       localStorage.setItem('user', JSON.stringify(response.data.user))
  //       alertSuccess('Connexion réussie', 'Bienvenue !!!')
  //     }
  //     return response.data
  //   } catch (error: any) {
  //     alertError('Erreur de connexion', error.response?.data?.detail || "Vérifiez vos identifiants")
  //     throw error
  //   }
  // },

  // Dans votre fichier api/index.ts
login: async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post(config.ENDPOINTS.AUTH.LOGIN, credentials)
    console.log('Réponse complète du login:', response.data) // Pour debug
    
    // CORRECTION : Vérifiez le format réel de la réponse
    let token = null
    let userData = null

    // Format 1: token dans un objet tokens (comme dans votre erreur)
    if (response.data.tokens) {
      token = response.data.tokens.access || response.data.tokens.token
      userData = response.data.user
    }
    // Format 2: token à la racine
    else if (response.data.token) {
      token = response.data.token
      userData = response.data.user
    }
    // Format 3: access token (JWT standard)
    else if (response.data.access) {
      token = response.data.access
      userData = response.data.user
    }

    if (token) {
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(userData || response.data.user))
      alertSuccess('Connexion réussie', 'Bienvenue !!!')
      
      // Redirection après connexion réussie
      setTimeout(() => {
        window.location.href = '/forests'
      }, 1000)
    } else {
      console.error('Aucun token trouvé dans la réponse:', response.data)
      throw new Error('Token manquant dans la réponse')
    }
    
    return response.data
  } catch (error: any) {
    console.error('Erreur de connexion:', error.response?.data)
    // alertError('Erreur de connexion', error.response?.data?.detail || "Vérifiez vos identifiants")
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
          setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
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



// import axios from 'axios'
// import { getApiConfig } from '../config/api'
// import { alertSuccess, alertError } from '@/lib/alerts'

// const config = getApiConfig()

// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: config.BASE_URL,
//   timeout: config.TIMEOUT,
//   headers: config.DEFAULT_HEADERS,
// })

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expiré → redirection login
//       localStorage.removeItem('authToken')
//       localStorage.removeItem('user')
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )

// // Authentication API
// export const authAPI = {
//   // Login user - CORRIGÉ
//   login: async (credentials: { email: string; password: string }) => {
//     try {
//       console.log('Tentative de connexion avec:', credentials)
      
//       // Essayer différents formats selon ce que le backend attend
//       const loginData = {
//         // Format 1: email/password
//         email: credentials.email,
//         password: credentials.password,
        
//         // Format 2: parfois le backend attend username au lieu de email
//         // username: credentials.email,
//       }

//       const response = await api.post(config.ENDPOINTS.AUTH.LOGIN, loginData)
      
//       console.log('Réponse du login:', response.data)
      
//       // Gérer différents formats de réponse
//       if (response.data.token || response.data.access) {
//         const token = response.data.token || response.data.access
//         localStorage.setItem('authToken', token)
        
//         // Stocker les infos utilisateur
//         const user = response.data.user || {
//           email: credentials.email,
//           name: credentials.email.split('@')[0] // Fallback basic
//         }
//         localStorage.setItem('user', JSON.stringify(user))
        
//         alertSuccess('Connexion réussie', 'Bienvenue !!!')
        
//         // Redirection après connexion
//         setTimeout(() => {
//           window.location.href = '/'
//         }, 1000)
        
//         return response.data
//       } else {
//         throw new Error('Token manquant dans la réponse')
//       }
      
//     } catch (error: any) {
//       console.error('Erreur de connexion détaillée:', error)
      
//       // Messages d'erreur détaillés
//       let errorMessage = "Vérifiez vos identifiants"
      
//       if (error.response) {
//         // Erreur du serveur
//         const serverError = error.response.data
        
//         if (serverError.detail) {
//           errorMessage = serverError.detail
//         } else if (serverError.message) {
//           errorMessage = serverError.message
//         } else if (serverError.error) {
//           errorMessage = serverError.error
//         } else if (serverError.non_field_errors) {
//           errorMessage = serverError.non_field_errors.join(', ')
//         } else if (typeof serverError === 'string') {
//           errorMessage = serverError
//         } else {
//           // Essayer de récupérer le premier message d'erreur
//           const firstError = Object.values(serverError)[0]
//           if (Array.isArray(firstError)) {
//             errorMessage = firstError[0]
//           } else if (typeof firstError === 'string') {
//             errorMessage = firstError
//           }
//         }
        
//         console.log('Données d\'erreur du serveur:', serverError)
//       } else if (error.request) {
//         // Pas de réponse du serveur
//         errorMessage = "Impossible de contacter le serveur. Vérifiez votre connexion."
//       }
      
//       alertError('Erreur de connexion', errorMessage)
//       throw error
//     }
//   },

//   // Register user 
//   register: async (userData: { 
//     email: string; 
//     password: string; 
//     firstName: string; 
//     lastName: string;
//     phone: string;
//     organization?: string;
//     organizationType: string;
//   }) => {
//     try {
//       const formattedData = {
//         email: userData.email,
//         password: userData.password,
//         first_name: userData.firstName,
//         last_name: userData.lastName,
//         phone: userData.phone,
//         organization: userData.organization || '',
//         organization_type: userData.organizationType,
//       }

//       console.log('Données envoyées à l\'API:', formattedData)

//       const response = await api.post(config.ENDPOINTS.AUTH.REGISTER, formattedData)
      
//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token)
//         localStorage.setItem('user', JSON.stringify(response.data.user))
//         alertSuccess('Inscription réussie', 'Bienvenue 🎉')
        
//         setTimeout(() => {
//           window.location.href = '/login'
//         }, 2000)
//       }
//       return response.data
//     } catch (error: any) {
//       console.error('Erreur détaillée:', error.response?.data)
      
//       const errorMessage = error.response?.data?.detail || 
//                           error.response?.data?.message || 
//                           error.response?.data?.error || 
//                           Object.values(error.response?.data || {}).flat().join(', ') ||
//                           "Impossible de créer le compte"
      
//       alertError('Erreur d\'inscription', errorMessage)
//       throw error
//     }
//   },

//   // ... autres méthodes (forgotPassword, resetPasswordConfirm, etc.)
// }

// export default api