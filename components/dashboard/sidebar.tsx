"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Gavel,
  Package,
  Users,
  Settings,
  User,
  History,
  Trophy,
  Plus,
  CreditCard,
  Wallet,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Bell,
} from "lucide-react"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  userRole: "admin" | "subastador" | "postor"
}

export function Sidebar({ activeView, onViewChange, userRole }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Resumen", icon: Home, roles: ["admin", "subastador", "postor"] },
    { id: "auctions", label: "Subastas Activas", icon: Gavel, roles: ["admin", "subastador", "postor"] },
    { id: "finished-auctions", label: "Subastas Finalizadas", icon: Trophy, roles: ["admin", "subastador", "postor"] },
    { id: "my-bids", label: "Mis Pujas", icon: TrendingUp, roles: ["postor"] },
    { id: "winner", label: "Premios Ganados", icon: Trophy, roles: ["postor"] },
    { id: "products", label: "Productos", icon: Package, roles: ["admin", "subastador"] },
    { id: "create-auction", label: "Crear Subasta", icon: Plus, roles: ["admin", "subastador"] },
    { id: "payment", label: "Pagos", icon: CreditCard, roles: ["postor"] },
    { id: "payment-methods", label: "Métodos de Pago", icon: Wallet, roles: ["postor"] },
    { id: "prize-management", label: "Gestión de Premios", icon: Package, roles: ["postor"] },
    { id: "claims", label: "Reclamos", icon: AlertTriangle, roles: ["admin", "subastador", "postor"] },
    { id: "reports", label: "Reportes", icon: BarChart3, roles: ["admin", "subastador"] },
    { id: "technical-support", label: "Soporte Técnico", icon: Settings, roles: ["admin"] },
    { id: "auction-states", label: "Estados de Subastas", icon: Settings, roles: ["admin", "subastador"] },
    { id: "notifications", label: "Notificaciones", icon: Bell, roles: ["admin", "subastador", "postor"] },
    { id: "users", label: "Usuarios", icon: Users, roles: ["admin"] },
    { id: "roles", label: "Roles", icon: Settings, roles: ["admin"] },
    { id: "profile", label: "Mi Perfil", icon: User, roles: ["admin", "subastador", "postor"] },
    { id: "history", label: "Historial", icon: History, roles: ["admin", "subastador", "postor"] },
  ]

  const filteredItems = menuItems.filter((item) => item.roles.includes(userRole))

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Sistema de Subastas</h1>
      </div>

      <nav className="mt-6">
        {filteredItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start px-6 py-3 text-left",
                activeView === item.id && "bg-blue-50 text-blue-700 border-r-2 border-blue-700",
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
