import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simular respuesta de pasarela de pago
    const payment = {
      id: Date.now().toString(),
      ...data,
      status: "completed",
      transactionId: `txn_${Date.now()}`,
      processedAt: new Date().toISOString(),
    }

    console.log("Processing payment:", payment)

    return NextResponse.json({
      success: true,
      message: "Pago procesado exitosamente",
      data: payment,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al procesar pago" }, { status: 500 })
  }
}
