// Tipos de datos
export interface ErrorAuction {
  id: string
  productName: string
  seller: string
  errorMessage: string
  errorDetails: string
  severity: string
  timestamp: string
}

export interface UnconfirmedDelivery {
  id: string
  auctionId: string
  productName: string
  buyer: string
  seller: string
  finalPrice: number
  auctionDate: string
  deadlineDate: string
  deliveryAddress: string
  notes?: string
}

export interface UnsentNotification {
  id: string
  type: string
  recipient: string
  subject: string
  content: string
  errorType: string
  errorMessage: string
  attempts: number
  timestamp: string
}

// Datos de prueba
export function getMockData() {
  return {
    errorAuctions: [
      {
        id: "AUC-2023-0045",
        productName: "iPhone 13 Pro Max",
        seller: "Carlos Rodríguez",
        errorMessage: "Error en el procesamiento de pago",
        errorDetails:
          "TypeError: Cannot read property 'paymentMethod' of undefined\n   at processPayment (/app/services/payment.js:45:23)\n   at finalizeAuction (/app/controllers/auction.js:127:12)",
        severity: "alta",
        timestamp: "2023-06-10T14:23:45.000Z",
      },
      {
        id: "AUC-2023-0078",
        productName: 'MacBook Pro 16"',
        seller: "María González",
        errorMessage: "Timeout en la actualización del estado",
        errorDetails:
          "Error: Request timed out after 30000ms\n   at AuctionService.updateStatus (/app/services/auction.js:89:11)\n   at async AuctionController.endAuction (/app/controllers/auction.js:203:18)",
        severity: "media",
        timestamp: "2023-06-11T09:12:33.000Z",
      },
      {
        id: "AUC-2023-0103",
        productName: "PlayStation 5",
        seller: "Juan Pérez",
        errorMessage: "Error en la notificación al ganador",
        errorDetails:
          "Error: Failed to send notification: status code 500\n   at NotificationService.sendWinnerNotification (/app/services/notification.js:67:15)\n   at AuctionService.notifyWinner (/app/services/auction.js:156:22)",
        severity: "baja",
        timestamp: "2023-06-12T16:45:21.000Z",
      },
    ],
    unconfirmedDeliveries: [
      {
        id: "DEL-2023-0034",
        auctionId: "AUC-2023-0012",
        productName: "Samsung Galaxy S22",
        buyer: "Ana Martínez",
        seller: "Roberto Sánchez",
        finalPrice: 699.99,
        auctionDate: "2023-05-28T10:15:00.000Z",
        deadlineDate: "2023-06-04T23:59:59.000Z",
        deliveryAddress: "Calle Principal 123, Ciudad de México, CP 12345",
      },
      {
        id: "DEL-2023-0045",
        auctionId: "AUC-2023-0023",
        productName: "iPad Air 4",
        buyer: "Luis Hernández",
        seller: "Patricia Gómez",
        finalPrice: 549.5,
        auctionDate: "2023-06-01T14:30:00.000Z",
        deadlineDate: "2023-06-08T23:59:59.000Z",
        deliveryAddress: "Avenida Central 456, Guadalajara, CP 45678",
        notes: "Entregar en horario de oficina (9am-6pm)",
      },
      {
        id: "DEL-2023-0056",
        auctionId: "AUC-2023-0034",
        productName: "Nintendo Switch OLED",
        buyer: "Elena Torres",
        seller: "Miguel Ángel Ruiz",
        finalPrice: 349.99,
        auctionDate: "2023-06-05T16:45:00.000Z",
        deadlineDate: "2023-06-12T23:59:59.000Z",
        deliveryAddress: "Calle Secundaria 789, Monterrey, CP 67890",
      },
      {
        id: "DEL-2023-0067",
        auctionId: "AUC-2023-0045",
        productName: "Laptop Dell XPS 13",
        buyer: "Javier López",
        seller: "Sofía Ramírez",
        finalPrice: 1299.0,
        auctionDate: "2023-06-07T11:20:00.000Z",
        deadlineDate: "2023-06-14T23:59:59.000Z",
        deliveryAddress: "Boulevard Principal 321, Puebla, CP 72000",
        notes: "Requiere firma de recepción",
      },
    ],
    unsentNotifications: [
      {
        id: "NOT-2023-0089",
        type: "auction_end",
        recipient: "fernando.diaz@email.com",
        subject: "¡Tu subasta ha finalizado!",
        content:
          "Estimado Fernando, tu subasta para 'Cámara Canon EOS R5' ha finalizado. El ganador es Laura Vega con una oferta de $2,899.00. Por favor, contacta al comprador para coordinar la entrega.",
        errorType: "server_error",
        errorMessage: "Error: SMTP server error: Connection refused",
        attempts: 3,
        timestamp: "2023-06-10T18:34:12.000Z",
      },
      {
        id: "NOT-2023-0095",
        type: "bid_outbid",
        recipient: "carmen.ortiz@email.com",
        subject: "Tu oferta ha sido superada",
        content:
          "Hola Carmen, tu oferta para 'Reloj Apple Watch Series 7' ha sido superada. La oferta actual es de $329.99. ¡Haz una nueva oferta antes de que termine la subasta!",
        errorType: "timeout",
        errorMessage: "Error: Request timed out after 15000ms",
        attempts: 2,
        timestamp: "2023-06-11T09:45:23.000Z",
      },
      {
        id: "NOT-2023-0102",
        type: "payment_confirmation",
        recipient: "alberto.mendez@email.com",
        subject: "Confirmación de pago recibido",
        content:
          "Estimado Alberto, hemos recibido tu pago de $149.50 por 'Auriculares Sony WH-1000XM4'. El vendedor ha sido notificado y pronto recibirás información sobre el envío.",
        errorType: "invalid_recipient",
        errorMessage: "Error: Invalid email address: Domain does not exist",
        attempts: 1,
        timestamp: "2023-06-12T14:12:56.000Z",
      },
      {
        id: "NOT-2023-0110",
        type: "delivery_reminder",
        recipient: "laura.vega@email.com",
        subject: "Recordatorio: Confirma la recepción de tu compra",
        content:
          "Hola Laura, te recordamos que debes confirmar la recepción de 'Cámara Canon EOS R5'. Si ya recibiste el producto, por favor confirma la entrega en la plataforma para completar la transacción.",
        errorType: "server_error",
        errorMessage: "Error: Internal server error: Database connection failed",
        attempts: 2,
        timestamp: "2023-06-13T10:23:45.000Z",
      },
    ],
  }
}
