export type ClaimStatus = "pending" | "in-review" | "resolved" | "rejected"

export interface Claim {
  id: string
  userId: string
  auctionId: string
  auctionTitle: string
  reason: string
  evidence: string[]
  status: ClaimStatus
  createdAt: Date
  updatedAt: Date
  resolution?: string
  adminNotes?: string
}

export interface Auction {
  id: string
  title: string
  endDate: Date
  startingPrice: number
  currentPrice: number
}
