"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { AuthTabs } from "@/components/auth/auth-tabs"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <AuthTabs />
      </div>
    )
  }

  return <Dashboard />
}
