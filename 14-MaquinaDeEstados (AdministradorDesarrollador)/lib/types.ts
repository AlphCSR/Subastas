export interface Auction {
  id: string
  title: string
  state: string
  createdAt: string
  updatedAt: string
}

export interface TransitionEvent {
  id: string
  auctionId: string
  from: string
  to: string
  timestamp: string
  triggeredBy: string
}

export interface SagaEvent {
  id: string
  sagaId: string
  service: string
  status: string
  description: string
  timestamp: string
  details?: Record<string, any>
}
