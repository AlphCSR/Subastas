import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Subastas App",
  description: "Aplicación de subastas en línea",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">🔨</span> Subastas App
            </Link>
            <nav className="flex gap-4">
              <Link href="/auctions">
                <Button variant="ghost">Subastas</Button>
              </Link>
              <Link href="/auctions/create">
                <Button>Crear Subasta</Button>
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t py-6">
          <div className="container px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Subastas App. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  )
}
