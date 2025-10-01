"use client"

import { useMemo } from "react"
import { useLanguage } from "@/components/language-provider"

type Language = "FR" | "EN"

type Translations = Record<string, Record<Language, string>>

const translations: Translations = {
  // Navigation
  "nav.home": { FR: "Accueil", EN: "Home" },
  "nav.features": { FR: "Fonctionnalités", EN: "Features" },
  "nav.impacts": { FR: "Impacts", EN: "Impacts" },
  "nav.team": { FR: "Équipes & partenaires", EN: "Team & Partners" },
  "nav.about": { FR: "À propos", EN: "About" },
  "nav.contact": { FR: "Contact", EN: "Contact" },
  "nav.forests": { FR: "Forêts", EN: "Forests" },
  "nav.virtualTour": { FR: "Visite Virtuelle", EN: "Virtual Tour" },
  "nav.dashboard": { FR: "Tableau de Bord", EN: "Dashboard" },

  // CTA & Buttons
  "cta.register": { FR: "S'INSCRIRE", EN: "REGISTER" },
  "cta.downloadApp": { FR: "Télécharger l'application mobile", EN: "Download mobile app" },
  "cta.watchVideo": { FR: "Regarder la Vidéo", EN: "Watch Video" },

  // UI Elements
  "ui.menu": { FR: "Menu", EN: "Menu" },
  "ui.changeLanguage": { FR: "Changer la langue", EN: "Change language" },
  "ui.toggleTheme": { FR: "Basculer le mode sombre", EN: "Toggle dark mode" },

  // User Menu
  "user.editProfile": { FR: "Modifier le profil", EN: "Edit profile" },
  "user.deleteProfile": { FR: "Supprimer le profil", EN: "Delete profile" },
  "user.logout": { FR: "Déconnexion", EN: "Logout" },

  // Hero Section
  "hero.title1": { FR: "L'INNOVATION", EN: "INNOVATION" },
  "hero.title2": { FR: "AU SERVICE DES", EN: "IN SERVICE OF" },
  "hero.title3": { FR: "FORÊTS", EN: "FORESTS" },
  "hero.description": {
    FR: "Les forêts sont les poumons de notre planète, abritant 80% de la biodiversité terrestre et régulant notre climat. Grâce à l'innovation technologique, nous pouvons désormais surveiller, protéger et restaurer ces écosystèmes vitaux avec une précision inégalée. Chaque arbre compte dans la lutte contre le changement climatique.",
    EN: "Forests are the lungs of our planet, hosting 80% of terrestrial biodiversity and regulating our climate. Thanks to technological innovation, we can now monitor, protect and restore these vital ecosystems with unparalleled precision. Every tree counts in the fight against climate change.",
  },
  "hero.treesPlanted": { FR: "Arbres Plantés", EN: "Trees Planted" },
  "hero.countries": { FR: "Pays", EN: "Countries" },
  "hero.community": { FR: "Communauté", EN: "Community" },
  "hero.forestsMonitored": { FR: "Forêts surveillées", EN: "Forests monitored" },
  "hero.continuousMonitoring": { FR: "Surveillance continue", EN: "Continuous monitoring" },
  "hero.sensorsDeployed": { FR: "Capteurs déployés", EN: "Sensors deployed" },
  "hero.clientSatisfaction": { FR: "Satisfaction clients", EN: "Client satisfaction" },
  "hero.forestsListed": { FR: "forêts déjà répertoriées", EN: "forests already listed" },
  "hero.moreThan": { FR: "Plus de", EN: "More than" },

  // Dashboard
  "dashboard.currentForestCover": { FR: "Couverture Forestière Actuelle", EN: "Current Forest Cover" },
  "dashboard.coverage": { FR: "Couverture", EN: "Coverage" },
  "dashboard.deforestedArea": { FR: "Zone Déboisée Ce Mois", EN: "Deforested Area This Month" },
  "dashboard.incidentsByType": { FR: "Incidents par Type", EN: "Incidents by Type" },
  "dashboard.aiPredictions": { FR: "Prédictions IA", EN: "AI Predictions" },
  "dashboard.atRiskZones": { FR: "Zones à Risque", EN: "At Risk Zones" },
  "dashboard.current": { FR: "Actuel", EN: "Current" },
  "dashboard.week": { FR: "Semaine", EN: "Week" },
  "dashboard.weeks": { FR: "Semaines", EN: "Weeks" },
  "dashboard.month": { FR: "Mois", EN: "Month" },
  "dashboard.forestCoverEvolution": { FR: "Évolution de la Couverture Forestière", EN: "Forest Cover Evolution" },
  "dashboard.remark": { FR: "Remarque", EN: "Remark" },
  "dashboard.noRemarks": { FR: "Aucune remarque disponible", EN: "No remarks available" },
  "dashboard.wildfire": { FR: "Feu de forêt", EN: "Wildfire" },
  "dashboard.illegalLogging": { FR: "Exploitation illégale", EN: "Illegal Logging" },
  "dashboard.unauthorized": { FR: "Non autorisé", EN: "Unauthorized" },

  // Forest Page
  "forest.title": { FR: "Explorez les Forêts du Monde", EN: "Explore the World's Forests" },
  "forest.subtitle": {
    FR: "Découvrez les merveilles et vivez les plus belles forêts de la planète",
    EN: "Discover the wonders and experience the most beautiful forests on the planet",
  },
  "forest.searchPlaceholder": { FR: "Entrez le nom d'une forêt", EN: "Enter a forest name" },
  "forest.startExploration": { FR: "Commencer l'exploration", EN: "Start exploration" },
  "forest.exploreForest": { FR: "Explorer la forêt", EN: "Explore forest" },
  "forest.startTest": { FR: "Commencer un test", EN: "Start a test" },
  "forest.joinRevolution": {
    FR: "Rejoignez la Révolution de la Surveillance Forestière",
    EN: "Join the Forest Monitoring Revolution",
  },
  "forest.revolutionDesc": {
    FR: "Que vous soyez propriétaire forestier, chercheur ou amateur de la nature, MBINEKO vous donne les outils pour surveiller nos forêts.",
    EN: "Whether you are a forest owner, researcher or nature lover, MBINEKO gives you the tools to monitor our forests.",
  },

  // Test Modal
  "test.modalTitle": { FR: "Commencer un Test de Surveillance", EN: "Start Monitoring Test" },
  "test.sensorBox": { FR: "Numéro de Boîte à Capteur", EN: "Sensor Box Number" },
  "test.droneNumber": { FR: "Numéro du Drone", EN: "Drone Number" },
  "test.submit": { FR: "Démarrer le Test", EN: "Start Test" },
  "test.cancel": { FR: "Annuler", EN: "Cancel" },
  "test.noKit": { FR: "Pas de KIT disponible", EN: "No KIT available" },
  "test.downloadApp": {
    FR: "Veuillez télécharger l'application mobile MBINEKO pour commander le KIT",
    EN: "Please download the MBINEKO mobile app to order the KIT",
  },
  "test.scanApp": {
    FR: "Commencer à Monitorer votre forêt grâce à nos équipements MBINEKO",
    EN: "Start monitoring your forest with our MBINEKO equipment",
  },
  "test.scanQR": { FR: "Scannez le QR code avec votre téléphone", EN: "Scan the QR code with your phone" },

  // Admin Panel
  "admin.users": { FR: "Gestion des Utilisateurs", EN: "User Management" },
  "admin.totalUsers": { FR: "Total Utilisateurs", EN: "Total Users" },
  "admin.usersWithKit": { FR: "Utilisateurs avec KIT", EN: "Users with KIT" },
  "admin.archivedUsers": { FR: "Utilisateurs Archivés", EN: "Archived Users" },
  "admin.searchUsers": { FR: "Rechercher un utilisateur...", EN: "Search user..." },
  "admin.name": { FR: "Nom", EN: "Name" },
  "admin.email": { FR: "Email", EN: "Email" },
  "admin.role": { FR: "Rôle", EN: "Role" },
  "admin.kit": { FR: "KIT", EN: "KIT" },
  "admin.status": { FR: "Statut", EN: "Status" },
  "admin.actions": { FR: "Actions", EN: "Actions" },
  "admin.archive": { FR: "Archiver", EN: "Archive" },
  "admin.restore": { FR: "Restaurer", EN: "Restore" },
  "admin.delete": { FR: "Supprimer", EN: "Delete" },
  "admin.active": { FR: "Actif", EN: "Active" },
  "admin.archived": { FR: "Archivé", EN: "Archived" },
  "admin.yes": { FR: "Oui", EN: "Yes" },
  "admin.no": { FR: "Non", EN: "No" },
  "admin.confirmDelete": {
    FR: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
    EN: "Are you sure you want to delete this user?",
  },
  "admin.confirmArchive": {
    FR: "Êtes-vous sûr de vouloir archiver cet utilisateur ?",
    EN: "Are you sure you want to archive this user?",
  },

  // Virtual Tour
  "tour.title": { FR: "Visite Virtuelle", EN: "Virtual Tour" },
  "tour.explore": { FR: "Explorer", EN: "Explore" },

  // Profile
  "profile.edit": { FR: "Modifier le Profil", EN: "Edit Profile" },
  "profile.delete": { FR: "Supprimer le Profil", EN: "Delete Profile" },
  "profile.save": { FR: "Enregistrer", EN: "Save" },
}

export function useI18n() {
  const { language } = useLanguage()

  const t = useMemo(() => {
    return (key: string, fallback?: string) => {
      const entry = translations[key]
      if (!entry) return fallback ?? key
      return entry[language as Language] ?? fallback ?? key
    }
  }, [language])

  return { t, language }
}
