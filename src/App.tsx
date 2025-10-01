/* Optional default Vite styles were causing PostCSS to load. Remove if not needed. */
// import './App.css'
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ForestMonitoringPage from "./pages/ForestMonitoringPage"
import VirtualVisite from "./pages/VirtualVisite"
import StatistiqueDetails from "./pages/StatistiqueDetails"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import ProtectedRoute from "@/components/ProtectedRoute"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ThreeDVisualization from "./pages/ThreeDVisualization"
import Cartography from "./pages/Cartography"
import VirtualTour from "./pages/VirtualTour"
import ProfileEdit from "./pages/ProfileEdit"
import ProfileDelete from "./pages/ProfileDelete"
import Carte from "./pages/Carte"
import VirtualTourViewerPage from "./pages/VitualTourViewerPage"
// import Cartography3D from './pages/Cartography3D';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <ProtectedRoute>
  //       <Dashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/forests", element: <ForestMonitoringPage /> },
  { path: "/forests/:id", element: <ForestMonitoringPage /> },
  { path: "/vitual-viste", element: <VirtualVisite /> },
  { path: "/vitual-tour-viewer", element: <VirtualTourViewerPage /> },
  { path: "/carte", element: <Carte /> },
  {
    path: "/forests/statistics",
    element: (
      <StatistiqueDetails
        forest={{
          id: "1",
          name: "Forêt Statistiques",
          location: "Localisation par défaut",
          image: "/default-forest.jpg",
          area: "1500 ha",
          temperature: "22.5°C",
          coverage: 78,
          humidity: 65,
          description: "Forêt de démonstration pour les statistiques",
          stats: {
            china: 10,
            india: 50,
            brazil: 30,
            others: 10,
          },
        }}
        onBack={() => window.history.back()}
      />
    ),
  },
  { path: "/visite", element: <VirtualVisite /> },
  {
    path: "/visualization-3d",
    element: (
      <ProtectedRoute>
        <ThreeDVisualization />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cartographie",
    element: (
      <ProtectedRoute>
        <Cartography />
      </ProtectedRoute>
    ),
  },
  { path: "/virtual-tour", element: <VirtualTour /> },
  {
    path: "/profile/edit",
    element: (
      <ProtectedRoute>
        <ProfileEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/delete",
    element: (
      <ProtectedRoute>
        <ProfileDelete />
      </ProtectedRoute>
    ),
  },
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
