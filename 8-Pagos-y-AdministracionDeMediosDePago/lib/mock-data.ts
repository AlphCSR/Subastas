// Mock data for auction won
export const mockAuctionWon = {
  id: "12345",
  title: "Reloj Vintage Coleccionable",
  imageUrl: "/placeholder.svg?height=200&width=200",
  finalPrice: 1250.0,
  fee: 62.5,
  shipping: 25.0,
  total: 1337.5,
  status: "pending",
}

// Mock data for payment methods
export interface PaymentMethod {
  id: string
  type: "tarjeta" | "banco" | "billetera"
  name: string
  dateAdded: string
  isDefault: boolean
}

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    type: "tarjeta",
    name: "Visa •••• 4321",
    dateAdded: "2023-05-15T10:30:00Z",
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "banco",
    name: "Cuenta Bancaria **** 7890",
    dateAdded: "2023-06-22T14:45:00Z",
    isDefault: false,
  },
  {
    id: "pm-3",
    type: "billetera",
    name: "Billetera Digital",
    dateAdded: "2023-08-10T09:15:00Z",
    isDefault: false,
  },
]
