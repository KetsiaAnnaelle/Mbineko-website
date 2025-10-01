import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react'
import { authAPI } from '@/services/api'
import { useNavigate } from 'react-router'

interface LoginFormProps {
  onSwitchToRegister: () => void
  onSubmit: (data: any) => void
} 

const validationSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Email obligatoire'),
  password: Yup.string().required('Mot de passe obligatoire'),
})

export default function LoginForm({ onSwitchToRegister, onSubmit }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

 const navigate = useNavigate()

  const benefits = [
    "Surveillance en temps réel",
    "Analyses intelligentes",
    "Rapports détaillés",
    "Support 24/7"
  ]

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await authAPI.login(values)
      onSubmit(response)
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else {
        setError('Une erreur est survenue lors de la connexion')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <img src="assets/img/logo.png" alt="MBINEKO logo" className="h-25 w-auto mx-auto mb-3" />
       
        <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Serial SemiCondensed, serif' }}>
          Connexion 
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
          Accédez à votre espace de surveillance forestière
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center" style={{ fontFamily: 'Serial SemiCondensed, serif' }}>
          Vos avantages
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-[#228B22] flex-shrink-0" />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Lato, sans-serif' }}>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700 text-sm text-center" style={{ fontFamily: 'Lato, sans-serif' }}>
            {error}
          </p>
        </div>
      )}

      {/* Form */}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>
                Adresse e-mail
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  name="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="votre@email.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2 flex items-center space-x-1" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-2 flex items-center space-x-1" />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#228B22] border-gray-300 rounded focus:ring-[#228B22] focus:ring-2"
                />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>Se souvenir de moi</span>
              </label>
              <button
                type="button"
                onClick={() => navigate('/reset-password')} // redirection vers ta page ResetPassword
                className="text-sm text-[#228B22] hover:text-green-700 font-medium transition-colors"
                style={{ fontFamily: 'Lato, sans-serif', cursor: 'pointer' }}
              >
                Mot de passe oublié ?
              </button>
                          </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-gradient-to-r from-[#228B22] to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>

            {/* Divider */}
            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500" style={{ fontFamily: 'Lato, sans-serif' }}>
                  ou
                </span>
              </div>
            </div> */}

            {/* Social Login */}
            {/* <button
              type="button"
              className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:border-[#228B22] hover:text-[#228B22] transition-all duration-200 flex items-center justify-center space-x-2"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              <Shield className="h-5 w-5" />
              <span>Continuer avec Google</span>
            </button> */}

            {/* Switch to Register */}
            <div className="text-center pt-4" style={{ fontFamily: 'Lato, sans-serif' }}>
              <p className="text-gray-600" >
                Pas encore de compte ?{' '}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-[#228B22] hover:text-green-700 font-semibold underline transition-colors"
                >
                  S'inscrire maintenant
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>

      {/* Security Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
              Connexion sécurisée
            </p>
            <p className="text-xs text-blue-700 mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
              Vos données sont protégées par un chiffrement de niveau bancaire
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
