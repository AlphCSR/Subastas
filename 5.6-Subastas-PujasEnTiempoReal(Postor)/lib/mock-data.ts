import type { Auction, Bid } from "@/types/auction"

// Helper to generate random past dates within the last hour
const getRandomPastDate = () => {
  const now = new Date()
  const randomMinutes = Math.floor(Math.random() * 60)
  return new Date(now.getTime() - randomMinutes * 60000)
}

// Helper to generate random future dates within the next 24 hours
const getRandomFutureDate = () => {
  const now = new Date()
  const randomHours = Math.floor(Math.random() * 24) + 1
  return new Date(now.getTime() + randomHours * 3600000)
}

// Generate mock bids for an auction
const generateMockBids = (basePrice: number, count: number): Bid[] => {
  const bids: Bid[] = []
  let currentPrice = basePrice

  for (let i = 0; i < count; i++) {
    const increment = Math.floor(Math.random() * 50) + 10
    currentPrice += increment

    bids.push({
      id: `bid-${i}-${Date.now()}`,
      userId: `user-${i}`,
      userName: `User ${i + 1}`,
      userAvatar: "/placeholder.svg?height=40&width=40",
      amount: currentPrice,
      timestamp: getRandomPastDate(),
      isAutoBid: Math.random() > 0.7,
    })
  }

  // Sort bids by timestamp (newest first)
  return bids.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Generate mock auctions
export const mockAuctions: Auction[] = [
  {
    id: "auction-1",
    title: "iPhone 15 Pro Max",
    description: "Brand new iPhone 15 Pro Max with 256GB storage, Titanium finish.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    basePrice: 999,
    currentPrice: 1250,
    minIncrement: 10,
    startDate: new Date(Date.now() - 86400000), // 1 day ago
    endDate: getRandomFutureDate(),
    type: "open",
    rules: "Standard auction rules apply. Highest bidder wins.",
    status: "active",
    sellerId: "seller-1",
    sellerName: "Tech Store",
    bids: generateMockBids(999, 8),
  },
  {
    id: "auction-2",
    title: "Vintage Watch Collection",
    description: "Collection of 5 vintage watches from the 1960s, all in working condition.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    basePrice: 500,
    currentPrice: 780,
    minIncrement: 20,
    startDate: new Date(Date.now() - 172800000), // 2 days ago
    endDate: getRandomFutureDate(),
    type: "reserve",
    rules: "Reserve price must be met. Seller reserves the right to reject bids.",
    status: "active",
    sellerId: "seller-2",
    sellerName: "Antique Collector",
    bids: generateMockBids(500, 12),
  },
  {
    id: "auction-3",
    title: "Gaming PC - RTX 4090",
    description: "Custom built gaming PC with RTX 4090, i9 processor, 64GB RAM, and 2TB SSD.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    basePrice: 2500,
    currentPrice: 2800,
    minIncrement: 50,
    startDate: new Date(Date.now() - 43200000), // 12 hours ago
    endDate: getRandomFutureDate(),
    type: "open",
    rules: "Shipping included. 1-year warranty on all parts.",
    status: "active",
    sellerId: "seller-3",
    sellerName: "PC Master",
    bids: generateMockBids(2500, 6),
  },
  {
    id: "auction-4",
    title: "Handcrafted Leather Sofa",
    description: "Premium handcrafted leather sofa, made with genuine Italian leather.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    basePrice: 1200,
    currentPrice: 1450,
    minIncrement: 25,
    startDate: new Date(Date.now() - 129600000), // 1.5 days ago
    endDate: getRandomFutureDate(),
    type: "dutch",
    rules: "Dutch auction: price decreases over time until someone bids.",
    status: "active",
    sellerId: "seller-4",
    sellerName: "Luxury Furniture",
    bids: generateMockBids(1200, 5),
  },
  {
    id: "auction-5",
    title: "Rare Coin Collection",
    description: "Collection of rare coins from the 18th and 19th centuries.",
    imageUrl: "/placeholder.svg?height=300&width=300",
    basePrice: 3000,
    currentPrice: 4200,
    minIncrement: 100,
    startDate: new Date(Date.now() - 259200000), // 3 days ago
    endDate: getRandomFutureDate(),
    type: "sealed",
    rules: "Sealed bid auction. All bids are private until the auction ends.",
    status: "active",
    sellerId: "seller-5",
    sellerName: "Coin Enthusiast",
    bids: generateMockBids(3000, 10),
  },
]

// Function to get a single auction by ID
export const getAuctionById = (id: string): Auction | undefined => {
  return mockAuctions.find((auction) => auction.id === id)
}

// Function to add a new bid to an auction
export const addBidToAuction = (auctionId: string, bid: Bid): Auction | undefined => {
  const auctionIndex = mockAuctions.findIndex((a) => a.id === auctionId)
  if (auctionIndex === -1) return undefined

  const auction = { ...mockAuctions[auctionIndex] }
  auction.bids = [bid, ...auction.bids]
  auction.currentPrice = bid.amount

  mockAuctions[auctionIndex] = auction
  return auction
}
