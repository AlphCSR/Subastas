export type AuctionType = "open" | "reserve" | "sealed" | "dutch"

export interface Bid {
  id: string
  userId: string
  userName: string
  userAvatar: string
  amount: number
  timestamp: Date
  isAutoBid: boolean
}

export interface Auction {
  id: string
  title: string
  description: string
  imageUrl: string
  basePrice: number
  currentPrice: number
  minIncrement: number
  startDate: Date
  endDate: Date
  type: AuctionType
  rules: string
  status: "active" | "completed" | "cancelled"
  sellerId: string
  sellerName: string
  bids: Bid[]
  winningBidId?: string
}

export interface AutoBidConfig {
  auctionId: string
  userId: string
  maxAmount: number
  incrementAmount: number
  active: boolean
}
