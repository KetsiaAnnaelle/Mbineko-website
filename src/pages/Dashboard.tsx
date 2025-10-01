"use client"

import LineChart from "../../reusable-components/dashboard/LineChart"
import BarChart from "../../reusable-components/dashboard/BarChart"
import StatsCard from "../../reusable-components/dashboard/StatsCard"
import CircularProgress from "../../reusable-components/dashboard/CircularProgress"
import DonutChart from "../../reusable-components/dashboard/DonutChart"
import AlertsPanel from "../../reusable-components/dashboard/AlertsPanel"
import MapSection from "../../reusable-components/dashboard/MapSection"
import Header from "../../reusable-components/Layout/Header"
import { useI18n } from "@/i18n"
import UserManagement from "../../reusable-components/dashboard/UserManagement"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

function Dashboard() {
  const { t } = useI18n()
  const [showUserManagement, setShowUserManagement] = useState(false)
  const { user } = useAuth()

  const deforestationData = [10, 15, 25, 30, 45, 55, 70, 85, 90, 120]
  const forestEvolutionData = [45, 48, 52, 58, 62, 65, 68, 72, 75, 80]
  const riskZonesData = [20, 25, 30, 35, 28, 32, 40, 38, 35, 30]

  const incidentData = [
    { label: t("dashboard.wildfire", "Wildfire"), value: 40, color: "#EF4444" },
    { label: t("dashboard.illegalLogging", "Illegal Logging"), value: 35, color: "#F97316" },
    { label: t("dashboard.unauthorized", "Unauthorized"), value: 25, color: "#EAB308" },
  ]

  if (showUserManagement && user?.role === "admin") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="p-6 mt-20">
          <button
            onClick={() => setShowUserManagement(false)}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ← {t("dashboard.currentForestCover", "Back to Dashboard")}
          </button>
          <UserManagement />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="flex flex-col lg:flex-row gap-6 p-6 mt-20">
        {/* Main Content */}
        <div className="flex-1">
          {user?.role === "admin" && (
            <div className="mb-6">
              <button
                onClick={() => setShowUserManagement(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {t("admin.users", "User Management")}
              </button>
            </div>
          )}

          <MapSection />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-6">
            {/* Current Forest Cover */}
            <StatsCard title={t("dashboard.currentForestCover", "Current Forest Cover")}>
              <div className="flex items-center justify-between">
                <CircularProgress percentage={72} color="#10B981" />
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">52%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t("dashboard.coverage", "Coverage")}</div>
                </div>
              </div>
            </StatsCard>

            {/* Deforested Area */}
            <StatsCard title={t("dashboard.deforestedArea", "Deforested Area This M.")}>
              <div className="text-center w-full">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">120 ha</div>
                <div className="w-full">
                  <BarChart data={deforestationData} color="#10B981" />
                </div>
              </div>
            </StatsCard>

            {/* Incidents by Type */}
            <StatsCard title={t("dashboard.incidentsByType", "Incidents by Type")}>
              <div className="flex items-center justify-center w-full">
                <DonutChart data={incidentData} />
              </div>
            </StatsCard>

            {/* AI Predictions */}
            <StatsCard title={t("dashboard.aiPredictions", "AI Predictions")}>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t("dashboard.atRiskZones", "At Risk Zones")}
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>{t("dashboard.current", "Current")}</span>
                  <span>{t("dashboard.week", "Week")}</span>
                  <span>{t("dashboard.weeks", "Weeks")}</span>
                  <span>{t("dashboard.month", "Mth")}</span>
                </div>
              </div>
            </StatsCard>
          </div>

          {/* Second Row Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Forest Cover Evolution */}
            <StatsCard title={t("dashboard.forestCoverEvolution", "Forest Cover Evolution")} className="lg:col-span-2">
              <div className="h-40 w-full">
                <LineChart data={forestEvolutionData} color="#10B981" height={120} />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>2018</span>
                  <span>2019</span>
                  <span>2022</span>
                  <span>2025</span>
                  <span>2023</span>
                </div>
              </div>
            </StatsCard>

            {/* At-Risk Zones & Remark */}
            <div className="space-y-6">
              <StatsCard title={t("dashboard.atRiskZones", "At-Risk Zones")}>
                <div className="w-full">
                  <BarChart data={riskZonesData} color="#F59E0B" maxHeight={40} />
                </div>
              </StatsCard>

              <StatsCard title={t("dashboard.remark", "Remark")}>
                <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {t("dashboard.noRemarks", "No remarks available")}
                </div>
              </StatsCard>
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="w-full lg:w-80 mt-6 lg:mt-10">
          <AlertsPanel />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
