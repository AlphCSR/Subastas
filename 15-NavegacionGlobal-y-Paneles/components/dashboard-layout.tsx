"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LogOut, Menu, Package, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Importar el nuevo componente de notificaciones
import { NotificationDropdown } from "@/components/notification-dropdown"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "usuario" | "subastador" | "admin"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const userTypeLabel = {
    usuario: "Usuario",
    subastador: "Subastador",
    admin: "Administrador",
  }

  const navigationItems = {
    usuario: [
      { href: "/dashboard/usuario", label: "Inicio", icon: Home },
      { href: "/dashboard/usuario/subastas", label: "Mis Subastas", icon: Package },
      { href: "/dashboard/usuario/perfil", label: "Mi Perfil", icon: User },
    ],
    subastador: [
      { href: "/dashboard/subastador", label: "Inicio", icon: Home },
      { href: "/dashboard/subastador/subastas", label: "Mis Subastas", icon: Package },
      { href: "/dashboard/subastador/pagos", label: "Pagos", icon: Package },
      { href: "/dashboard/subastador/perfil", label: "Mi Perfil", icon: User },
    ],
    admin: [
      { href: "/dashboard/admin", label: "Inicio", icon: Home },
      { href: "/dashboard/admin/usuarios", label: "Usuarios", icon: Users },
      { href: "/dashboard/admin/subastas", label: "Subastas", icon: Package },
      { href: "/dashboard/admin/configuracion", label: "Configuración", icon: Settings },
    ],
  }

  const navigation = navigationItems[userType]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setOpen(false)}>
                <Package className="h-6 w-6" />
                <span>Subastas App</span>
              </Link>
              <div className="my-4 pb-4 border-b">
                <p className="text-sm font-medium text-muted-foreground mb-2">Panel de {userTypeLabel[userType]}</p>
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-muted-foreground",
                    pathname === item.href && "text-foreground font-medium",
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="hidden md:inline-block">Subastas App</span>
          </Link>
          <p className="hidden md:block text-sm font-medium text-muted-foreground">
            Panel de {userTypeLabel[userType]}
          </p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Salir</span>
            </Link>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{userType[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground",
                  pathname === item.href && "bg-muted text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
