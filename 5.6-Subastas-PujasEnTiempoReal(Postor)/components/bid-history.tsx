import type { Bid } from "@/types/auction"
import { formatCurrency } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface BidHistoryProps {
  bids: Bid[]
}

export function BidHistory({ bids }: BidHistoryProps) {
  if (bids.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No hay pujas todavía. ¡Sé el primero en pujar!</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Historial de pujas</h3>
      <div className="space-y-3">
        {bids.map((bid) => (
          <div key={bid.id} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={bid.userName} />
                <AvatarFallback>{bid.userName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{bid.userName}</div>
                <div className="text-sm text-muted-foreground">{bid.timestamp.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{formatCurrency(bid.amount)}</span>
              {bid.isAutoBid && (
                <Badge variant="outline" className="text-xs">
                  Auto
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
