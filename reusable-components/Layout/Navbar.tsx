import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link } from "react-scroll"
import { useLanguage } from "@/components/language-provider"
import { useI18n } from "@/i18n"
import { useAuth } from "@/hooks/useAuth"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const { language: currentLanguage, setLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const { t } = useI18n()

  const changeLanguage = (lang: "FR" | "EN") => setLanguage(lang)

  const navLinks = [
    { id: "home", label: t("nav.home", "Accueil") },
    { id: "features", label: t("nav.features", "Fonctionnalités") },
    { id: "impacts", label: t("nav.impacts", "impacts") },
    { id: "team", label: t("nav.team", "Équipe") },
    { id: "about", label: t("nav.about", "À propos") },
    { id: "contact", label: t("nav.contact", "Contact") },
  ]

  const primaryGreen = "#228B22"

  // Fonction pour générer les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user) return ""
    
    // Utilisation de l'opérateur de coalescence nulle pour gérer les valeurs undefined
    const firstName = user.firstName ?? ""
    const lastName = user.lastName ?? ""
    
    return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase()
  }

  // Fonction pour obtenir le nom complet de l'utilisateur
  const getUserFullName = () => {
    if (!user) return ""
    
    const firstName = user.firstName ?? ""
    const lastName = user.lastName ?? ""
    
    return `${firstName} ${lastName}`.trim()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-[#228B22]/50 backdrop-blur-md shadow-md">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <img src="/assets/img/logo.png" alt="MBINEKO" className="h-12 w-auto" />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.id}
                smooth
                duration={500}
                offset={-80}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeLink === link.id
                    ? `bg-[${primaryGreen}] text-white shadow-md`
                    : "text-gray-700 hover:text-white hover:bg-green-900"
                }`}
                onClick={() => setActiveLink(link.id)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Afficher le bouton S'inscrire seulement si l'utilisateur n'est PAS connecté */}
            {!user && (
              <Button
                className="rounded-full px-6 py-2 font-semibold shadow-md text-white"
                style={{ backgroundColor: primaryGreen }}
                onClick={() => (window.location.href = "/register")}
              >
                {t("cta.register", "S'INSCRIRE")}
              </Button>
            )}

            {/* Sélecteur de langue */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="h-9 w-9 rounded-full bg-white hover:bg-white/30 border border-[#228B22]">
                  <Globe className="h-4 w-4 text-[#228B22]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 z-[99999] bg-white" sideOffset={5}>
                <DropdownMenuItem onClick={() => changeLanguage("FR")}>🇫🇷 Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("EN")}>🇺🇸 English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Photo de profil utilisateur - Afficher seulement si connecté */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="h-10 w-10 rounded-full text-white flex items-center justify-center font-semibold text-sm shadow-md hover:scale-105 transition-transform"
                    style={{ backgroundColor: primaryGreen }}
                    title={getUserFullName()}
                  >
                    {getUserInitials() || user.email?.[0]?.toUpperCase() || "U"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 z-[99999]">
                  <div className="px-2 py-1.5 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{getUserFullName()}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuItem onClick={() => (window.location.href = "/dashboard")}>
                    {t("user.dashboard", "Tableau de bord")}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="text-red-600 focus:text-red-700"
                  >
                    {t("user.logout", "Déconnexion")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center gap-2">
            {/* Afficher le bouton S'inscrire seulement si l'utilisateur n'est PAS connecté */}
            {!user && (
              <Button
                className="rounded-full px-4 py-2 text-white font-semibold text-sm"
                style={{ backgroundColor: primaryGreen }}
                onClick={() => (window.location.href = "/register")}
              >
                {t("cta.register", "S'INSCRIRE")}
              </Button>
            )}
            
            <button 
              onClick={() => setOpen(true)} 
              className="p-2 rounded-md bg-black/20 hover:bg-white/30 text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Off-Canvas Mobile Menu - CORRIGÉ */}
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Overlay */}
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          
          {/* Menu Panel */}
          <aside className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b bg-black/60 shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-green-700">
              <div className="flex items-center gap-3">
                <img src="/assets/img/logo.png" alt="MBINEKO" className="h-8 w-auto" />
                <h3 className="text-lg font-semibold text-white">{t("ui.menu", "Menu")}</h3>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="p-2 rounded-xl hover:bg-green-700 transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-6 overflow-y-auto bg-black/60">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.id}
                    smooth
                    duration={500}
                    offset={-80}
                    className={`py-4 px-4 rounded-xl transition-all duration-300 text-lg font-medium ${
                      activeLink === link.id
                        ? "bg-white text-green-800 shadow-md"
                        : "text-white hover:bg-green-700 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveLink(link.id)
                      setOpen(false)
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* User section if logged in */}
              {user && (
                <div className="mt-8 pt-6 border-t border-green-700">
                  <div className="flex items-center gap-3 mb-4 px-4">
                    <div 
                      className="h-12 w-12 rounded-full text-white flex items-center justify-center font-semibold text-base shadow-md"
                      style={{ backgroundColor: primaryGreen }}
                    >
                      {getUserInitials() || user.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="text-white">
                      <p className="font-medium text-sm">{getUserFullName()}</p>
                      <p className="text-xs text-green-200 truncate max-w-[150px]">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      className="justify-start text-white hover:bg-green-700 hover:text-white"
                      onClick={() => {
                        window.location.href = "/dashboard"
                        setOpen(false)
                      }}
                    >
                      {t("user.dashboard", "Tableau de bord")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-red-400 hover:bg-red-600 hover:text-white"
                      onClick={() => {
                        logout()
                        setOpen(false)
                      }}
                    >
                      {t("user.logout", "Déconnexion")}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with language selector */}
            <div className="p-6 border-t border-green-700 bg-black/60">
              <div className="flex flex-col gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full bg-green-700 text-white hover:bg-green-600 border border-green-600">
                      <Globe className="h-4 w-4 mr-2" />
                      {currentLanguage === "FR" ? "🇫🇷 Français" : "🇺🇸 English"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-green-800 border border-green-600 text-white w-full z-[99999]"
                    align="center"
                  >
                    <DropdownMenuItem 
                      onClick={() => changeLanguage("FR")}
                      className="hover:bg-green-700 focus:bg-green-700"
                    >
                      🇫🇷 Français
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => changeLanguage("EN")}
                      className="hover:bg-green-700 focus:bg-green-700"
                    >
                      🇺🇸 English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Afficher le bouton S'inscrire seulement si l'utilisateur n'est PAS connecté */}
                {!user && (
                  <Button
                    className="w-full bg-white text-green-800 hover:bg-green-100 font-semibold"
                    onClick={() => {
                      window.location.href = "/register"
                      setOpen(false)
                    }}
                  >
                    {t("cta.register", "S'INSCRIRE")}
                  </Button>
                )}
              </div>
            </div>
          </aside>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar