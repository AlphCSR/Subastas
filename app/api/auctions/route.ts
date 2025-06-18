import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simular creación de subasta
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const auction = {
      id: Date.now().toString(),
      ...data,
      status: "active",
      createdAt: new Date().toISOString(),
      endTime: new Date(Date.now() + Number.parseInt(data.duration) * 60 * 60 * 1000).toISOString(),
    }

    console.log("Creating auction:", auction)

    return NextResponse.json({
      success: true,
      message: "Subasta creada exitosamente",
      data: auction,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al crear subasta" }, { status: 500 })
  }
}
