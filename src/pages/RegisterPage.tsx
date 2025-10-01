import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
// import Header from '../Components/Layout/Header'
// import Footer from '../Components/Layout/Footer'
import RegisterForm from '../../reusable-components/Auth/RegisterForm'
// import AuthSidebar from '../Components/Auth/AuthSidebar'

import { useAuth } from '../hooks/useAuth'
import { alertError, alertSuccess } from '../lib/alerts'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (data: any) => {
    setIsLoading(true)
    setError('')
    try {
      // Match Django RegisterSerializer fields exactly
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        email: data.email,
        organization_name: data.organization || '',
        organization_type: data.organizationType || '',
        password: data.password,
        password2: data.confirmPassword,
      }
      await register(payload as any)
      alertSuccess('Inscription réussie', 'Connectez-vous pour accéder à votre espace')
      navigate('/login')
    } catch (err: any) {
      // Aggregate backend validation errors if present
      let message = "Échec de l'inscription"
      const resp = err?.response?.data
      if (typeof resp === 'string') message = resp
      else if (resp && typeof resp === 'object') {
        const parts: string[] = []
        for (const key of Object.keys(resp)) {
          const val = (resp as any)[key]
          if (Array.isArray(val)) parts.push(`${key}: ${val.join(', ')}`)
          else if (typeof val === 'string') parts.push(`${key}: ${val}`)
        }
        if (parts.length) message = parts.join('\n')
      }
      setError(message)
      alertError('Erreur', message)
      // eslint-disable-next-line no-console
      console.error('Register failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwitchToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
      {/* <Header 
        showAuthButtons={false}
      /> */}
      
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 whitespace-pre-line">
                {error}
              </div>
            )}
            <RegisterForm
              onSwitchToLogin={handleSwitchToLogin}
              onSubmit={handleRegister}
            />
            {isLoading && (
              <div className="text-gray-600 text-sm">Création du compte en cours...</div>
            )}
          </div>

          {/* Stylized Map Aside */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-br from-[#228B22]/20 via-[#000FFF]/10 to-transparent blur-2xl rounded-3xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-2xl">
              <div className="absolute right-4 top-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-700 heading-font">
                Carte interactive
              </div>
              <img
                src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1400&auto=format&fit=crop"
                alt="Forest map"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/60 to-transparent text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Zone forestière</p>
                    <h4 className="text-xl font-bold heading-font">Parc du Boumba Bek</h4>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-sm">36 capteurs actifs</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
