import type { Auction, TransitionEvent, SagaEvent } from "./types"

// Datos de prueba para subastas
export const mockAuctions: Auction[] = [
  {
    id: "auction-001",
    title: "Subasta de Arte Contemporáneo",
    state: "active",
    createdAt: "2023-06-10T10:00:00Z",
    updatedAt: "2023-06-10T14:30:00Z",
  },
  {
    id: "auction-002",
    title: "Colección de Monedas Antiguas",
    state: "pending",
    createdAt: "2023-06-11T08:15:00Z",
    updatedAt: "2023-06-11T08:15:00Z",
  },
  {
    id: "auction-003",
    title: "Vehículos Clásicos",
    state: "ended",
    createdAt: "2023-06-01T09:30:00Z",
    updatedAt: "2023-06-08T18:00:00Z",
  },
  {
    id: "auction-004",
    title: "Tecnología Vintage",
    state: "paused",
    createdAt: "2023-06-05T11:45:00Z",
    updatedAt: "2023-06-07T16:20:00Z",
  },
  {
    id: "auction-005",
    title: "Joyas Exclusivas",
    state: "cancelled",
    createdAt: "2023-06-03T13:00:00Z",
    updatedAt: "2023-06-04T09:10:00Z",
  },
  {
    id: "auction-006",
    title: "Instrumentos Musicales",
    state: "completed",
    createdAt: "2023-05-28T10:30:00Z",
    updatedAt: "2023-06-04T20:00:00Z",
  },
]

// Datos de prueba para el historial de transiciones
export const mockTransitions: TransitionEvent[] = [
  {
    id: "tr-001",
    auctionId: "auction-001",
    from: "pending",
    to: "active",
    timestamp: "2023-06-10T14:30:00Z",
    triggeredBy: "admin@example.com",
  },
  {
    id: "tr-002",
    auctionId: "auction-003",
    from: "active",
    to: "ended",
    timestamp: "2023-06-08T18:00:00Z",
    triggeredBy: "system",
  },
  {
    id: "tr-003",
    auctionId: "auction-004",
    from: "active",
    to: "paused",
    timestamp: "2023-06-07T16:20:00Z",
    triggeredBy: "moderator@example.com",
  },
  {
    id: "tr-004",
    auctionId: "auction-005",
    from: "pending",
    to: "cancelled",
    timestamp: "2023-06-04T09:10:00Z",
    triggeredBy: "admin@example.com",
  },
  {
    id: "tr-005",
    auctionId: "auction-006",
    from: "ended",
    to: "completed",
    timestamp: "2023-06-04T20:00:00Z",
    triggeredBy: "system",
  },
  {
    id: "tr-006",
    auctionId: "auction-004",
    from: "pending",
    to: "active",
    timestamp: "2023-06-06T10:15:00Z",
    triggeredBy: "admin@example.com",
  },
  {
    id: "tr-007",
    auctionId: "auction-003",
    from: "pending",
    to: "active",
    timestamp: "2023-06-02T11:30:00Z",
    triggeredBy: "admin@example.com",
  },
]

// Datos de prueba para eventos SAGA
export const mockSagaEvents: SagaEvent[] = [
  {
    id: "saga-event-001",
    sagaId: "saga-001",
    service: "AuctionService",
    status: "completed",
    description: "Creación de subasta",
    timestamp: "2023-06-10T10:00:00Z",
    details: {
      auctionId: "auction-001",
      action: "create",
      metadata: {
        userId: "user-123",
        itemCount: 15,
      },
    },
  },
  {
    id: "saga-event-002",
    sagaId: "saga-001",
    service: "NotificationService",
    status: "completed",
    description: "Notificación a vendedores",
    timestamp: "2023-06-10T10:01:00Z",
    details: {
      auctionId: "auction-001",
      notificationType: "email",
      recipients: 3,
    },
  },
  {
    id: "saga-event-003",
    sagaId: "saga-001",
    service: "PaymentService",
    status: "completed",
    description: "Configuración de pagos",
    timestamp: "2023-06-10T10:02:00Z",
    details: {
      auctionId: "auction-001",
      paymentMethods: ["credit_card", "paypal", "bank_transfer"],
    },
  },
  {
    id: "saga-event-004",
    sagaId: "saga-002",
    service: "AuctionService",
    status: "completed",
    description: "Activación de subasta",
    timestamp: "2023-06-10T14:30:00Z",
    details: {
      auctionId: "auction-001",
      action: "activate",
    },
  },
  {
    id: "saga-event-005",
    sagaId: "saga-002",
    service: "NotificationService",
    status: "completed",
    description: "Notificación a compradores",
    timestamp: "2023-06-10T14:31:00Z",
    details: {
      auctionId: "auction-001",
      notificationType: "push",
      recipients: 120,
    },
  },
  {
    id: "saga-event-006",
    sagaId: "saga-003",
    service: "BidService",
    status: "failed",
    description: "Procesamiento de oferta",
    timestamp: "2023-06-10T15:45:00Z",
    details: {
      auctionId: "auction-001",
      bidId: "bid-456",
      error: "Insufficient funds",
    },
  },
  {
    id: "saga-event-007",
    sagaId: "saga-003",
    service: "CompensationService",
    status: "completed",
    description: "Compensación de oferta fallida",
    timestamp: "2023-06-10T15:46:00Z",
    details: {
      auctionId: "auction-001",
      bidId: "bid-456",
      action: "rollback",
    },
  },
  {
    id: "saga-event-008",
    sagaId: "saga-004",
    service: "AuctionService",
    status: "pending",
    description: "Finalización de subasta",
    timestamp: "2023-06-11T18:00:00Z",
    details: {
      auctionId: "auction-001",
      action: "end",
      scheduledAt: "2023-06-12T18:00:00Z",
    },
  },
]
