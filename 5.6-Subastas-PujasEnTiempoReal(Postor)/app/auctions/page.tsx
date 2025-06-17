import { Suspense } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuctionCard } from "@/components/auction-card"
import { mockAuctions } from "@/lib/mock-data"

export default function AuctionsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Subastas Activas</h1>
        <Link href="/auctions/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Crear Subasta
          </Button>
        </Link>
      </div>

      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <h2 className="font-medium mb-2">¡Prueba nuestra nueva experiencia de pujas en tiempo real!</h2>
        <p className="text-sm mb-3">
          Ahora puedes participar en subastas con actualizaciones en tiempo real y configurar pujas automáticas.
        </p>
        <Link href={`/auctions/${mockAuctions[0].id}/realtime-bidder`}>
          <Button variant="outline" size="sm">
            Probar ahora
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div>Cargando subastas...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}
