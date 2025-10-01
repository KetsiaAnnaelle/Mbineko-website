import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import RegisterForm from '../../reusable-components/Auth/RegisterForm'
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

          {/* Logo Rotatif MBINEKO */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-2 bg-gradient-to-br from-[#228B22]/20 via-[#000FFF]/10 to-transparent blur-2xl rounded-3xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-2xl bg-gradient-to-b from-green-50 to-white p-12 flex items-center justify-center min-h-[500px]">
              <div className="absolute right-4 top-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-700 heading-font">
                MBINEKO Platform
              </div>
              
              {/* Logo avec effet de toupie */}
              <div className="relative">
                <style>{`
                  @keyframes float-gentle {
                    0%, 100% {
                      transform: translateY(0px) scale(1);
                    }
                    50% {
                      transform: translateY(-20px) scale(1.05);
                    }
                  }
                  
                  @keyframes fall-leaf {
                    0% {
                      transform: translateY(-100px) translateX(0) rotate(0deg);
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    50% {
                      transform: translateY(250px) translateX(30px) rotate(180deg);
                    }
                    100% {
                      transform: translateY(600px) translateX(-20px) rotate(360deg);
                      opacity: 0;
                    }
                  }
                  
                  .floating-logo {
                    animation: float-gentle 4s ease-in-out infinite;
                  }
                  
                  .falling-leaf {
                    position: absolute;
                    font-size: 2rem;
                    animation: fall-leaf linear infinite;
                    pointer-events: none;
                  }
                  
                  .leaf-1 { left: 10%; animation-duration: 8s; animation-delay: 0s; }
                  .leaf-2 { left: 25%; animation-duration: 10s; animation-delay: 2s; }
                  .leaf-3 { left: 40%; animation-duration: 9s; animation-delay: 4s; }
                  .leaf-4 { left: 60%; animation-duration: 11s; animation-delay: 1s; }
                  .leaf-5 { left: 75%; animation-duration: 10s; animation-delay: 3s; }
                  .leaf-6 { left: 85%; animation-duration: 9s; animation-delay: 5s; }
                `}</style>
                
                {/* Feuilles qui tombent */}
                <div className="falling-leaf leaf-1">🍃</div>
                <div className="falling-leaf leaf-2">🌿</div>
                <div className="falling-leaf leaf-3">🍂</div>
                <div className="falling-leaf leaf-4">🍃</div>
                <div className="falling-leaf leaf-5">🌿</div>
                <div className="falling-leaf leaf-6">🍂</div>
                
                <img
                  src="/assets/img/logo.png"
                  alt="Logo MBINEKO"
                  className="floating-logo w-80 h-80 object-contain drop-shadow-2xl relative z-10"
                />
              </div>

              <div className="absolute bottom-8 inset-x-0 px-8">
                <div className="bg-gradient-to-r from-[#228B22]/10 to-green-600/10 backdrop-blur-sm rounded-2xl p-6 border border-[#228B22]/20">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold heading-font text-gray-800 mb-2">
                      Bienvenue sur MBINEKO
                    </h4>
                    <p className="text-sm text-gray-600">
                      Votre plateforme de surveillance environnementale intelligente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}