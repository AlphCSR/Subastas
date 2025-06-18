import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { question } = await request.json()
    const auctionId = params.id

    // Simular envío de pregunta
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const questionData = {
      id: Date.now().toString(),
      auctionId,
      question,
      askedBy: "current-user-id",
      timestamp: new Date().toISOString(),
      status: "pending",
    }

    console.log("Asking question:", questionData)

    return NextResponse.json({
      success: true,
      message: "Pregunta enviada al vendedor",
      data: questionData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al enviar pregunta" }, { status: 500 })
  }
}
