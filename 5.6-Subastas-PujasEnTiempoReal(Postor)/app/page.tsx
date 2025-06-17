import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeaturedAuctions } from "@/components/featured-auctions"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 px-4">
          <div className="container">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Subastas en línea
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Compra y vende artículos únicos en nuestras subastas en tiempo real. Encuentra oportunidades
                  increíbles o vende tus productos al mejor postor.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auctions">
                  <Button size="lg">Ver subastas activas</Button>
                </Link>
                <Link href="/auctions/create">
                  <Button variant="outline" size="lg">
                    Crear subasta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 px-4">
          <div className="container">
            <FeaturedAuctions />
          </div>
        </section>

        <section className="w-full py-12 bg-gray-50 px-4">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Compra con confianza</h3>
                <p className="text-gray-500">
                  Todas las subastas son verificadas y los vendedores están calificados por la comunidad.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Vende sin complicaciones</h3>
                <p className="text-gray-500">Crea tu subasta en minutos y llega a miles de compradores potenciales.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pujas en tiempo real</h3>
                <p className="text-gray-500">
                  Participa en subastas con actualizaciones instantáneas y configura pujas automáticas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
