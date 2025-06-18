"use client"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { DashboardContent } from "./dashboard-content"

export function Dashboard() {
  const [activeView, setActiveView] = useState("overview")
  const { user } = useAuth()

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} userRole={user?.role || "postor"} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardContent activeView={activeView} />
        </main>
      </div>
    </div>
  )
}
