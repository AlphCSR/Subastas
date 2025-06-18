import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular tokenización y guardado de método de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const paymentMethod = {
      id: Date.now().toString(),
      type: "card",
      name: `**** ${data.number.slice(-4)}`,
      details: `Expira ${data.expiry}`,
      token: `tok_${Date.now()}`, // Token seguro de la pasarela
      isDefault: false,
      status: "active",
      createdAt: new Date().toISOString(),
    }

    console.log("Adding payment method:", paymentMethod)

    return NextResponse.json({
      success: true,
      message: "Método de pago agregado exitosamente",
      data: paymentMethod,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al agregar método de pago" }, { status: 500 })
  }
}
