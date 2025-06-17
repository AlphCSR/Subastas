import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface ClaimsLayoutProps {
  children: ReactNode
}

export default function ClaimsLayout({ children }: ClaimsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-4 px-10">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver al inicio
        </Link>
        {children}
      </div>
    </div>
  )
}
