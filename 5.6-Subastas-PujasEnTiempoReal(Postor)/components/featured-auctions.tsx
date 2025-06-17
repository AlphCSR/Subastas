import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatTimeRemaining, getAuctionTypeLabel } from "@/lib/utils"
import { mockAuctions } from "@/lib/mock-data"

export function FeaturedAuctions() {
  // Get the first 3 auctions as featured
  const featuredAuctions = mockAuctions.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Subastas destacadas</h2>
        <Link href="/auctions">
          <Button variant="ghost" size="sm" className="gap-1">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAuctions.map((auction) => (
          <Card key={auction.id} className="overflow-hidden">
            <Link href={`/auctions/${auction.id}`} className="block">
              <div className="relative h-48">
                <Image
                  src={auction.imageUrl || "/placeholder.svg"}
                  alt={auction.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {getAuctionTypeLabel(auction.type)}
                </Badge>
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`/auctions/${auction.id}`} className="block">
                <h3 className="font-semibold text-lg line-clamp-1">{auction.title}</h3>
              </Link>
              <div className="flex items-center justify-between mt-2">
                <div className="text-amber-600 font-medium">{formatCurrency(auction.currentPrice)}</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTimeRemaining(auction.endDate)}</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href={`/auctions/${auction.id}/realtime-bidder`}>
                  <Button className="w-full">Pujar ahora</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
