import { BarChart3, MapPin, Bell, FileText, HeadphonesIcon } from 'lucide-react'

interface AuthSidebarProps {
  mode: 'login' | 'register'
}

export default function AuthSidebar({ mode }: AuthSidebarProps) {
  const benefits = [
    {
      icon: BarChart3,
      title: "Tableau de bord personnalisé",
      description: "Accédez à vos données forestières en temps réel avec un tableau de bord personnalisé",
      color: "text-[#228B22]"
    },
    {
      icon: MapPin,
      title: "Cartographie avancée",
      description: "Outils géospatiaux avancés pour la surveillance et l'analyse forestière",
      color: "text-[#000FFF]"
    },
    {
      icon: Bell,
      title: "Alertes intelligentes",
      description: "Notifications automatiques et personnalisées pour une surveillance proactive",
      color: "text-orange-600"
    },
    {
      icon: FileText,
      title: "Rapports détaillés",
      description: "Générez des rapports personnalisés et des analyses approfondies",
      color: "text-purple-600"
    },
    {
      icon: HeadphonesIcon,
      title: "Soutien prioritaire",
      description: "Assistance technique dédiée et formation personnalisée",
      color: "text-red-600"
    }
  ]

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12">
      {mode === 'register' ? (
        // Registration Benefits
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 heading-font">Avantages du compte</h3>
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all">
                  <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm`}>
                    <Icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 heading-font">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 p-6 bg-white/50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-[#228B22] font-bold text-lg">?</span>
              </div>
              <h4 className="font-semibold text-gray-900 heading-font">Besoin d'aide?</h4>
            </div>
            <p className="text-gray-600 mb-4">
              Notre équipe d'experts est là pour vous accompagner dans la mise en place de votre système de surveillance forestière.
            </p>
            <button className="w-full bg-[#228B22] text-white py-3 px-6 rounded-xl font-medium hover:bg-green-700 transition-colors">
              DEMANDE DE L'AIDE
            </button>
          </div>
        </div>
      ) : (
        // Login Welcome
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 heading-font">Bienvenue sur MBINEKO</h3>
          <p className="text-gray-600 mb-8">
            Votre plateforme de surveillance forestière intelligente vous attend. Accédez à tous vos outils de surveillance en un clic.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-[#228B22]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 heading-font">Tableau de bord personnalisé</h4>
                <p className="text-sm text-gray-600">Visualisez vos données forestières en temps réel</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 heading-font">Alertes en temps réel</h4>
                <p className="text-sm text-gray-600">Notifications instantanées pour une surveillance proactive</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#000FFF]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 heading-font">Rapports détaillés</h4>
                <p className="text-sm text-gray-600">Générez des analyses complètes et personnalisées</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="h-5 w-5 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 heading-font">Assistance 24h/24 et 7j/7?</h4>
            </div>
            <p className="text-gray-600 mb-2">
              Notre équipe est là pour vous aider
            </p>
            <p className="text-[#228B22] font-medium">mbineko.cm@gmail.com</p>
          </div>
        </div>
      )}
    </div>
  )
}
