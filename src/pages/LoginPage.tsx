import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// import Header from '../Components/Layout/Header'
import AuthSidebar from '../../reusable-components/Auth/AuthSidebar'
import { useAuth } from '../hooks/useAuth'
import { alertError, alertSuccess } from '../lib/alerts'
import LoginForm from '../../reusable-components/Auth/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Redirect to home if already authenticated
    if (isAuthenticated && !isLoading) {
      navigate('/')
    }
  }, [isAuthenticated, isLoading, navigate])

  const handleLogin = async (data: any) => {
    try {
      await login(data)
      alertSuccess('Connexion réussie', 'Bienvenue sur MBINEKO')
      navigate('/')
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.response?.data?.error || 'Échec de la connexion'
      alertError('Erreur', message)
      console.error('Login failed:', error)
    }
  }

  const handleSwitchToRegister = () => {
    navigate('/register')
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#228B22] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* <Header 
        showAuthButtons={false}
      /> */}
      
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <LoginForm 
            onSwitchToRegister={handleSwitchToRegister}
            onSubmit={handleLogin}
          />
          <AuthSidebar mode="login" />
        </div>
      </div>
    </div>
  )
}
