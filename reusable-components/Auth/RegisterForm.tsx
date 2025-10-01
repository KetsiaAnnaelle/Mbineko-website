import { Lock, Mail, Phone, Building, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface RegisterFormProps {
  onSwitchToLogin: () => void
  onSubmit: (data: any) => void
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('Prénom obligatoire'),
  lastName: Yup.string().required('Nom obligatoire'),
  email: Yup.string().email('Email invalide').required('Email obligatoire'),
  phone: Yup.string().required('Téléphone obligatoire'),
  password: Yup.string().min(8, 'Minimum 8 caractères').required('Mot de passe obligatoire'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation obligatoire'),
  organizationType: Yup.string().required('Type obligatoire'),
  acceptTerms: Yup.boolean().oneOf([true], 'Vous devez accepter les conditions'),
})

export default function RegisterForm({ onSwitchToLogin, onSubmit }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 heading-font">Inscrivez vous</h2>
        <p className="text-gray-600">Informations de compte</p>
      </div>

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          organization: '',
          organizationType: '',
          acceptTerms: false,
          acceptNews: false
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <Field
                  name="firstName"
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                  placeholder="Votre prénom"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de famille *</label>
                <Field
                  name="lastName"
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                  placeholder="Votre nom"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Field
                    name="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                    placeholder="votre@email.com"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Field
                    name="phone"
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                    placeholder="Minimum 8 caractères"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'organisation</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Field
                    name="organization"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                    placeholder="Nom de votre organisation"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type d'organisation *</label>
                <Field
                  as="select"
                  name="organizationType"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#228B22] focus:border-[#228B22] transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="entreprise">Entreprise</option>
                  <option value="ong">ONG</option>
                  <option value="gouvernement">Gouvernement</option>
                  <option value="recherche">Recherche</option>
                  <option value="autre">Autre</option>
                </Field>
                <ErrorMessage name="organizationType" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <Field
                  name="acceptTerms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-[#228B22] focus:ring-[#228B22] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-600">
                  J'accepte les <a href="#" className="text-[#228B22] hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-[#228B22] hover:underline">politique de confidentialité</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#228B22] to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Créer mon compte MBINEKO
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Vous avez déjà un compte?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#228B22] hover:text-green-700 font-medium underline"
                >
                  Se connecter
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
