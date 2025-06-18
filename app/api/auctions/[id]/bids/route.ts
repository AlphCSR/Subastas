import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { amount } = await request.json()
    const auctionId = params.id

    // Simular colocación de puja
    await new Promise((resolve) => setTimeout(resolve, 800))

    const bid = {
      id: Date.now().toString(),
      auctionId,
      amount,
      bidderId: "current-user-id",
      timestamp: new Date().toISOString(),
      isWinning: true,
    }

    console.log("Placing bid:", bid)

    return NextResponse.json({
      success: true,
      message: "Puja realizada exitosamente",
      data: bid,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al realizar puja" }, { status: 500 })
  }
}
